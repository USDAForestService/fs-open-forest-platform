'use strict';

/**
 * Module for christmas tree public API to retrieve forests
 * @module controllers/chrismtmas-tree/forests
 */

const logger = require('../../services/logger.es6');
const forestService = require('../../services/forest.service.es6');
const treesDb = require('../../models/trees-db.es6');

const christmasTreeForests = {};

/**
 * @function getForests - API function to get all forests
 * @param {Object} req - http request
 * @param {Object} res - http response
 */
christmasTreeForests.getForests = (req, res) => {
  treesDb.christmasTreesForests
    .findAll({
      attributes: ['id', 'forestName', 'forestNameShort', 'description', 'forestAbbr', 'startDate', 'endDate', 'timezone'],
      order: [['id', 'ASC']]
    })
    .then(results => {
      if (results) {
        res.status(200).json(results);
      } else {
        res.status(404).send();
      }
    })
    .catch(error => {
      res.status(400).json(error);
    });
};

/**
 * @function getForest - API function to get one forest by the forest abbreviation
 * @param {Object} req - http request
 * @param {Object} res - http response
 */
christmasTreeForests.getForest = (req, res) => {
  treesDb.christmasTreesForests
    .findOne({
      where: {
        forestAbbr: req.params.id
      }
    })
    .then(app => {
      if (app) {
        res.status(200).json(forestService.translateForestFromDatabaseToClient(app));
      } else {
        res.status(404).send();
      }
    })
    .catch(error => {
      logger.error('ERROR: ServerError: christmasTree controller getForest error for forest abbr ' + req.params.id, error);
      res.status(400).json(error);
    });
};

module.exports = christmasTreeForests;
