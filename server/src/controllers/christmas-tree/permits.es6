/* eslint-disable consistent-return */
/* eslint no-param-reassign: ["error", { "props": false }] */
/**
 * Module for christmas tree public API to create permits and manage transactions
 * @module controllers/christmas-tree/permits
 */

const uuid = require('uuid/v4');
const moment = require('moment-timezone');
const zpad = require('zpad');
const htmlToText = require('html-to-text');
const jwt = require('jsonwebtoken');

const logger = require('../../services/logger.es6');
const vcapConstants = require('../../vcap-constants.es6');
const treesDb = require('../../models/trees-db.es6');
const paygov = require('../../services/paygov');
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
// const updatePermitWithToken = (res, permit, token) => {
//   const tcsAppID = vcapConstants.PAY_GOV_APP_ID;
//   permit
//     .update({
//       paygovToken: token
//     })
//     .then((savedPermit) => {
//       logger.info(
//         `${savedPermit.emailAddress} modified ${savedPermit.permitId} with pay.gov token at ${savedPermit.updatedAt}`
//       );
//       return res.status(200).json({
//         token,
//         permitId: savedPermit.permitId,
//         payGovUrl: vcapConstants.PAY_GOV_CLIENT_URL,
//         tcsAppID
//       });
//     })
//     .catch((error) => {
//       util.handleErrorResponse(error, res, 'updatePermitWithToken#end');
//     });
// };

/**
 * @function formatPermitError - Format error objects from the permit's errors
 * @private
 * @param {Object} permit - permit object from database
 * @return {Object} - formatted permit errors
 */
const formatPermitError = permit => ({
  errors: [
    {
      status: 400,
      message: permit.paygovError,
      permit: permitResult(permit)
    }
  ]
});

/**
 * @function updatePermit - Update permit in database
 * @private
 * @param {Object} permit - permit object from database
 * @param {Object} updateObject - updated permit object
 * @return {Promise} - resolves to the saved and updated permit
 */
// const updatePermit = (permit, updateObject) => permit
//   .update(updateObject)
//   .then((updatedPermit) => {
//     logger.info(
//       `PermitID ${updatedPermit.permitId} updated at ${updatedPermit.modifiedAt} by ${permit.emailAddress} `
//     );
//     return updatedPermit;
//   });

/**
 * @function recordPayGovError - Private function to error objects from the permit's errors
 * @param {Object} error - no valid token error from gettoken
 * @param {Object} result - xmlpaygov pa
 * @param {Object} permit - permit object from database
 * @param {Object} res - http response
 * @param {String} requestType - the name of the request when the error occured
 * @return {Object} - promise of whether permit was updated with token
 */
// const recordPayGovError = (error, result, res, permit, requestType) => {
//   logger.error(`ERROR: ServerError: Pay.gov- ${error}. Updating permit with error while ${requestType}`);
//   return paygov.getResponseError(requestType, result)
//     .then(paygovError => updatePermit(permit, {
//       status: 'Error',
//       paygovError: JSON.stringify(paygovError)
//     })
//       .then(updatedPermit => res.status(400).json(formatPermitError(updatedPermit))));
// };

/**
 * @function grabAndProcessPaygovToken - Private function to error objects from the permit's errors
 * @param {Object} xmlDatafromPayGov - xml from pay.gov
 * @param {Object} permit - permit object from database
 * @param {Object} res - http response
 * @return {Promise} - resolves if permit was updated with token
 *
 * Errors that originate from parsing and extracting data from the xml
 * must be handled by the caller. Only errors that result from attempting
 * to update the Permit in the database with a paygov token result in
 * updating the Permit in the database with the error.
 */
// const grabAndProcessPaygovToken = (payGovXmlRes, permit, res) => util.parseXml(payGovXmlRes)
//   .then(result => paygov.getToken(result)
//     .then(token => updatePermitWithToken(res, permit, token))
//     .catch(error => recordPayGovError(error, result, res, permit, 'startOnlineCollection')));

// TODO - move to service
function isForestOpen(forest) {
  return moment().isBetween(forest.startDate, forest.endDate, null, '[]');
}

// TODO - move to service
async function createPermitTransaction(application, forest) {
  application.expDate = forest.endDate;
  const transformed = translatePermitFromClientToDatabase(application);
  const permit = await treesDb.christmasTreesPermits.create(transformed);

  let paygovToken;

  try {
    paygovToken = await paygov.startCollection(forest, permit);
  } catch (paygovError) {
    await permit.update({ status: 'Error', paygovError: paygovError.toString() });
    throw new Error('Paygov Error');
  }

  const savedPermit = await permit.update({ paygovToken });

  const createPermitResponse = {
    token: paygovToken,
    permitId: savedPermit.permitId,
    payGovUrl: vcapConstants.PAY_GOV_CLIENT_URL,
    tcsAppID: vcapConstants.PAY_GOV_APP_ID
  };

  return createPermitResponse;
}

