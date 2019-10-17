

/**
 * Module for feedback API to retrieve openforest feedback
 * @module controllers/feedback
 */

const logger = require('../services/logger.es6');
const feedbackModel = require('../models/feedback.es6');
const feedbackService = require('../services/feedback.service.es6');
const util = require('../services/util.es6');

const feedback = {};

/**
 * @function getEntries - API function to get all feedback
 * @param {Object} req - http request
 * @param {Object} res - http response
 */
feedback.getEntries = (req, res) => {
  feedbackModel.findAll({
    attributes: ['message', 'forests', 'created'],
    order: [['created', 'ASC']]
  }).then((results) => {
    if (results) {
      res.status(200).json(results);
    } else {
      logger.error('404 from getFeedback');
      res.status(404).send();
    }
  }).catch((error) => {
    res.status(400).json(error);
  });
};

/**
 * @function getEntry - API function to get one entry by id
 * @param {Object} req - http request
 * @param {Object} res - http response
 */
feedback.getEntry = (req, res) => {
  feedbackModel.findOne({
    where: {
      id: req.params.id
    }
  }).then(() => {
    if (feedback) {
      res.status(200).json(feedbackService.translateFeedbackFromDatabaseToClient(feedback));
    } else {
      logger.error('404 from getEntry');
      res.status(404).send();
    }
  }).catch((error) => {
    logger.error(`ERROR: ServerError: feedback controller getEntry error for entry ${req.params.id}`, error);
    res.status(400).json(error);
  });
};

// API function to create a new feedback entry
feedback.createEntry = async (req, res) => {
  feedbackService.createFeedback(req.body).then((entry) => {
    res.status(200).json(entry);
  }).catch((error) => {
    res.status(500).json(error);
    util.handleErrorResponse(error, res, '  createEntry#end  ');
  });
};

// API function to delete an openforest entry
feedback.deleteEntry = (req, res) => {
  feedbackModel.destroy({
    where: {
      id: req.params.id
    }
  }).then((result) => {
    res.status(200).json(result);
  }).catch((error) => {
    res.status(500).json(error);
    logger.error(`Failure to delete entry ${req.params.id}`);
    util.handleErrorResponse(error, res, 'deleteEntry#end');
  });
};

module.exports = feedback;
