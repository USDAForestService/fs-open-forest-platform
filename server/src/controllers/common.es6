'use strict';

const NoncommercialApplication = require('../models/noncommercial-application.es6');
const TempOutfitterApplication = require('../models/tempoutfitter-application.es6');
const util = require('../util.es6');

const commonControllers = {};

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
          status: 'Returned'
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

commonControllers.getPermitApplications = (req, res) => {
  const orCondition = findOrCondition(req);
  const andCondition = [];
  // when the status group isn't handled, return a 404
  if (orCondition.length === 0) res.status(404).send();
  // when the authenticated user isn't an admin, only let them see their own applications
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
      res.status(200).json(results[0].concat(results[1]));
    })
    .catch(errors => {
      res.status(500).json(errors);
    });
};

module.exports = commonControllers;
