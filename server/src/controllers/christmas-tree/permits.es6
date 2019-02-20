/* eslint-disable consistent-return */
/* eslint no-param-reassign: ["error", { "props": false }] */
/**
 * Module for christmas tree public API to create permits and manage transactions
 * @module controllers/christmas-tree/permits
 */
const logger = require('../../services/logger.es6');
const treesDb = require('../../models/trees-db.es6');
const permitSvgService = require('../../services/christmas-trees-permit-svg-util.es6');
const forestService = require('../../services/forest.service.es6');
const permitService = require('../../services/permit-service.es6');
const util = require('../../services/util.es6');

const christmasTreePermits = {};

/**
 * @function formatPermitError - Format error objects from the permit's errors
 * @private
 * @param {Object} permit - permit object from database
 * @return {Object} - formatted permit errors
 */
const formatPermitError = permit => ({
  errors: [
    {
      status: 400,
      message: permit.paygovError,
      permit: permitService.permitResult(permit)
    }
  ]
});

/**
 * @function create - API function to create permit application
 * @param {Object} req - http request
 * @param {Object} res - http response
 */
christmasTreePermits.create = async (req, res) => {
  util.logControllerAction(req, 'christmasTreePermits.create', req.body);

  const application = req.body;
  const query = { where: { id: application.forestId } };

  try {
    const forest = await treesDb.christmasTreesForests.findOne(query);

    if (!forest) {
      return res.status(400).send();
    }

    if (!forestService.isForestOpen(forest)) {
      logger.error(`Permit attempted to be created outside of season date for ${application.forestId}`);
      return res.status(400).send(); // season is closed or not yet started, I think this should be a 409
    }

    const permitResponse = await permitService.createPermitTransaction(application, forest);
    res.status(200).json(permitResponse);
  } catch (error) {
    util.handleErrorResponse(error, res, 'createPermit#end');
  }
};

/**
 * @function getOnePermit - API function to get a permit.
 * @param {Object} req - http request
 * @param {Object} res - http response
 */
christmasTreePermits.getOnePermit = async (req, res) => {
  util.logControllerAction(req, 'christmasTreePermits.getOnePermit', { id: req.params.id });

  const query = {
    where: { permitId: req.params.id },
    include: [{ model: treesDb.christmasTreesForests }]
  };

  try {
    const permit = await treesDb.christmasTreesPermits.findOne(query);

    if (!permit) {
      return res.status(404).send();
    }

    if (permit.status === 'Error') {
      return res.status(400).json(formatPermitError(permit));
    }

    return res.status(200).send(permitService.permitResult(permit));
  } catch (error) {
    util.handleErrorResponse(error, res, 'getOnePermit#end');
  }
};

/**
 * @function printPermit - API function to get permit svg or rules html
 * @param {Object} req - http request
 * @param {Object} res - http response
 */
christmasTreePermits.printPermit = (req, res) => {
  treesDb.christmasTreesPermits
    .findOne({
      where: {
        permitId: req.params.id
      },
      include: [
        {
          model: treesDb.christmasTreesForests
        }
      ]
    })
    .then((permit) => {
      util.logControllerAction(req, 'christmasTreePermits.printPermit', permit);
      if (permit.status === 'Completed') {
        if (!permitService.checkPermitValid(permit.permitExpireDate)) {
          res.status(404).send();
        } else if (!req.query.rules || req.query.permit === 'true') {
          permitSvgService.generatePermitSvg(permit).then((permitSvg) => {
            res.status(200).json({
              result: permitSvg
            });
          });
        } else if (req.query.rules === 'true') {
          permitSvgService.generateRulesHtml(false, permit).then((rulesHtml) => {
            res.status(200).json({
              result: rulesHtml
            });
          });
        } else {
          res.status(404).send();
        }
      } else {
        res.status(404).send();
      }
    })
    .catch((error) => {
      logger.error(error);
      res.status(404).send();
    });
};

/**
 * @function updatePermitApplication - API function to update permit
 * @param {Object} req - http request
 * @param {Object} res - http response
 */
christmasTreePermits.updatePermitApplication = async (req, res) => {
  util.logControllerAction(req, 'christmasTreePermits.updatePermitApplication', req.body);

  const { permitId, status: requestedStatus } = req.body;

  const query = {
    where: { permitId },
    include: [{ model: treesDb.christmasTreesForests }]
  };

  try {
    const permit = await treesDb.christmasTreesPermits.findOne(query);

    if (!permit) {
      logger.error('Permit status unknown. 404.');
      return res.status(404).send();
    }

    if (permit.status === 'Error') {
      const formattedPermit = formatPermitError(permit);
      return res.status(400).json(formattedPermit);
    }

    if (permit.status === 'Completed') {
      return res.status(400).json({
        errors: [{
          status: 400,
          message: 'Permit Completed',
          permit: permitService.permitResult(permit)
        }]
      });
    }

    if (permit.status === 'Initiated' && requestedStatus === 'Cancelled') {
      const updatedPermit = await permit.update({ status: requestedStatus });
      return res.status(200).json(updatedPermit);
    }

    if (permit.status === 'Initiated' && requestedStatus === 'Completed') {
      try {
        const permitResponse = await permitService.completePermitTransaction(permit);
        return res.status(200).send(permitResponse);
      } catch (error) {
        return res.status(400).send(formatPermitError(permit));
      }
    }
  } catch (error) {
    util.handleErrorResponse(error, res, 'updartePermit#end');
  }
};

module.exports = christmasTreePermits;
