'use strict';

/**
 * Module for chrismtmas tree public API
 * @module controllers/chrismtmas-tree
 */

const request = require('request-promise');
const uuid = require('uuid/v4');
const xml2jsParse = require('xml2js').parseString;
const moment = require('moment-timezone');
const zpad = require('zpad');
const htmlToText = require('html-to-text');

const vcapConstants = require('../vcap-constants.es6');
const treesDb = require('../models/trees-db.es6');
const paygov = require('../services/paygov.es6');
const permitSvgService = require('../services/christmas-trees-permit-svg-util.es6');
const jwt = require('jsonwebtoken');
const email = require('../email/email-util.es6');
const forestService = require('../services/forest.service.es6');

const christmasTree = {};

/**
 * @function translatePermitFromClientToDatabase - Private function to translate request data to the database json object
 * @param {Object} input - christmas trees permit object from database
 * @return {Object} - formatted permit object
 */
const translatePermitFromClientToDatabase = input => {
  return {
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
  };
};

/**
 * @function getForests - API function to get all forests
 * @param {Object} req - http request
 * @param {Object} res - http response
 */
christmasTree.getForests = (req, res) => {
  treesDb.christmasTreesForests
    .findAll({
      attributes: ['id', 'forestName', 'forestNameShort', 'description', 'forestAbbr', 'startDate', 'endDate', 'timezone'],
      order: [['id', 'ASC']]
    })
    .then(results => {
      if (results) {
        res.status(200).json(results);
      } else {
        res.status(404).send();
      }
    })
    .catch(error => {
      res.status(400).json(error);
    });
};

/**
 * @function getForest - API function to get one forest by the forest abbreviation
 * @param {Object} req - http request
 * @param {Object} res - http response
 */
christmasTree.getForest = (req, res) => {
  treesDb.christmasTreesForests
    .findOne({
      where: {
        forestAbbr: req.params.id
      }
    })
    .then(app => {
      if (app) {
        res.status(200).json(forestService.translateForestFromDatabaseToClient(app));
      } else {
        res.status(404).send();
      }
    })
    .catch(error => {
      console.error('christmasTree controller getForest error for forest abbr ' + req.params.id, error);
      res.status(400).json(error);
    });
};

/**
 * @function postPayGov - Private function to make a post request to pay.gov/mock pay.gov
 * @param {String} xmlData - xml to be posted to payGov endpoint
 * @return {Object} - response from payGov
 */
const postPayGov = xmlData => {
  const payGovPrivateKey = Buffer.from(vcapConstants.PAY_GOV_PRIVATE_KEY, 'utf8');
  const payGovCert = Buffer.from(vcapConstants.PAY_GOV_CERT[0], 'utf8');

  return request.post(
    {
      url: vcapConstants.PAY_GOV_URL,
      method: 'POST',
      headers: {
        'Content-Type': 'application/xml'
      },
      body: xmlData,
      key: payGovPrivateKey,
      cert: payGovCert
    },
    function(error, response, body) {
      if (!error) {
        return body;
      } else {
        return error;
      }
    }
  );
};

/**
 * @function permitResult - Private function to return formatted permit result
 * @param {Object} permit - permit object from database
 * @return {Object} - formatted permit object
 */
const permitResult = permit => {
  const result = {
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
  };
  return result;
};

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
    .then(savedPermit => {
      return res.status(200).json({
        token: token,
        permitId: savedPermit.permitId,
        payGovUrl: vcapConstants.PAY_GOV_CLIENT_URL,
        tcsAppID: tcsAppID
      });
    })
    .catch(error => {
      console.error(error);
      return res.status(500).send();
    });
};

/**
 * @function updatePermitWithError - Private function to update permit's status to error
 * @param {Object} res - http response
 * @param {Object} permit - permit object from database
 * @param {string} paygovError - error from payGov
 * @return {Object} - http response
 */
const updatePermitWithError = (res, permit, paygovError) => {
  updatePermit(permit, {
    status: 'Error',
    paygovError: JSON.stringify(paygovError)
  }).then(updatedPermit => {
    return getPermitError(res, updatedPermit);
  });
};

/**
 * @function getPermitError - Private function to error objects from the permit's errors
 * @param {Object} res - http response
 * @param {Object} permit - permit object from database
 * @return {Object} - http response
 */
