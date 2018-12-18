

/**
 * Module for Forest service service functions
 * @module services/forest-service
 */
const moment = require('moment-timezone');
const logger = require('./logger.es6');

const forestService = {};

/**
 * @function parseCuttingAreas - function to parse cutting areas JSON object.
 * @param {Object} cuttingAreas - forest cutting areas from database
 * @return {Object} - parsed cutting areas
 */
forestService.parseCuttingAreas = (cuttingAreas) => {
  let parsedCuttingArea;
  try {
    if (cuttingAreas !== null && typeof cuttingAreas === 'string') {
      parsedCuttingArea = JSON.parse(cuttingAreas);
    }
  } catch (e) {
    logger.error('problem parsing cutting areas', cuttingAreas);
  }

  return parsedCuttingArea;
};

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
    cuttingAreas: forestService.parseCuttingAreas(input.cuttingAreas),
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

module.exports = forestService;
