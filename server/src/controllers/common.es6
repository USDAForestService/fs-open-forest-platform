'use strict';

const NoncommercialApplication = require('../models/noncommercial-application.es6');
const TempOutfitterApplication = require('../models/tempoutfitter-application.es6');

const commonControllers = {};

commonControllers.getAllOpenApplications = (req, res) => {
  const statusGroup = req.params.statusGroup;
  let orCondition = [];
  switch (req.params.statusGroup) {
    case 'open-hold':
      orCondition = [
        {
          status: 'Received'
        },
        {
          status: 'Hold'
        }
      ];
      break;
    case 'closed-accepted-expired':
      orCondition = [
        {
          status: 'Closed'
        },
        {
          status: 'Accepted'
        },
        {
          status: 'Expired'
        }
      ];
      break;
    case 'returned':
      orCondition = [
        {
          status: 'Returned'
        }
      ];
      break;
    case 'all':
      orCondition = [
        {
          status: 'Returned'
        },
        {
          status: 'Received'
        },
        {
          status: 'Hold'
        },
        {
          status: 'Closed'
        },
        {
          status: 'Accepted'
        },
        {
          status: 'Expired'
        }
      ];
      break;
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
