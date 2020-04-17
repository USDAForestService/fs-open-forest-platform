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
  const startDate = moment(input.startDate).local();
  const endDate = moment(input.endDate).local();

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
    startDate: startDate.format('YYYY-MM-DD HH:mm:ss'),
    endDate: endDate.format('YYYY-MM-DD HH:mm:ss'),
    treeCost: input.treeCost,
    maxNumTrees: input.maxNumTrees,
    allowAdditionalHeight: input.allowAdditionalHeight,
    timezone: input.timezone,
    state: input.state
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

forestService.isForestOpen = (forest) => {
  let start = moment(forest.startDate);
  let end = moment(forest.endDate);
  start = start.startOf('day');
  end = end.endOf('day');
  return moment().isBetween(start, end, null, '[]');
};

module.exports = forestService;
