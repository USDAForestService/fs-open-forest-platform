'use strict';

const request = require('request-promise');
const uuid = require('uuid/v4');
const xml2jsParse = require('xml2js').parseString;
const moment = require('moment-timezone');
const zpad = require('zpad');
const htmlToText = require('html-to-text');

const vcapConstants = require('../vcap-constants.es6');
const treesDb = require('../models/trees-db.es6');
const paygov = require('../services/paygov.es6');
const permitSvgService = require('../services/svg-util.es6');
const jwt = require('jsonwebtoken');
const email = require('../email/email-util.es6');
const forestService = require('../services/forest.service.es6');

const christmasTree = {};

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

christmasTree.getForests = (req, res) => {
  treesDb.christmasTreesForests
    .findAll({
      attributes: ['id', 'forestName', 'forestNameShort', 'description', 'forestAbbr', 'startDate', 'endDate'],
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

const postPayGov = xmlData => {
  const payGovPrivateKey = Buffer.from(vcapConstants.payGovPrivateKey, 'utf8');
  const payGovCert = Buffer.from(vcapConstants.payGovCert[0], 'utf8');

  return request.post(
    {
      url: vcapConstants.payGovUrl,
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

const permitResult = (permit, permitSvg) => {
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
    permitImage: permitSvg ? permitSvg : null,
    forest: {
      forestName: permit.christmasTreesForest ? permit.christmasTreesForest.forestName : null,
      forestAbbr: permit.christmasTreesForest ? permit.christmasTreesForest.forestAbbr : null,
      forestNameShort: permit.christmasTreesForest ? permit.christmasTreesForest.forestNameShort : null
    }
  };
  return result;
};

const updatePermitWithToken = (res, permit, token) => {
  const tcsAppID = vcapConstants.payGovAppId;
  permit
    .update({
      paygovToken: token
    })
    .then(savedPermit => {
      return res.status(200).json({
        token: token,
        permitId: savedPermit.permitId,
        payGovUrl: vcapConstants.payGovClientUrl,
        tcsAppID: tcsAppID
      });
    })
    .catch(error => {
      console.error(error);
      return res.status(500).send();
    });
};

const updatePermitWithError = (res, permit, paygovError) => {
  updatePermit(permit, {
    status: 'Error',
    paygovError: JSON.stringify(paygovError)
  }).then(updatedPermit => {
    return getPermitError(res, updatedPermit);
  });
};

const getPermitError = (res, permit) => {
  let permitErrors = JSON.parse(permit.paygovError);
  return res.status(400).json({
    errors: [
      {
        status: 400,
        errorCode: permitErrors.errorCode[0],
        message: permitErrors.errorMessage[0],
        permit: permitResult(permit, null)
      }
    ]
  });
};

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
            const xmlData = paygov.getXmlForToken(req.body.forestAbbr, req.body.orgStructureCode, permit);
            postPayGov(xmlData)
              .then(xmlResponse => {
                xml2jsParse(xmlResponse, function(err, result) {
                  if (!err) {
                    try {
                      const token = paygov.getToken(result);
                      return updatePermitWithToken(res, permit, token);
                    } catch (error) {
                      try {
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

const returnSavedPermit = (res, savedPermit, permitSvg) => {
  return res.status(200).send(permitResult(savedPermit, permitSvg));
};

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

const throwError = err => {
  throw new Error(err);
};

const checkPermitValid = permitExpireDate => {
  return moment(permitExpireDate).isAfter(moment());
};

const generateRulesAndEmail = (permitSvg, permit) => {
  permitSvgService
    .generatePng(permitSvg)
    .then(permitPng => {
      permitSvgService
        .generateRulesHtml(permit)
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
    })
    .catch(error => {
      console.error(error);
    });
};

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
      } else if (permit && permit.status === 'Initiated') {
        const xmlData = paygov.getXmlToCompleteTransaction(permit.paygovToken);
        postPayGov(xmlData).then(xmlResponse => {
          parseXMLFromPayGov(res, xmlResponse, permit)
            .then(paygovTrackingId => {
              return updatePermit(permit, {
                paygovTrackingId: paygovTrackingId,
                status: 'Completed'
              });
            })
            .then(updatedPermit => {
              permitSvgService.generatePermitSvg(permit).then(permitSvg => {
                returnSavedPermit(res, permit, permitSvg);
                generateRulesAndEmail(permitSvg, updatedPermit);
              });
            })
            .catch(error => {
              throwError(error);
            });
        });
      } else if (permit && permit.status === 'Completed') {
        const token = req.query.t;
        jwt.verify(token, vcapConstants.permitSecret, function(err, decoded) {
          if (decoded) {
            if (checkPermitValid(permit.permitExpireDate)) {
              permitSvgService.generatePermitSvg(permit).then(permitSvg => {
                returnSavedPermit(res, permit, permitSvg);
              });
            } else {
              returnSavedPermit(res, permit, null);
            }
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

christmasTree.getOnePermitDetail = (req, res) => {
  treesDb.christmasTreesPermits
    .findOne({
      where: {
        permitId: req.params.id
      }
    })
    .then(permit => {
      if (permit.status === 'Completed') {
        res.status(404).send();
      } else {
        res.status(200).json(permit);
      }
    })
    .catch(error => {
      console.error(error);
      res.status(404).send();
    });
};

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
        let rulesInd = false;
        if (req.query.rules && req.query.rules === 'true') {
          rulesInd = true;
        }
        permitSvgService.generatePermitSvg(permit).then(permitSvg => {
          if (rulesInd) {
            permitSvgService.generateRulesHtml(permit).then(rulesHtml => {
              res.status(200).json({
                permitImage: permitSvg + rulesHtml
              });
            });
          } else {
            res.status(200).json({
              permitImage: permitSvg
            });
          }
        });
      } else {
        res.status(404).send();
      }
    })
    .catch(error => {
      console.error(error);
      res.status(404).send();
    });
};

christmasTree.update = (req, res) => {
  treesDb.christmasTreesPermits
    .findOne({
      where: {
        permitId: req.body.permitId
      }
    })
    .then(permit => {
      if (permit.status !== 'Initiated' && permit.status !== 'Completed') {
        res.status(404).send();
      } else {
        permit
          .update({
            status: req.body.status
          })
          .then(res.status(200).json(permit));
      }
    })
    .catch(() => {
      res.status(404).send();
    });
};

module.exports = christmasTree;
