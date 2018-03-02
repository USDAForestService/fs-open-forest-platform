'use strict';

const factory = require('unionized');

module.exports = factory.factory({
  id: 1,
  forestName: 'Arapaho and Roosevelt National Forests',
  description: 'Arapaho & Roosevelt | Colorado | Fort Collins, CO',
  forestAbbr: 'arp',
  forestUrl: 'https://www.fs.usda.gov/main/arp',
  treeHeight: 0,
  stumpHeight: 6,
  stumpDiameter: 6,
  startDate: new Date('2017-11-01T12:00:00.000Z'),
  endDate: new Date('2020-12-24T12:00:00.000Z'),
  orgStructureCode: '11-02-10T',
  treeCost: '10.00',
  maxNumTrees: 5,
  allowAdditionalHeight: null,
  createdAt: new Date('2018-01-19T17:13:03.471Z'),
  updatedAt: new Date('2018-01-19T17:13:03.471Z'),
  forestNameShort: 'Arapaho and Roosevelt',
  timezone: 'America/Denver',
  cuttingAreas: {
    ELKCREEK: { startDate: '2018-12-02 15:30:00Z', endDate: '2018-12-09 21:30:00Z' },
    REDFEATHERLAKES: { startDate: '2018-12-02 15:30:00Z', endDate: '2018-12-10 21:30:00Z' },
    SULPHUR: { startDate: '2018-11-01 12:00:00Z', endDate: '2019-01-06 21:30:00Z' },
    CANYONLAKES: { startDate: '2018-11-27 15:30:00Z', endDate: '2018-12-10 21:30:00Z' }
  }
});
