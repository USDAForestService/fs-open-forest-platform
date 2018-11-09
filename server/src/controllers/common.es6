'use strict';

/**
 * Module for common controllers
 * @module controllers/common
 */

const logger = require('../services/logger.es6');

const NoncommercialApplication = require('../models/noncommercial-application.es6');
const TempOutfitterApplication = require('../models/tempoutfitter-application.es6');
const Revision = require('../models/revision.es6');
const email = require('../email/email-util.es6');
const util = require('../services/util.es6');
const forestInfoService = require('../services/forest.service.es6');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const commonControllers = {};

/**
 * @function findOrCondition - Generate a sequelize status condition based on the status group.
 * @param {Object} req - http request
 * @return {Object} - set of statuses
 */
const findOrCondition = req => {
  const statusGroup = req.params.statusGroup;
  let orCondition = [];
  switch (statusGroup) {
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
  if (util.getUser(req).role === 'user') {
    andCondition.push({
      authEmail: util.getUser(req).email
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
      [Op.or]: orCondition,
      [Op.and]: andCondition,
      noncommercialFieldsEndDateTime: {
        [Op.gt]: new Date()
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
      [Op.or]: orCondition,
      [Op.and]: andCondition,
      tempOutfitterFieldsActDescFieldsEndDateTime: {
        [Op.gt]: new Date()
      }
    },
    order: [['createdAt', 'DESC']]
  });
  Promise.all([noncommercialApplicationsPromise, tempOutfitterApplicationPromise])
    .then(results => {
      for (let item of results[0]) {
        item.type = 'Noncommercial';
      }
      for (let item of results[1]) {
        item.type = 'Temp outfitter';
      }
      return res.status(200).json(results[0].concat(results[1]));
    })
    .catch(() => {
      return res.status(500).send();
    });
};

/**
 * @function updateEmailSwitch
  * @param {Object} req - http request
 * @param {Object} res - http response
 * @param {Object} app - application to evaluate
 * @param {String} type - what kind of application
 */
commonControllers.updateEmailSwitch = (req, res, app, type) => {
  commonControllers.createRevision(util.getUser(req), app);
  app.forestName = forestInfoService.specialUseForestName(app.region + app.forest);
  if (app.status == 'Submitted'){
    email.sendEmail(`${type}ApplicationSubmittedConfirmation`, app);
    email.sendEmail(`${type}ApplicationSubmittedAdminConfirmation`, app);
  }
  if (app.status === 'Cancelled' && util.getUser(req).role === 'user') {
    email.sendEmail(`${type}ApplicationUser${app.status}`, app);
  } else if (app.status === 'Review' && util.getUser(req).role === 'admin') {
    email.sendEmail('${type}ApplicationRemoveHold', app);
  } else {
    email.sendEmail(`${type}Application${app.status}`, app);
  }
  return;
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
  }).then(app =>{
    logger.info(`${app.applicationId} was modified at ${app.modifiedAt} by ${revisionCreator}`);
  });
};

module.exports = commonControllers;
