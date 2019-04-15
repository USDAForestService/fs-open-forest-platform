

/**
 * Module for common controllers
 * @module controllers/common
 */

const Sequelize = require('sequelize');
const logger = require('../services/logger.es6');

const NoncommercialApplication = require('../models/noncommercial-application.es6');
const TempOutfitterApplication = require('../models/tempoutfitter-application.es6');
const Revision = require('../models/revision.es6');
const email = require('../email/email-util.es6');
const forestInfoService = require('../services/forest.service.es6');

const commonControllers = {};

/**
 * @function findOrCondition - Generate a sequelize status condition based on the status group.
 * @param {Object} req - http request
 * @return {Object} - set of statuses
 */
const findOrCondition = (req) => {
  let orCondition = [];
  switch (req.params.statusGroup) {
    case 'pending':
      orCondition = [
        {
          status: 'Submitted'
        },
        {
          status: 'Hold'
        },
        {
          status: 'Review'
        }
      ];
      break;
    case 'accepted':
      orCondition = [
        {
          status: 'Accepted'
        }
      ];
      break;
    case 'rejected':
      orCondition = [
        {
          status: 'Rejected'
        }
      ];
      break;
    case 'cancelled':
      orCondition = [
        {
          status: 'Cancelled'
        }
      ];
      break;
    case 'expired':
      orCondition = [
        {
          status: 'Expired'
        }
      ];
      break;
    default:
      break;
  }
  return orCondition;
};

/**
 * @function getPermitApplications() - Get permit applications of every type.
 * @param {Object} req - http request
 * @param {Object} res - http response
 * @return {Object} - http response
 */
commonControllers.getPermitApplications = (req, res) => {
  const orCondition = findOrCondition(req);
  const andCondition = [];
  if (orCondition.length === 0) {
    return res.status(404).send();
  }
  if (req.user.role === 'user') {
    andCondition.push({
      authEmail: req.user.email
    });
  }
  const noncommercialApplicationsPromise = NoncommercialApplication.findAll({
    attributes: [
      'appControlNumber',
      'applicantInfoPrimaryFirstName',
      'applicantInfoPrimaryLastName',
      'applicationId',
      'createdAt',
      'eventName',
      'noncommercialFieldsEndDateTime',
      'noncommercialFieldsLocationDescription',
      'noncommercialFieldsStartDateTime',
      'status'
    ],
    where: {
      [Sequelize.Op.or]: orCondition,
      [Sequelize.Op.and]: andCondition,
      noncommercialFieldsEndDateTime: {
        [Sequelize.Op.gt]: new Date()
      }
    },
    order: [['createdAt', 'DESC']]
  });
  const tempOutfitterApplicationPromise = TempOutfitterApplication.findAll({
    attributes: [
      'appControlNumber',
      'applicantInfoOrganizationName',
      'applicantInfoPrimaryFirstName',
      'applicantInfoPrimaryLastName',
      'applicationId',
      'createdAt',
      'status',
      'tempOutfitterFieldsActDescFieldsEndDateTime',
      'tempOutfitterFieldsActDescFieldsLocationDesc',
      'tempOutfitterFieldsActDescFieldsStartDateTime'
    ],
    where: {
      [Sequelize.Op.or]: orCondition,
      [Sequelize.Op.and]: andCondition,
      tempOutfitterFieldsActDescFieldsEndDateTime: {
        [Sequelize.Op.gt]: new Date()
      }
    },
    order: [['createdAt', 'DESC']]
  });
  return Promise.all([noncommercialApplicationsPromise, tempOutfitterApplicationPromise])
    .then((results) => {
      for (const item of results[0]) {
        item.type = 'Noncommercial';
      }
      for (const item of results[1]) {
        item.type = 'Temp outfitter';
      }
      return res.status(200).json(results[0].concat(results[1]));
    })
    .catch(() => res.status(500).send());
};

/**
 * @function updateEmailSwitch
  * @param {Object} req - http request
 * @param {Object} res - http response
 * @param {Object} app - application to evaluate
 * @param {String} type - what kind of application
 */
commonControllers.updateEmailSwitch = (req, res, app, type) => {
  commonControllers.createRevision(req.user, app);
  // eslint-disable-next-line no-param-reassign
  app.forestName = forestInfoService.specialUseForestName(app.region + app.forest);

  let emails;
  if (app.status === 'Submitted') {
    emails = Promise.all([
      email.sendEmail(`${type}ApplicationSubmittedConfirmation`, app),
      email.sendEmail(`${type}ApplicationSubmittedAdminConfirmation`, app)
    ]);
  }
  if (app.status === 'Cancelled' && req.user.role === 'user') {
    emails = email.sendEmail(`${type}ApplicationUser${app.status}`, app);
  } if (app.status === 'Review' && req.user.role === 'admin') {
    emails = email.sendEmail(`${type}ApplicationRemoveHold`, app);
  }
  emails = email.sendEmail(`${type}Application${app.status}`, app);

  return emails.catch(() => { /* Swallowing this error */ });
};

/**
 * @function createRevision() Create a new permit application revision entry in the DB.
 * @param {Object} user - user object
 * @param {Object} applicationModel - application model object
 */
commonControllers.createRevision = (user, applicationModel) => {
  const revisionCreator = user.email ? user.email : user.adminUsername;
  Revision.create({
    applicationId: applicationModel.applicationId,
    applicationType: applicationModel.type,
    status: applicationModel.status,
    email: revisionCreator
  }).then((app) => {
    logger.info(`${app.applicationId} was modified at ${app.modifiedAt} by ${revisionCreator}`);
  });
};

module.exports = commonControllers;
