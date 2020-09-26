/* eslint-disable consistent-return */
/* eslint no-param-reassign: ["error", { "props": false }] */
/**
 * @module controllers/forests/firewood-permits
 */
const logger = require('../../services/logger.es6');
const firewoodModel = require('../../models/firewood-permits.es6');
const forestsDb = require('../../models/forests.es6');
// const permitSvgService = require('../../services/christmas-trees-permit-svg-util.es6');
const firewoodPermitService = require('../../services/firewood-permit-service.es6');
const util = require('../../services/util.es6');

const firewoodPermits = {};

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
      permit: firewoodPermitService.permitResult(permit)
    }
  ]
});

/**
 * @function create - API function to create permit application
 * @param {Object} req - http request
 * @param {Object} res - http response
 */
firewoodPermits.create = async (req, res) => {
  util.logControllerAction(req, 'firewoodPermits.create', req.body);

  const application = req.body;
  const query = { where: { id: application.forestId } };

  try {
    const forest = await forestsDb.fsForests.findOne(query);

    if (!forest) {
      return res.status(400).send();
    }

    const permitResponse = await firewoodPermitService.createPermitTransaction(application, forest);
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
firewoodPermits.getOnePermit = async (req, res) => {
  util.logControllerAction(req, 'firewoodPermits.getOnePermit', { id: req.params.id });

  const query = {
    where: { permitId: req.params.id },
    include: [{ model: forestsDb.fsForests }]
  };

  try {
    const permit = await forestsDb.fsForests.findOne(query);

    if (!permit) {
      return res.status(404).send();
    }

    if (permit.status === 'Error') {
      return res.status(400).json(formatPermitError(permit));
    }

    return res.status(200).send(firewoodPermitService.permitResult(permit));
  } catch (error) {
    util.handleErrorResponse(error, res, 'getOnePermit#end');
  }
};

firewoodPermits.emailPDF = async (req, res) => {
  const permit = req.body
  try {
    return res.status(200).send(firewoodPermitService.emailPDF(permit));
  } catch (error) {
    return res.status(400).send(error);
  }
};

/**
 * @function updatePermitApplication - API function to update permit
 * @param {Object} req - http request
 * @param {Object} res - http response
 */
firewoodPermits.updatePermitApplication = async (req, res) => {
  util.logControllerAction(req, 'firewoodPermits.updatePermitApplication', req.body);

  const { permitId, status: requestedStatus } = req.body;

  const query = {
    where: { permitId },
    include: [{ model: forestsDb.fsForests }]
  };

  try {
    const permit = await firewoodModel.findOne(query);

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
          permit: firewoodPermitService.permitResult(permit)
        }]
      });
    }

    if (permit.status === 'Initiated' && requestedStatus === 'Cancelled') {
      const updatedPermit = await permit.update({ status: requestedStatus });
      return res.status(200).json(updatedPermit);
    }

    if (permit.status === 'Initiated' && requestedStatus === 'Completed') {
      try {
        const permitResponse = await firewoodPermitService.completePermitTransaction(permit);
        return res.status(200).send(permitResponse);
      } catch (error) {
        return res.status(400).send(formatPermitError(permit));
      }
    }
  } catch (error) {
    util.handleErrorResponse(error, res, 'updartePermit#end');
  }
};

module.exports = firewoodPermits;
