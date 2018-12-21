/* eslint-disable consistent-return */
/* eslint no-param-reassign: ["error", { "props": false }] */
/**
 * Module for christmas tree public API to create permits and manage transactions
 * @module controllers/christmas-tree/permits
 */

const uuid = require('uuid/v4');
const xml2jsParse = require('xml2js').parseString;
const moment = require('moment-timezone');
const zpad = require('zpad');
const htmlToText = require('html-to-text');
const jwt = require('jsonwebtoken');

const logger = require('../../services/logger.es6');
const vcapConstants = require('../../vcap-constants.es6');
const treesDb = require('../../models/trees-db.es6');
const paygov = require('../../services/paygov.es6');
const permitSvgService = require('../../services/christmas-trees-permit-svg-util.es6');
const email = require('../../email/email-util.es6');
const util = require('../../services/util.es6');


const christmasTreePermits = {};

/**
 * @function translatePermitFromClientToDatabase - Private function to translate request data to the database json object
 * @param {Object} input - christmas trees permit object from database
 * @return {Object} - formatted permit object
 */
const translatePermitFromClientToDatabase = input => ({
  permitId: uuid(),
  forestId: input.forestId,
  orgStructureCode: input.orgStructureCode,
  firstName: input.firstName,
  lastName: input.lastName,
  emailAddress: input.emailAddress,
  treeCost: input.treeCost,
  quantity: input.quantity,
  totalCost: input.totalCost,
  permitExpireDate: input.expDate
});

/**
 * @function permitResult - Private function to return formatted permit result
 * @param {Object} permit - permit object from database
 * @return {Object} - formatted permit object
 */
const permitResult = permit => ({
  permitId: permit.permitId,
  orgStructureCode: permit.orgStructureCode,
  firstName: permit.firstName,
  lastName: permit.lastName,
  emailAddress: permit.emailAddress,
  quantity: permit.quantity,
  totalCost: permit.totalCost,
  status: permit.status,
  transactionDate: permit.updatedAt,
  paygovTrackingId: permit.paygovTrackingId,
  expirationDate: permit.permitExpireDate,
  permitNumber: zpad(permit.permitNumber, 8),
  forest: {
    forestName: permit.christmasTreesForest ? permit.christmasTreesForest.forestName : null,
    forestAbbr: permit.christmasTreesForest ? permit.christmasTreesForest.forestAbbr : null,
    forestNameShort: permit.christmasTreesForest ? permit.christmasTreesForest.forestNameShort : null
  }
});

/**
 * @function updatePermitWithToken - Private function to update permit with paygov token
 * @param {Object} res - http response
 * @param {Object} permit - permit from database
 * @param {string} token - paygov token
 * @return {Object} - http response
 */
const updatePermitWithToken = (res, permit, token) => {
  const tcsAppID = vcapConstants.PAY_GOV_APP_ID;
  permit
    .update({
      paygovToken: token
    })
    .then((savedPermit) => {
      logger.info(
        `${savedPermit.emailAddress} modified ${savedPermit.permitId} with pay.gov token at ${savedPermit.updatedAt}`
      );
      return res.status(200).json({
        token,
        permitId: savedPermit.permitId,
        payGovUrl: vcapConstants.PAY_GOV_CLIENT_URL,
        tcsAppID
      });
    })
    .catch((error) => {
      util.handleErrorResponse(error, res, 'updatePermitWithToken#end');
    });
};

/**
 * @function sendPermitError - Private function to error objects from the permit's errors
 * @param {Object} res - http response
 * @param {Object} permit - permit object from database
 * @return {Object} - http response
 */
const sendPermitError = (res, permit) => {
  const permitErrors = JSON.parse(permit.paygovError);
  return res.status(400).json({
    errors: [
      {
        status: 400,
        errorCode: permitErrors.errorCode[0],
        message: permitErrors.errorMessage[0],
        permit: permitResult(permit)
      }
    ]
  });
};

/**
 * @function updatePermit - Private function to update permit in database
 * @param {Object} permit - permit object from database
 * @param {Object} updateObject - updated permit object
 * @return {Object} - saved permit
 */
