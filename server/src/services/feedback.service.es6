/**
 * Module for Feedback service functions
 * @module services/feedback-service
 */
const moment = require('moment-timezone');
const feedbackModel = require('../models/feedback.es6');

const feedbackService = {};

/**
 * @function translateFeedbackFromDatabaseToClient - function to translate database model to JSON object
 * @param {Object} input - feedback data from database
 * @return {Object} - formatted data object
 */
feedbackService.translateFeedbackFromDatabaseToClient = (input) => {

  return {
    id: input.id,
    email: input.email,
    feedback: input.feedback,
    forests: input.forests
  };
};

feedbackService.createFeedback = async (feedback) => {
  const transformed = feedbackService.translateFeedbackFromDatabaseToClient(feedback);
  const createFeedbackResponse = await feedbackModel.create(transformed);
  return createFeedbackResponse;
};

module.exports = feedbackService;
