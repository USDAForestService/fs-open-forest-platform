'use strict';

const request = require('request-promise');
const uuid = require('uuid/v4');
const xml2jsParse = require('xml2js').parseString;
//const http = request('http');

const vcapConstants = require('../vcap-constants.es6');
const treesDb = require('../models/trees-db.es6');
const util = require('../util.es6');
const paygov = require('../paygov.es6');

const christmasTree = {};

const translateGuidelinesFromDatabaseToClient = input => {
  return {
    forest: {
      id: input.id,
      forestName: input.forestName,
      description: input.description,
      forestAbbr: input.forestAbbr,
      forestUrl: input.forestUrl,
      orgStructureCode: input.orgStructureCode,
      treeHeight: input.treeHeight,
      stumpHeight: input.stumpHeight,
      stumpDiameter: input.stumpDiameter,
      startDate: input.startDate,
      endDate: input.endDate,
      treeCost: input.treeCost,
      maxNumTrees: input.maxNumTrees,
      allowAdditionalHeight: input.allowAdditionalHeight,
      species: input.christmasTreesForestSpecies.map(species => {
        return {
          id: species.species.id,
          name: species.species.name,
          webUrl: species.species.webUrl,
          status: species.status,
          notes: species.species.speciesNotes.map(notes => {
            return notes.note;
          })
        };
      }),
      locations: input.christmasTreesForestLocations.map(location => {
        return {
          id: location.id,
          district: location.district,
          allowed: location.allowed,
          type: location.type,
          description: location.description,
          imageFilename: location.imageFilename
        };
      })
    }
  };
};

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
    totalCost: input.totalCost
  };
};

christmasTree.getForests = (req, res) => {
  treesDb.christmasTreesForests
    .findAll({
      attributes: ['id', 'forestName', 'description', 'forestAbbr']
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

christmasTree.getOneGuidelines = (req, res) => {
  treesDb.christmasTreesForests
    .findOne({
      where: {
        forestAbbr: req.params.id
      },
      include: [
        {
          model: treesDb.christmasTreesForestSpecies,
          include: [
            {
              model: treesDb.species,
              include: [
                {
                  model: treesDb.speciesNotes
                }
              ]
            }
          ]
        },
        {
          model: treesDb.christmasTreesForestLocations
        }
      ],
      order: [
        [treesDb.christmasTreesForestSpecies, treesDb.species, treesDb.speciesNotes, 'display_order', 'ASC'],
        [treesDb.christmasTreesForestLocations, 'description', 'ASC'],
        [treesDb.christmasTreesForestSpecies, 'id', 'ASC']
      ]
    })
    .then(app => {
      if (app) {
        res.status(200).json(translateGuidelinesFromDatabaseToClient(app));
      } else {
        res.status(404).send();
      }
    })
    .catch(error => {
      res.status(400).json(error);
    });
};

const postPayGov = xmlData => {
  return request.post(
    {
      url: vcapConstants.payGovUrl,
      method: 'POST',
      headers: {
        'Content-Type': 'application/xml'
      },
      body: xmlData
    },
    function(error, response, body) {
      if (!error && response.statusCode == 200) {
        return body;
      } else {
        throw new Error(error);
      }
    }
  );
};

christmasTree.create = (req, res) => {
  treesDb.christmasTreesPermits
    .create(translatePermitFromClientToDatabase(req.body))
    .then(permit => {
      const tcsAppID = vcapConstants.payGovAppId;
      const xmlData = paygov.getXmlForToken(req.body.forestAbbr, req.body.orgStructureCode, permit);
      postPayGov(xmlData).then(xmlResponse => {
        xml2jsParse(xmlResponse, function(err, result) {
          if (!err) {
            try {
              const startOnlineCollectionResponse =
                result['S:Envelope']['S:Body'][0]['ns2:startOnlineCollectionResponse'][0][
                  'startOnlineCollectionResponse'
                ][0];
              const token = startOnlineCollectionResponse.token[0];
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
                  throw new Error(error);
                });
            } catch (error) {
              throw new Error(error);
            }
          }
        });
      });
    })
    .catch(error => {
      if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({
          errors: error.errors
        });
      } else {
        return res.status(500).send();
      }
    });
};

const permitResult = (permit, svgData) => {
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
    permitImage: svgData,
    forest: {
      forestName: permit.christmasTreesForest.forestName,
      forestAbbr: permit.christmasTreesForest.forestAbbr
    }
  };
  return result;
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
      if (permit) {
        if (permit.status == 'Completed') {
          return res.status(404).send();
        } else {
          const xmlData = paygov.getXmlToCompleteTransaction(permit.paygovToken);
          postPayGov(xmlData).then(xmlResponse => {
            xml2jsParse(xmlResponse, function(err, result) {
              if (!err) {
                try {
                  const completeOnlineCollectionResponse =
                    result['S:Envelope']['S:Body'][0]['ns2:completeOnlineCollectionResponse'][0][
                      'completeOnlineCollectionResponse'
                    ][0];
                  const paygovTrackingId = completeOnlineCollectionResponse.paygov_tracking_id[0];
                  permit
                    .update({
                      paygovTrackingId: paygovTrackingId,
                      status: 'Completed'
                    })
                    .then(savedPermit => {
                      paygov.generateSvgPermit(permit).then(svgData => {
                        return res.status(200).send(permitResult(savedPermit, svgData));
                      });
                    });
                } catch (error) {
                  throw new Error(error);
                }
              } else {
                throw new Error(err);
              }
            });
          });
        }
      } else {
        res.status(404).send();
      }
    })
    .catch(error => {
      if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({
          errors: error.errors
        });
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
      }
      else {
        res.status(200).json(permit);
      }
    })
    .catch(() => {
      res.status(404).send();
    });
};
module.exports = christmasTree;
