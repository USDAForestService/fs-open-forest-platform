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

  const cuttingAreas =
    '{ "ELKCREEK": {"startDate": "2017-12-02 15:30:00Z", "endDate": "2017-12-09 21:30:00Z"},' +
    '"REDFEATHERLAKES": {"startDate": "2017-12-02 15:30:00Z", "endDate": "2017-12-10 21:30:00Z"},' +
    '"SULPHUR": {"startDate": "2017-11-01 12:00:00Z", "endDate": "2018-01-06 21:30:00Z"},' +
    '"CANYONLAKES": {"startDate": "2017-11-27 15:30:00Z", "endDate": "2017-12-10 21:30:00Z"} }'
  ;


  return {
    id: input.id,
    forestName: input.forestName,
    cuttingAreas: input.forestAbbr === 'arp' ? JSON.parse(cuttingAreas): null,
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