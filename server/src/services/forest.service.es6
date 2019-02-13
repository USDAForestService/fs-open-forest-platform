/**
 * Module for Forest service service functions
 * @module services/forest-service
 */
const moment = require('moment-timezone');

const forestService = {};

/**
 * @function translateForestFromDatabaseToClient - function to translate database model to JSON object
 * @param {Object} input -forest data from database
 * @return {Object} - formatted data object
 */
forestService.translateForestFromDatabaseToClient = (input) => {
  const startDate = moment(input.startDate);
  const endDate = moment(input.endDate);

  return {
    id: input.id,
    forestName: input.forestName,
    cuttingAreas: input.cuttingAreas,
    description: input.description,
    forestAbbr: input.forestAbbr,
    forestNameShort: input.forestNameShort,
    forestUrl: input.forestUrl,
    orgStructureCode: input.orgStructureCode,
    treeHeight: input.treeHeight,
    stumpHeight: input.stumpHeight,
    stumpDiameter: input.stumpDiameter,
    startDate: startDate.tz(input.timezone).format('YYYY-MM-DD HH:mm:ss'),
    endDate: endDate.tz(input.timezone).format('YYYY-MM-DD HH:mm:ss'),
    treeCost: input.treeCost,
    maxNumTrees: input.maxNumTrees,
    allowAdditionalHeight: input.allowAdditionalHeight,
    timezone: input.timezone
  };
};

/**
 * @function specialUseForestName
 * @param {String} forestCode
 * @returns {String} Name of the forest
 */
forestService.specialUseForestName = (forestCode) => {
  if (forestCode === '0605') {
    return 'Mt.Baker - Snoqualmie National Forest';
  }
  return '';
};

forestService.isForestOpen = forest => moment().isBetween(forest.startDate, forest.endDate, null, '[]');

module.exports = forestService;