const getPermitError = (res, permit) => {
  let permitErrors = JSON.parse(permit.paygovError);
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
 * @function create - API function to create permit application
 * @param {Object} req - http request
 * @param {Object} res - http response
 * @return {Object} http response
 */
christmasTree.create = (req, res) => {
  treesDb.christmasTreesForests
    .findOne({
      where: {
        id: req.body.forestId
      }
    })
    .then(forest => {
      if (!moment().isBetween(forest.startDate, forest.endDate, null, '[]')) {
        return res.status(404).send(); // season is closed or not yet started
      } else {
        req.body.expDate = forest.endDate;
        treesDb.christmasTreesPermits
          .create(translatePermitFromClientToDatabase(req.body))
          .then(permit => {
            const xmlData = paygov.getXmlForToken(forest.forestAbbr, forest.possFinancialId, permit);
            postPayGov(xmlData)
              .then(xmlResponse => {
                xml2jsParse(xmlResponse, function(err, result) {
                  if (!err) {
                    try {
                      const token = paygov.getToken(result);
                      return updatePermitWithToken(res, permit, token);
                    } catch (error) {
                      try {
                        console.log('error=', error);
                        const paygovError = paygov.getResponseError('startOnlineCollection', result);
                        return updatePermitWithError(res, permit, paygovError);
                      } catch (faultError) {
                        throwError(faultError);
                      }
                    }
                  }
                });
              })
              .catch(error => {
                console.error('postPayGov error=', error);
                return res.status(500).send();
              });
          })
          .catch(error => {
            console.error('permit create error=', error);
            if (error.name === 'SequelizeValidationError') {
              return res.status(400).json({
                errors: error.errors
              });
            } else {
              return res.status(500).send();
            }
          });
      }
    })
    .catch(error => {
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
      content: new Buffer(permitPng, 'utf-8'),
      cid: 'christmas-tree-permit-image'
    },
    {
      filename: 'permit-attachment.png',
      content: new Buffer(permitPng, 'utf-8')
    },
    {
      filename: 'permit-rules.html',
      content: new Buffer(rulesHtml, 'utf-8')
    },
    {
      filename: 'permit-rules.txt',
      content: new Buffer(rulesText, 'utf-8')
    }
  ];
  email.sendEmail('christmasTreesPermitCreated', savedPermit, attachments);
};

/**
 * @function returnSavedPermit - Private function to return permit
 * @param {Object} res - http response
 * @param {Object} savedPermit - permit from database
 * @return {Object} - http response
 */
const returnSavedPermit = (res, savedPermit) => {
  return res.status(200).send(permitResult(savedPermit));
};

/**
 * @function updatePermit - Private function to update permit in database
 * @param {Object} permit - permit object from database
 * @param {Object} updateObject - updated permit object
 * @return {Object} - saved permit
 */
const updatePermit = (permit, updateObject) => {
  return new Promise((resolve, reject) => {
    permit
      .update(updateObject)
      .then(permit => {
        resolve(permit);
      })
      .catch(error => {
        reject(error);
      });
  });
};

/**
 * @function parseXMLFromPayGov - Private function to parse the returned XML from payGov
 * @param {Object} res - http response
 * @param {string} xmlResponse - xml response from payGov api call
 * @param {Object} permit - permit object
 * @return {string} - paygov tracking id
 */
const parseXMLFromPayGov = (res, xmlResponse, permit) => {
  return new Promise((resolve, reject) => {
    xml2jsParse(xmlResponse, (err, result) => {
      if (err) {
        reject(err);
      } else {
        try {
          const paygovTrackingId = paygov.getTrackingId(result);
          resolve(paygovTrackingId);
        } catch (error) {
          try {
            const paygovError = paygov.getResponseError('completeOnlineCollection', result);
            return updatePermitWithError(res, permit, paygovError);
          } catch (faultError) {
            reject(faultError);
          }
        }
      }
    });
  });
};

/**
 * @function throwError - Private function to return Error
 * @param {Object} error - error data
 * @return {Object} - error object
 */
const throwError = err => {
  throw new Error(err);
};

/**
 * @function permitExpireDate - Private function to check if permit expire date is in future
 * @param {date} permitExpireDate - expiration date
 * @return {boolean} - expiration date is is after current date
 */
const checkPermitValid = permitExpireDate => {
  return moment(permitExpireDate).isAfter(moment());
};

/**
 * @function generateRulesAndEmail - Private function to generate svg, png, and rules html of a permit and send out email
 * @param {Object} permit - permit object
 */
const generateRulesAndEmail = permit => {
  permitSvgService
    .generatePermitSvg(permit)
    .then(permitSvg => {
      permitSvgService.generatePng(permitSvg).then(permitPng => {
        permitSvgService
          .generateRulesHtml(true, permit)
          .then(rulesHtml => {
            permit.permitUrl = paygov.createSuccessUrl(permit.christmasTreesForest.forestAbbr, permit.permitId);
            let rulesText = htmlToText.fromString(rulesHtml, {
              wordwrap: 130,
              ignoreImage: true
            });
            sendEmail(permit, permitPng, rulesHtml, rulesText);
          })
          .catch(error => {
            console.error(error);
          });
      });
    })
    .catch(error => {
      console.error(error);
    });
};

/**
 * @function getOnePermit - API function to get a permit.
 * @param {Object} req - http request
 * @param {Object} res - http response
 * @return {Object} - saved permit object
 */
christmasTree.getOnePermit = (req, res) => {
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
    .then(permit => {
      if (permit && permit.status === 'Error') {
        return getPermitError(res, permit);
      } else if (permit) {
        const token = req.query.t;
        jwt.verify(token, vcapConstants.PERMIT_SECRET, function(err, decoded) {
          if (decoded) {
            returnSavedPermit(res, permit);
          } else {
            return res.status(404).send();
          }
        });
      } else if (!permit) {
        return res.status(404).send();
      }
    })
    .catch(error => {
      console.error(error);
      if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({
          errors: error.errors
        });
      } else if (error.name === 'SequelizeDatabaseError') {
        return res.status(404).send();
      } else {
        return res.status(500).send();
      }
    });
};