const updatePermit = (permit, updateObject) => new Promise((resolve, reject) => {
  permit
    .update(updateObject)
    .then((updatedPermit) => {
      logger.info(
        `PermitID ${updatedPermit.permitId} updated at ${updatedPermit.modifiedAt} by ${permit.emailAddress} `
      );
      resolve(updatedPermit);
    })
    .catch((error) => {
      reject(error);
    });
});

/**
 * @function recordPayGovError - Private function to error objects from the permit's errors
 * @param {Object} error - no valid token error from gettoken
 * @param {Object} result - xmlpaygov pa
 * @param {Object} permit - permit object from database
 * @param {Object} res - http response
 * @param {String} requestType - the name of the request when the error occured
 * @return {Object} - promise of whether permit was updated with token
 */
const recordPayGovError = (error, result, res, permit, requestType) => {
  logger.error(`ERROR: ServerError: Pay.gov- ${error}. Updating permit with error while ${requestType}`);
  return paygov.getResponseError(requestType, result)
    .then(paygovError => updatePermit(permit, {
      status: 'Error',
      paygovError: JSON.stringify(paygovError)
    })
      .then(updatedPermit => sendPermitError(res, updatedPermit)));
};

/**
 * @function grabAndProcessPaygovToken - Private function to error objects from the permit's errors
 * @param {Object} xmlDatafromPayGov - xml from pay.gov
 * @param {Object} permit - permit object from database
 * @param {Object} res - http response
 * @return {Object} - promise of whether permit was updated with token
 */
const grabAndProcessPaygovToken = (payGovXmlRes, permit, res) => new Promise((resolve, reject) => {
  xml2jsParse(payGovXmlRes, (parseErr, result) => {
    if (!parseErr) {
      paygov.getToken(result)
        .then(token => resolve(updatePermitWithToken(res, permit, token)))
        .catch(error => recordPayGovError(error, result, res, permit, 'startOnlineCollection'));
    }
    reject(parseErr);
  });
});

/**
 * @function create - API function to create permit application
 * @param {Object} req - http request
 * @param {Object} res - http response
 * @return {Object} http response
 */
christmasTreePermits.create = (req, res) => {
  treesDb.christmasTreesForests
    .findOne({
      where: {
        id: req.body.forestId
      }
    })
    .then((forest) => {
      if (!moment().isBetween(forest.startDate, forest.endDate, null, '[]')) {
        logger.error(`Permit attempted to be created outside of season date for ${req.body.forestId}`);
        return res.status(404).send(); // season is closed or not yet started
      }
      req.body.expDate = forest.endDate;
      return treesDb.christmasTreesPermits
        .create(translatePermitFromClientToDatabase(req.body))
        .then((permit) => {
          util.logControllerAction(req, 'christmasTreePermits.create', permit);
          const initPayGovTransactionXml = paygov.getXmlStartCollection(forest.forestAbbr, forest.possFinancialId, permit);
          return paygov.postPayGov(initPayGovTransactionXml)
            .then(xmlResponse => grabAndProcessPaygovToken(xmlResponse, permit, res))
            .catch((postError) => {
              if (postError && postError !== 'null') {
                util.handleErrorResponse(postError, res, 'create#postPay');
              }
            });
        });
    })
    .catch((error) => {
      logger.error(`ERROR: ServerError: ${error} from create#catch`);
      return res.status(400).json({
        errors: error.errors
      });
    });
};

/**
 * @function sendEmail - Private function to send email with the input data
 * @param {Object} savedPermit - permit object from database
 * @param {string} permitPng - permit's png buffer
 * @param {string} rulesHtml - permit rules in html format
 * @param {string} rulesText - permit rules in text format
 */
const sendEmail = (savedPermit, permitPng, rulesHtml, rulesText) => {
  const attachments = [
    {
      filename: 'permit.png',
      content: Buffer.from(permitPng, 'utf-8'),
      cid: 'christmas-tree-permit-image'
    },
    {
      filename: 'permit-attachment.png',
      content: Buffer.from(permitPng, 'utf-8')
    },
    {
      filename: 'permit-rules.html',
      content: Buffer.from(rulesHtml, 'utf-8'),
      contentType: 'text/html'
    },
    {
      filename: 'permit-rules.txt',
      content: Buffer.from(rulesText, 'utf-8')
    }
  ];

  return email.sendEmail('christmasTreesPermitCreated', savedPermit, attachments);
};

