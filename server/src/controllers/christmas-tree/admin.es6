/* eslint-disable prefer-destructuring */
/**
 * Module for christmas tree admin API
 * @module controllers/christmas-tree/admin
 */

const moment = require('moment-timezone');
const Sequelize = require('sequelize');
const zpad = require('zpad');
const logger = require('../../services/logger.es6');

const treesDb = require('../../models/trees-db.es6');
const util = require('../../services/util.es6');

const christmasTreeAdmin = {};
const operator = Sequelize.Op;

/**
 * @private
 * @function getPermitResult - Format dates and pad permit number
 * @param {Object} permit - input permit object
 * @return {Object} updated permit object
 */
const getPermitResult = (permit) => {
  const eachPermit = {};
  eachPermit.forestAbbr = permit.christmasTreesForest.forestAbbr;
  eachPermit.forestNameShort = permit.christmasTreesForest.forestNameShort;
  eachPermit.permitNumber = zpad(permit.permitNumber, 8); // Adds padding to each permit number for readiblity

  if (permit.christmasTreesForest && permit.christmasTreesForest.timezone) {
    eachPermit.issueDate = moment.tz(permit.purchaseDate, permit.christmasTreesForest.timezone).format('MM/DD/YYYY');

    eachPermit.expireDate = moment
      .tz(permit.permitExpireDate, permit.christmasTreesForest.timezone)
      .format('MM/DD/YYYY');
  } else {
    eachPermit.issueDate = moment(permit.purchaseDate).format('MM/DD/YYYY');
    eachPermit.expireDate = moment(permit.permitExpireDate).format('MM/DD/YYYY');
  }
  eachPermit.quantity = permit.quantity;
  eachPermit.totalCost = permit.totalCost;
  return eachPermit;
};

/**
 * @private
 * @function buildPermitsReport - Create a summary report for a group of permits
 * @param {Object} results - permits results from database
 * @param {Object} permitSummary - summary of permit information
 */
const buildPermitsReport = (results) => {
  const permits = [];
  let sumOfTrees = 0;
  let sumOfCost = 0;

  results.forEach((permit) => {
    sumOfTrees += permit.quantity;
    sumOfCost += parseFloat(permit.totalCost);
    permits.push(getPermitResult(permit));
  });

  return {
    sumOfTrees,
    sumOfCost: sumOfCost.toFixed(2),
    numberOfPermits: results.length,
    permits
  };
};

/**
 * @function getPermitSummaryReport - permit summary report for the selected forest and given data range
 * @param {Object} req - http request
 * @param {Object} res - http response
 */
christmasTreeAdmin.getPermitSummaryReport = async (req, res) => {
  const { endDate, forestId, startDate } = req.query;
  const { adminUsername, forests: userForests } = req.user;

  logger.info(`${adminUsername} generated a report`);

  const startDatetime = moment(startDate).hour(0).minute(0).second(0)
    .format('YYYY-MM-DDTHH:mm:ss');
  const endDatetime = moment(endDate).hour(23).minute(59).second(59)
    .format('YYYY-MM-DDTHH:mm:ss');

  const forestIdFilter = forestId === 'ALL Forests' ? {} : { forestId };
  const forestFilter = userForests[0] === 'all' ? {} : { forestAbbr: { [operator.in]: userForests } };
  // eslint-disable-next-line max-len
  const dateComparison = Sequelize.literal(`( "christmasTreesPermits".purchase_date AT TIME ZONE "christmasTreesForest".timezone ) BETWEEN '${startDatetime}' AND '${endDatetime}'`);

  const query = {
    attributes: [
      'forestId',
      'permitNumber',
      'updatedAt',
      'purchaseDate',
      'quantity',
      'totalCost',
      'permitExpireDate',
      'christmasTreesForest.timezone',
      'christmasTreesForest.forest_abbr',
      'christmasTreesForest.forest_name_short'
    ],
    include: [
      {
        model: treesDb.christmasTreesForests,
        where: forestFilter
      }
    ],
    where: {
      ...forestIdFilter,
      status: 'Completed',
      [operator.and]: [dateComparison]
    },
    order: [['updatedAt', 'ASC']]
  };

  try {
    const permits = await treesDb.christmasTreesPermits.findAll(query);
    const report = buildPermitsReport(permits);
    res.status(200).json(report);
  } catch (error) {
    util.handleErrorResponse(error, res, 'getPermitSummaryReport#end');
  }
};

/**
 * @function getPermitReport - permit report for the given permit number
 * @param {Object} req - http request
 * @param {Object} res - http response
 */
christmasTreeAdmin.getPermitReport = async (req, res) => {
  const { permitNumber } = req.params;

  const query = {
    attributes: [
      'permitId',
      'forestId',
      'permitNumber',
      'updatedAt',
      'purchaseDate',
      'quantity',
      'totalCost',
      'permitExpireDate',
      'christmasTreesForest.timezone',
      'christmasTreesForest.forest_abbr',
      'christmasTreesForest.forest_name_short'
    ],
    include: [{ model: treesDb.christmasTreesForests }],
    where: {
      permitNumber,
      status: 'Completed'
    }
  };

  try {
    const permit = await treesDb.christmasTreesPermits.findOne(query);

    if (!permit) {
      const err = {
        errors: [{
          errorCode: 'notFound',
          message: `Permit number ${permitNumber} was not found.`
        }]
      };
      return res.status(400).json(err);
    }

    const report = buildPermitsReport([permit]);
    return res.status(200).json(report);
  } catch (error) {
    return util.handleErrorResponse(error, res, 'getPermitReport#end');
  }
};

/**
 * @function updateForestDetails - Updage forest
 * @param {Object} req - http request
 * @param {Object} res - http response
 */
christmasTreeAdmin.updateForestDetails = (req, res) => {
  treesDb.christmasTreesForests
    .findOne({
      where: {
        id: req.params.forestId
      }
    })
    .then((forest) => {
      if (forest) {
        if (req.user.forests.includes(forest.forestAbbr) || req.user.forests.includes('all')) {
          let startDate = forest.startDate;
          let endDate = forest.endDate;
          let cuttingAreas = forest.cuttingAreas;

          if (req.body.cuttingAreas) {
            cuttingAreas = req.body.cuttingAreas;
          }
          if (req.body.startDate && req.body.endDate) {
            startDate = moment.tz(req.body.startDate, forest.timezone).format(util.datetimeFormat);
            endDate = moment
              .tz(req.body.endDate, forest.timezone)
              .add(0, 'days')
              .subtract(1, 'ms')
              .format(util.datetimeFormat);
          }
          return forest
            .update({ startDate, endDate, cuttingAreas })
            .then(savedForest => res.status(200).json(savedForest));
        }
        const errorMessage = { errors: [{ message: `Permission denied to Forest ${req.params.forestId}` }] };
        logger.warn(errorMessage);
        return res.status(403).json(errorMessage);
      }
      const errorMessage = { errors: [{ message: `Forest ${req.params.forestId} was not found.` }] };
      logger.warn(errorMessage);
      return res.status(400).json(errorMessage);
    })
    .catch((error) => {
      logger.error(error);
      res.status(500).json(error);
    });
};

module.exports = christmasTreeAdmin;
