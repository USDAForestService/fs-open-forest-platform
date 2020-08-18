

/**
 * Module for feedback API to retrieve openforest feedback
 * @module controllers/feedback
 */

const logger = require('../services/logger.es6');
const nrmModal = require('../models/nrm-service.es6');

const nrmService = {};

/**
 * @function getEntries - API function to get all feedback
 * @param {Object} req - http request
 * @param {Object} res - http response
 */
nrmService.getEntries = (req, res) => {
  nrmModal.findAll({
    attributes: ['message']
  }).then((results) => {
    if (results) {
      res.status(200).json(results);
    } else {
      logger.error('404 from getNrmService');
      res.status(404).send();
    }
  }).catch((error) => {
    res.status(400).json(error);
  });
};

module.exports = nrmService;
