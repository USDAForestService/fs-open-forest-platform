

/**
 * Module for feedback API to retrieve openforest feedback
 * @module controllers/nrm-service
 */

const logger = require('../services/logger.es6');
const nrmEntries = require('../models/nrm-service.es6');

const nrm = {};

/**
 * @function getEntries - API function to get all feedback
 * @param {Object} req - http request
 * @param {Object} res - http response
 */
nrm.getEntries = (req, res) => {
  nrmEntries.findAll({
    attributes: ['id', 'permitCn', 'regionCode', 'regionName', 'forestCode', 'forestName', 'districtCode',
      'districtName', 'planCn', 'planNo', 'planDescription', 'issueNumber', 'permUseCode', 'percentOfSalvageVolume',
      'percentOfCwk2Volume', 'percentOfCflrVolume', 'percentOfNftmVolume', 'stateCode', 'stateName', 'numberOfPermits',
      'convertibleNonConvertible', 'spuInfo'],
    order: [['permitCn', 'ASC']]
  }).then((results) => {
    if (results) {
      res.status(200).json(results);
    } else {
      logger.error('404 from getnrm');
      res.status(404).send();
    }
  }).catch((error) => {
    res.status(400).json(error);
  });
};

nrm.create = async (req, res) => {
  nrm.createService(req.body).then((entry) => {
    res.status(200).json(entry);
  }).catch((error) => {
    res.status(500).json(error);
  });
};

module.exports = nrm;