/**
 * @function parseXMLFromPayGov - Private function to parse the returned XML from payGov
 * @param {Object} res - http response
 * @param {string} payGovXmlRes - xml response from payGov api call
 * @param {Object} permit - permit object
 * @return {string} - paygov tracking id
 */
const handlePaygovCompleteResponse = (res, payGovXmlRes, permit, status) => new Promise((resolve, reject) => {
  xml2jsParse(payGovXmlRes, (parseErr, result) => {
    if (!parseErr) {
      paygov.getTrackingId(result)
        .then(paygovTrackingId => resolve(updatePermit(permit, {
          paygovTrackingId,
          status
        })))
        .catch(error => recordPayGovError(error, result, res, permit, 'completeOnlineCollection'));
    } else {
      reject(parseErr);
    }
  });
});

/**
 * @function permitExpireDate - Private function to check if permit expire date is in future
 * @param {date} permitExpireDate - expiration date
 * @return {boolean} - expiration date is is after current date
 */
const checkPermitValid = permitExpireDate => moment(permitExpireDate).isAfter(moment());

/**
 * @function generateRulesAndEmail - Private function to generate svg, png, and rules html of a permit and send out email
 * @param {Object} permit - permit object
 */
christmasTreePermits.generateRulesAndEmail = permit => permitSvgService.generatePermitSvg(permit)
  .then(permitSvg => Promise.all([
    permitSvgService.generatePng(permitSvg),
    permitSvgService.generateRulesHtml(true, permit)
  ]))
  .then(([permitPng, rulesHtml]) => {
    permit.permitUrl = paygov.returnUrl(
      permit.christmasTreesForest.forestAbbr,
      permit.permitId,
      false
    );
    const rulesText = htmlToText.fromString(rulesHtml, {
      wordwrap: 130,
      ignoreImage: true
    });
    return sendEmail(permit, permitPng, rulesHtml, rulesText);
  });

/**
 * @function getOnePermit - API function to get a permit.
 * @param {Object} req - http request
 * @param {Object} res - http response
 * @return {Object} - saved permit object
 */
christmasTreePermits.getOnePermit = (req, res) => {
  console.log('here-cool-bob');
  const validToken = jwt.verify(req.query.t, vcapConstants.PERMIT_SECRET);
  if (validToken) {
    console.log('here-cool-thom');
    treesDb.christmasTreesPermits
      .findOne({
        where: {
          permitId: req.params.id
        },
        include: [
          {
            model: treesDb.christmasTreesForests
          }
        ]
      })
      .then((permit) => {
        console.log('here-cool');
        if (permit && permit.status === 'Error') {
          return sendPermitError(res, permit);
        }
        if (permit) {
          util.logControllerAction(req, 'christmasTreePermits.getOnePermit', permit);
          return res.status(200).send(permitResult(permit));
        }
        return res.status(404).send();
      })
      .catch((error) => {
        console.log('here-cool-jack');
        util.handleErrorResponse(error, res, 'getOnePermit#end');
      });
  } else {
    console.log('here-cool-mike');
    return res.status(404).send();
  }
};

/**
 * @function printPermit - API function to get permit svg or rules html
 * @param {Object} req - http request
 * @param {Object} res - http response
 * @return {Object} http reponse with permit svg or riles html
 */
