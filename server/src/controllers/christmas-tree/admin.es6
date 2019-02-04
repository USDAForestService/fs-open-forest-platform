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
  eachPermit.permitNumber = zpad(permit.permitNumber, 8); // Adds padding to each permit number for readiblity

  if (permit.christmasTreesForest && permit.christmasTreesForest.timezone) {
    eachPermit.issueDate = moment.tz(permit.updatedAt, permit.christmasTreesForest.timezone).format('MM/DD/YYYY');

    eachPermit.expireDate = moment
      .tz(permit.permitExpireDate, permit.christmasTreesForest.timezone)
      .format('MM/DD/YYYY');
  } else {
    eachPermit.issueDate = moment(permit.updatedAt).format('MM/DD/YYYY');
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
  // check query params -> 400
  logger.info(`${req.user.adminUsername} generated a report`);
  console.log({ user: req.user });
  /**
    The report may include forests from multiple time zones. The previous implementation assumed
    one forest and seemed overly exact regarding the time zones. In order to avoid querying by
    forest individually, just assume that the provided dates in Eastern Time are good enough.

    If we need to be more exact and still don't want to query each forest individually, we can
    broaden the initial date criteria to ensure the inlusion of all possible forests, then filter
    the returns lists with the forest-specific timezones.
   */
  const startDate = moment.tz(req.query.startDate, 'America/Toronto').hour(0).minute(0).second(0);
  const endDate = moment.tz(req.query.endDate, 'America/Toronto').add(1, 'days').hour(0).minute(0)
    .second(0);

  const forestFilter = req.query.forestId === 'ALL' ? {} : { forestId: req.query.forestId };

  const query = {
    attributes: [
      'forestId',
      'permitNumber',
      'updatedAt',
      'quantity',
      'totalCost',
      'permitExpireDate',
      'christmasTreesForest.timezone'
    ],
    include: [
      {
        model: treesDb.christmasTreesForests,
        where: {
          forestAbbr: {
            [operator.in]: req.user.forests
          }
        }
      }
    ],
    where: {
      ...forestFilter,
      status: 'Completed',
      updatedAt: {
        [operator.gte]: startDate,
        [operator.lt]: endDate
      }
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
  const query = {
    attributes: [
      'permitId',
      'forestId',
      'permitNumber',
      'updatedAt',
      'quantity',
      'totalCost',
      'permitExpireDate'
    ],
    where: {
      permitNumber: req.params.permitNumber,
      status: 'Completed'
    }
  };

  try {
    const permit = await treesDb.christmasTreesPermits.findOne(query);
    if (permit === null) {
      const err = {
        errors: [{
          errorCode: 'notFound',
          message: `Permit number ${req.params.permitNumber} was not found.`
        }]
      };
      res.status(400).json(err);
    } else {
      const report = buildPermitsReport([permit]);
      res.status(200).json(report);
    }
  } catch (error) {
    util.handleErrorResponse(error, res, 'getPermitReport#end');
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
              .add(1, 'days')
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
