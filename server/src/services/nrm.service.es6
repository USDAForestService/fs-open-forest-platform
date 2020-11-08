/**
 * Module for nrm service functions
 * @module services/nrm
 */
const nrmModel = require('../models/nrm-service.es6');

const nrmService = {};

/**
 * @function translateNrmFromDatabaseToClient - function to translate database model to JSON object
 * @param {Object} input - nrm data from database
 * @return {Object} - formatted data object
 */
nrmService.translateNrmFromDatabaseToClient = (input) => {
  const nrm = {
    message: input.message,
    forests: input.forests
  };
  return nrm;
};

nrmService.createNrmPermit = async (nrm) => {
  const transformed = nrmService.translateNrmFromDatabaseToClient(nrm);
  const createNrmResponse = await nrmModel.create(transformed);
  return createNrmResponse;
};

module.exports = nrmService;