/**
 * @function create - API function to create permit application
 * @param {Object} req - http request
 * @param {Object} res - http response
 * @return {Object} http response
 */
christmasTreePermits.create = async (req, res) => {
  util.logControllerAction(req, 'christmasTreePermits.create', req.body);
  try {
    const application = req.body;
    const query = { where: { id: application.forestId } };
    const forest = await treesDb.christmasTreesForests.findOne(query);

    if (!forest) {
      return res.status(400).send();
    }

    if (!isForestOpen(forest)) {
      logger.error(`Permit attempted to be created outside of season date for ${application.forestId}`);
      return res.status(400).send(); // season is closed or not yet started, I think this should be a 409
    }

    const permitResponse = await createPermitTransaction(application, forest);
    res.status(200).json(permitResponse);
  } catch (error) {
    util.handleErrorResponse(error, res, 'createPermit#end');
  }
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
 * @function handlePaygovCompleteResponse - Private function to parse the returned XML from payGov
 * @private
 * @param {Object} res - http response
 * @param {string} payGovXmlRes - xml response from payGov api call
 * @param {Object} permit - permit object
 * @param {String} status = permit status
 * @return {Promise} - resolves if permit updated
 */
// const handlePaygovCompleteResponse = (res, payGovXmlRes, permit, status) => util.parseXml(payGovXmlRes)
//   .then(result => paygov.getTrackingId(result)
//     .then(paygovTrackingId => updatePermit(permit, { paygovTrackingId, status }))
//     .catch(error => recordPayGovError(error, result, res, permit, 'completeOnlineCollection')));

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
  const validToken = jwt.verify(req.query.t, vcapConstants.PERMIT_SECRET);
  if (validToken) {
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
        if (permit && permit.status === 'Error') {
          return res.status(400).json(formatPermitError(permit));
        }
        if (permit) {
          util.logControllerAction(req, 'christmasTreePermits.getOnePermit', permit);
          return res.status(200).send(permitResult(permit));
        }
        return res.status(404).send();
      })
      .catch((error) => {
        util.handleErrorResponse(error, res, 'getOnePermit#end');
      });
  } else {
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
// TODO - move to service
async function completePermitTransaction(permit) {
  let paygovTrackingId;
  try {
    paygovTrackingId = await paygov.completeCollection(permit.paygovToken);
  } catch (paygovError) {
    await permit.update({ status: 'Error', paygovError: paygovError.toString() });
    throw new Error('Paygov Error');
  }
  const updatedPermit = await permit.update({ paygovTrackingId, status: 'Completed' });
  christmasTreePermits.generateRulesAndEmail(updatedPermit);
  return permitResult(updatedPermit);
}

/**
 * @function updatePermitApplication - API function to update permit
 * @param {Object} req - http request
 * @param {Object} res - http response
 */
christmasTreePermits.updatePermitApplication = async (req, res) => {
  try {
    const validToken = jwt.verify(req.query.t, vcapConstants.PERMIT_SECRET);
    if (!validToken) {
      logger.error('Permit not loaded or JWT not decoded.');
      return res.status(404).send();
    }

    const { permitId, status: requestedStatus } = req.body;

    const query = {
      where: { permitId },
      include: [{ model: treesDb.christmasTreesForests }]
    };

    const permit = await treesDb.christmasTreesPermits.findOne(query);

    if (!permit) {
      logger.error('Permit status unknown. 404.');
      return res.status(404).send();
    }

    if (permit.status === 'Error') {
      return res.status(400).json(formatPermitError(permit));
    }

    if (permit.status === 'Completed') {
      return res.status(400).json();
    }

    if (permit.status === 'Initiated' && requestedStatus === 'Cancelled') {
      const updatedPermit = await permit.update({ status: requestedStatus });
      util.logControllerAction(req, 'christmasTreePermits.updatePermitApplication#cancel', updatedPermit);
      return res.status(200).json(updatedPermit);
    }

    if (permit.status === 'Initiated' && requestedStatus === 'Completed') {
      util.logControllerAction(req, 'christmasTreePermits.completePermitTransaction', permit);
      try {
        const permitResponse = await completePermitTransaction(permit);
        res.status(200).send(permitResponse);
      } catch (error) {
        return res.status(400).send(formatPermitError(permit));
      }
    }
  } catch (error) {
    util.handleErrorResponse(error, res, 'updartePermit#end');
  }
};

module.exports = christmasTreePermits;
