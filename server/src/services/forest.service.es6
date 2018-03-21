'use strict';

/**
 * Module for Forest service service functions
 * @module services/forest-service
 */
const moment = require('moment-timezone');

const forestService = {};

/**
 * @function parseCuttingAreas - function to parse cutting areas JSON object.
 * @param {string} cuttingAreas
 */
forestService.parseCuttingAreas = cuttingAreas => {
  try {
    if (cuttingAreas !== null && typeof cuttingAreas === 'string') {
      cuttingAreas = JSON.parse(cuttingAreas);
    }
  } catch (e) {
    console.error('problem parsing cutting areas', cuttingAreas);
  }

  return cuttingAreas;
};

/**
 * @function translateForestFromDatabaseToClient - function to translate database model to JSON object
 * @param {Object} input
 */
forestService.translateForestFromDatabaseToClient = input => {
  let startDate = moment(input.startDate);
  let endDate = moment(input.endDate);

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

module.exports = forestService;
