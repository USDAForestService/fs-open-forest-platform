'use strict';

const request = require('request-promise');
const moment = require('moment-timezone');
const Sequelize = require('sequelize');

const treesDb = require('../models/trees-db.es6');
const util = require('../util.es6');

const christmasTreeAdmin = {};
const operator = Sequelize.Op;

const returnPermitResults = (results, res) => {
  if (results) {
    let permits = [];
    let sumOfTrees = 0;
    let sumOfCost = 0;
    results.forEach(permit => {
      let eachPermit = {};
      eachPermit.permitNumber = permit.paygovTrackingId;
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

      sumOfTrees += permit.quantity;
      sumOfCost += parseFloat(permit.totalCost);
      permits.push(eachPermit);
    });
    res.status(200).json({
      sumOfTrees: sumOfTrees,
      sumOfCost: sumOfCost.toFixed(2),
      numberOfPermits: results.length,
      permits: permits
    });
  } else {
    res.status(404).send();
  }
};

christmasTreeAdmin.getPermits = (req, res) => {
  treesDb.christmasTreesForests
    .findOne({
      where: {
        id: req.params.forestId
      }
    })
    .then(forest => {
      const nextDay = moment.tz(req.params.endDate, forest.timezone).add(1, 'days');
      const startDate = moment.tz(req.params.startDate, forest.timezone).format(util.datetimeFormat);
      treesDb.christmasTreesPermits
        .findAll({
          attributes: [
            'forestId',
            'paygovTrackingId',
            'updatedAt',
            'quantity',
            'totalCost',
            'permitExpireDate',
            'christmasTreesForest.timezone'
          ],
          include: [
            {
              model: treesDb.christmasTreesForests
            }
          ],
          where: {
            forestId: req.params.forestId,
            status: 'Completed',
            updatedAt: {
              [operator.gte]: startDate,
              [operator.lt]: nextDay
            }
          },
          order: [['updatedAt', 'ASC']]
        })
        .then(results => {
          return returnPermitResults(results, res);
        })
        .catch(error => {
          if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({
              errors: error.errors
            });
          } else if (error.name === 'SequelizeDatabaseError') {
            return res.status(404).send();
          } else {
            return res.status(500).send();
          }
        });
    });
};

christmasTreeAdmin.getPermitByTrackingId = (req, res) => {
  treesDb.christmasTreesPermits
    .findOne({
      attributes: [
        'permitId',
        'forestId',
        'paygovTrackingId',
        'updatedAt',
        'quantity',
        'totalCost',
        'permitExpireDate'
      ],
      where: {
        paygovTrackingId: req.params.paygovTrackingId,
        status: 'Completed'
      }
    })
    .then(requestedPermit => {
      if (requestedPermit === null) {
        return res
          .status(400)
          .json({ errors: [{ message: 'Permit ' + req.params.paygovTrackingId + ' was not found.' }] });
      } else {
        return returnPermitResults([requestedPermit], res);
      }
    })
    .catch(error => {
      console.error(error);
      if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({
          errors: error.errors
        });
      } else if (error.name === 'SequelizeDatabaseError') {
        return res.status(404).send();
      } else {
        return res.status(500).send();
      }
    });
};

christmasTreeAdmin.updateForest = (req, res) => {
  treesDb.christmasTreesForests
    .findOne({
      where: {
        id: req.params.forestId
      }
    })
    .then(forest => {
      if (forest) {
        const startDate = moment.tz(req.body.startDate, forest.timezone).format(util.datetimeFormat);
        const endDate = moment
          .tz(req.body.endDate, forest.timezone)
          .add(1, 'days')
          .subtract(1, 'ms')
          .format(util.datetimeFormat);
        forest
          .update({
            startDate: startDate,
            endDate: endDate
          })
          .then(savedForest => {
            return res.status(200).json(savedForest);
          });
      } else {
        return res.status(400).json({ errors: [{ message: 'Forest ' + req.params.forestId + ' was not found.' }] });
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).json(error);
    });
};

module.exports = christmasTreeAdmin;
