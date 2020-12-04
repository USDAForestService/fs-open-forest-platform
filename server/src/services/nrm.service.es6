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
    permitCn: input.permitCn,
    regionName: input.regionName,
    regionCode: input.regionCode,
    forestName: input.forestName,
    forestCode: input.forestCode,
    districtCode: input.districtCode,
    districtName: input.districtName,
    planCn: input.planCn,
    planNo: input.planNo,
    planDescription: input.planDescription,
    issueNumber: input.issueNumber,
    issueDate: input.issueDate,
    permUseCode: input.permUseCode,
    percentOfSalvageVolume: input.percentOfSalvageVolume,
    percentOfCwk2Volume: input.percentOfCwk2Volume,
    percentOfCflrVolume: input.percentOfCflrVolume,
    percentOfNftmVolume: input.percentOfNftmVolume,
    stateCode: input.stateCode,
    stateName: input.stateName,
    numberOfPermits: input.numberOfPermits,
    convertibleNonConvertible: input.convertibleNonConvertible,
    spuInfo: input.spuInfo
  };
  return nrm;
};

nrmService.createNrmPermit = async (nrm) => {
  const transformed = nrmService.translateNrmFromDatabaseToClient(nrm);
  const createNrmResponse = await nrmModel.create(transformed);
  return createNrmResponse;
};

module.exports = nrmService;
