'use strict';

/**
 * Module for Forest service
 *
 */
const moment = require('moment-timezone');

const forestService = {};

forestService.translateForestFromDatabaseToClient = input => {
  let startDate = moment(input.startDate);
  let endDate = moment(input.endDate);

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
 * forest service
 * @exports forestService
 */
module.exports = forestService;
