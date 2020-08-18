/**
 * Module for nrm service functions
 * @module services/nrm-service
 */
const nrmModal = require('../models/nrm-service.es6');

const nrmService = {};

/**
 * @function translateNrmFromDatabaseToClient - function to translate database model to JSON object
 * @param {Object} input - nrm data from database
 * @return {Object} - formatted data object
 */
nrmService.translateNrmFromDatabaseToClient = (input) => {
  const nrmConnection = {
    message: input.message
  };
  return nrmConnection;
};

nrmService.createFeedback = async (feedback) => {
  const transformed = nrmService.translateNrmFromDatabaseToClient(feedback);
  const nrmResponse = await nrmModal.create(transformed);
  return nrmResponse;
};

module.exports = nrmService;