/**
 * @function printPermit - API function to get permit svg or rules html
 * @param {Object} req - http request
 * @param {Object} res - http response
 * @return {Object} http reponse with permit svg or riles html
 */
christmasTree.printPermit = (req, res) => {
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
    .then(permit => {
      if (permit.status === 'Completed') {
        if (!checkPermitValid(permit.permitExpireDate)) {
          res.status(404).send();
        } else if (!req.query.rules || req.query.permit === 'true') {
          permitSvgService.generatePermitSvg(permit).then(permitSvg => {
            res.status(200).json({
              result: permitSvg
            });
          });
        } else if (req.query.rules === 'true') {
          permitSvgService.generateRulesHtml(false, permit).then(rulesHtml => {
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
    .catch(error => {
      console.error(error);
      res.status(404).send();
    });
};

/**
 * @function updatePermitApplication - API function to update permit
 * @param {Object} req - http request
 * @param {Object} res - http response
 * @return {Object} - updated permit
 */
christmasTree.updatePermitApplication = (req, res) => {
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
    .then(permit => {
      const token = req.query.t;
      jwt.verify(token, vcapConstants.PERMIT_SECRET, function(err, decoded) {
        if (decoded && permit) {
          if (permit.status === 'Initiated' && req.body.status === 'Cancelled') {
            return permit
              .update({
                status: req.body.status
              })
              .then(res.status(200).json(permit));
          } else if (permit.status === 'Initiated' && req.body.status === 'Completed') {
            const xmlData = paygov.getXmlToCompleteTransaction(permit.paygovToken);
            postPayGov(xmlData).then(xmlResponse => {
              parseXMLFromPayGov(res, xmlResponse, permit)
                .then(paygovTrackingId => {
                  return updatePermit(permit, {
                    paygovTrackingId: paygovTrackingId,
                    status: req.body.status
                  });
                })
                .then(updatedPermit => {
                  returnSavedPermit(res, permit);
                  generateRulesAndEmail(updatedPermit);
                })
                .catch(error => {
                  throwError(error);
                });
            });
          } else {
            return res.status(404).send();
          }
        } else {
          return res.status(404).send();
        }
      });
    })
    .catch(() => {
      res.status(404).send();
    });
};

module.exports = christmasTree;