christmasTreePermits.printPermit = (req, res) => {
  treesDb.christmasTreesPermits
    .findOne({
      where: {
        permitId: req.params.id
      },
      include: [
        {
          model: treesDb.christmasTreesForests
        }
      ]
    })
    .then((permit) => {
      util.logControllerAction(req, 'christmasTreePermits.printPermit', permit);
      if (permit.status === 'Completed') {
        if (!checkPermitValid(permit.permitExpireDate)) {
          res.status(404).send();
        } else if (!req.query.rules || req.query.permit === 'true') {
          permitSvgService.generatePermitSvg(permit).then((permitSvg) => {
            res.status(200).json({
              result: permitSvg
            });
          });
        } else if (req.query.rules === 'true') {
          permitSvgService.generateRulesHtml(false, permit).then((rulesHtml) => {
            res.status(200).json({
              result: rulesHtml
            });
          });
        } else {
          res.status(404).send();
        }
      } else {
        res.status(404).send();
      }
    })
    .catch((error) => {
      logger.error(error);
      res.status(404).send();
    });
};

/**
 * @function completePermitTransaction - method to take an update request to complete the permit
 * and send complete transaction request to pay.gov and generate the permit email
 * @param {Object} permit - object model of an existing permit to be completed
 * @param {Object} req - http request
 * @param {Object} res - http response
 * @return {Promise} - promise that the email has been sent and response too
 */
const completePermitTransaction = (permit, res, req) => {
  util.logControllerAction(req, 'christmasTreePermits.completePermitTransaction', permit);
  const xmlData = paygov.getXmlToCompleteTransaction(permit.paygovToken);
  return new Promise((resolve, reject) => {
    paygov.postPayGov(xmlData)
      .then(xmlResponse => handlePaygovCompleteResponse(res, xmlResponse, permit, req.body.status)
        .then((updatedPermit) => {
          res.status(200).send(permitResult(updatedPermit));
          resolve(christmasTreePermits.generateRulesAndEmail(updatedPermit));
        })
        .catch((processError) => {
          const errorToSend = Object.assign(processError, { method: 'completePermitTransaction#process' });
          reject(errorToSend);
        }))
      .catch((postError) => {
        if (postError && postError !== 'null') {
          if (postError.name === 'StatusCodeError') { // when pay.gov returns a non 2xx status code
            // send to record error
            reject(handlePaygovCompleteResponse(res, postError.response.body, permit, req.body.status));
          } else {
            const errorToSend = Object.assign(postError, { method: 'completePermitTransaction#end' });
            reject(errorToSend);
          }
        }
      });
  });
};

/**
 * @function updatePermitApplication - API function to update permit
 * @param {Object} req - http request
 * @param {Object} res - http response
 * @return {Object} - updated permit
 */
christmasTreePermits.updatePermitApplication = (req, res) => {
  const validToken = jwt.verify(req.query.t, vcapConstants.PERMIT_SECRET);
  if (validToken) {
    treesDb.christmasTreesPermits
      .findOne({
        where: {
          permitId: req.body.permitId
        },
        include: [
          {
            model: treesDb.christmasTreesForests
          }
        ]
      })
      .then((permit) => {
        console.log('here')
        if (permit && permit.status === 'Initiated' && req.body.status === 'Cancelled') {
          return permit
            .update({
              status: req.body.status
            })
            .then((updatedPermit) => {
              util.logControllerAction(req, 'christmasTreePermits.updatePermitApplication#cancel', updatedPermit);
              res.status(200).json(updatedPermit);
            });
        }
        if (permit && permit.status === 'Initiated' && req.body.status === 'Completed') {
          return completePermitTransaction(permit, res, req)
            .then(logger.info(`PermitID ${permit.permitId} Successfully completed`))
            // eslint-disable-next-line consistent-return
            .catch((error) => {
              logger.error(`ERROR: ServerError: christmasTreePermits.completePermitTransaction\
did not complete ${error}`);
              if (!res.headerSent) {
                return res.status(400).send();
              }
            });
        }
        if (permit && permit.status === 'Error') {
          sendPermitError(res, permit);
        }
        logger.error('Permit status unknown. 400.');
        return res.status(404).send();
      })
      .catch((error) => {
        if (error && error.method) {
          util.handleErrorResponse(error, res, error.method);
        } else {
          util.handleErrorResponse(error, res, 'updatePermit#end');
        }
      });
  } else {
    logger.error('Permit not loaded or JWT not decoded.');
    return res.status(404).send();
  }
};

module.exports = christmasTreePermits;
