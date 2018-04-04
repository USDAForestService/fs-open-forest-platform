'use strict';

/**
 * Module for common controllers
 * @module controllers/common
 */

const NoncommercialApplication = require('../models/noncommercial-application.es6');
const TempOutfitterApplication = require('../models/tempoutfitter-application.es6');
const Revision = require('../models/revision.es6');
const util = require('../services/util.es6');

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
      $or: orCondition,
      $and: andCondition,
      noncommercialFieldsEndDateTime: {
        $gt: new Date()
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
      $or: orCondition,
      $and: andCondition,
      tempOutfitterFieldsActDescFieldsEndDateTime: {
        $gt: new Date()
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
 * @function createRevision() Create a new permit application revision entry in the DB.
 * @param {Object} user - user object
 * @param {Object} applicationModel - application model object
 */
commonControllers.createRevision = (user, applicationModel) => {
  Revision.create({
    applicationId: applicationModel.applicationId,
    applicationType: applicationModel.type,
    status: applicationModel.status,
    email: user.email ? user.email : user.adminUsername
  });
};

module.exports = commonControllers;
