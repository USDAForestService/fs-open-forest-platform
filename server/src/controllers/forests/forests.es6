/**
 * Module for fs public API to retrieve forests
 * @module controllers/forests/forests
 */

const logger = require('../../services/logger.es6');
const forestService = require('../../services/forest.service.es6');
const forestsDb = require('../../models/forests.es6');

const fsForests = {};

/**
 * @function getForests - API function to get all forests
 * @param {Object} req - http request
 * @param {Object} res - http response
 */
fsForests.getForests = (req, res) => {
  forestsDb.fsForests
    .findAll({
      attributes: ['id', 'forestName', 'forestCode', 'forestNameShort', 'forestUrl', 'description', 'forestAbbr',
        'startDate', 'endDate', 'contact', 'mapLinks', 'woodCost', 'state', 'region', 'permitType', 'minCords',
        'maxCords', 'regionName'],
      order: [['id', 'ASC']]
    })
    .then((results) => {
      if (results) {
        res.status(200).json(results);
      } else {
        res.status(404).send();
      }
    })
    .catch((error) => {
      res.status(400).json(error);
    });
};

/**
 * @function getForest - API function to get one forest by the forest abbreviation
 * @param {Object} req - http request
 * @param {Object} res - http response
 */
fsForests.getForest = (req, res) => {
  forestsDb.fsForests
    .findOne({
      where: {
        forestAbbr: req.params.id
      }
    })
    .then((app) => {
      if (app) {
        res.status(200).json(forestService.translateForestFromDatabaseToClient(app));
      } else {
        res.status(404).send();
      }
    })
    .catch((error) => {
      logger.error(`ERROR: ServerError: forest controller getForest error for forest abbr ${req.params.id}`, error);
      res.status(400).json(error);
    });
};

module.exports = fsForests;
