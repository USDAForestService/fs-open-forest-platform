'use strict';

let moment = require('moment');
let NoncommercialApplication = require('./models/noncommercial-application.es6');
let TempOutfitterApplication = require('./models/tempoutfitter-application.es6');

let extractField = (errorObj, withArg) => {
  if (withArg && errorObj.property === 'instance') {
    return errorObj.argument;
  } else if (withArg) {
    // assumption is that the string otherwise is 'instance.<field>'
    return errorObj.property.substring(9) + '.' + errorObj.argument;
  } else {
    return errorObj.property.substring(9);
  }
};

let util = {};

util.collateErrors = (result, errorArr, prefix) => {
  for (var error of result.errors) {
    if (error.name === 'required') {
      errorArr.push(error.name + '-' + (prefix ? prefix : '') + extractField(error, true));
    } else if (error.name === 'enum' || error.name === 'pattern' || error.name === 'type') {
      errorArr.push(error.name + '-' + (prefix ? prefix : '') + extractField(error, false));
    }
  }

  return errorArr;
};

util.translateFromIntakeToMiddleLayer = input => {
  let result = {
    region: input.region,
    forest: input.forest,
    district: input.district,
    authorizingOfficerName: 'Placeholder', // TODO: Add value when user has authenticated
    authorizingOfficerTitle: 'Placeholder', // TODO: Add value when user has authenticated
    applicantInfo: {
      firstName: input.applicantInfoPrimaryFirstName,
      lastName: input.applicantInfoPrimaryLastName,
      dayPhone: {
        areaCode: input.applicantInfoDayPhoneAreaCode,
        number: input.applicantInfoDayPhonePrefix + input.applicantInfoDayPhoneNumber,
        extension: input.applicantInfoDayPhoneExtension || undefined,
        phoneType: 'standard'
      },
      eveningPhone: {
        areaCode: input.applicantInfoEveningPhoneAreaCode || input.applicantInfoDayPhoneAreaCode,
        number:
          input.applicantInfoEveningPhonePrefix + input.applicantInfoEveningPhoneNumber ||
          input.applicantInfoDayPhonePrefix + input.applicantInfoDayPhoneNumber,
        extension: input.applicantInfoEveningPhoneExtension || input.applicantInfoDayPhoneExtension || undefined,
        phoneType: 'standard'
      },
      emailAddress: input.applicantInfoEmailAddress,
      organizationName: input.applicantInfoOrganizationName || undefined,
      website: input.applicantInfoWebsite || undefined,
      orgType: input.applicantInfoOrgType
    },
    type: input.type,
    noncommercialFields: {
      activityDescription: input.noncommercialFieldsActivityDescription,
      locationDescription: input.noncommercialFieldsLocationDescription,
      startDateTime: input.noncommercialFieldsStartDateTime,
      endDateTime: input.noncommercialFieldsEndDateTime,
      numberParticipants: Number(input.noncommercialFieldsNumberParticipants)
    }
  };

  if (input.applicantInfoOrgType === 'Person') {
    result.applicantInfo.mailingAddress = input.applicantInfoPrimaryMailingAddress;
    result.applicantInfo.mailingAddress2 = input.applicantInfoPrimaryMailingAddress2 || undefined;
    result.applicantInfo.mailingCity = input.applicantInfoPrimaryMailingCity;
    result.applicantInfo.mailingState = input.applicantInfoPrimaryMailingState;
    result.applicantInfo.mailingZIP = input.applicantInfoPrimaryMailingZIP;
  }

  if (input.applicantInfoOrgType === 'Corporation') {
    result.applicantInfo.mailingAddress = input.applicantInfoOrgMailingAddress;
    result.applicantInfo.mailingAddress2 = input.applicantInfoOrgMailingAddress2 || undefined;
    result.applicantInfo.mailingCity = input.applicantInfoOrgMailingCity;
    result.applicantInfo.mailingState = input.applicantInfoOrgMailingState;
    result.applicantInfo.mailingZIP = input.applicantInfoOrgMailingZIP;
  }

  return result;
};

util.validateDateTime = input => {
  return (
    /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)/.test(input) &&
    moment(input, 'YYYY-MM-DDTHH:mm:ssZ').isValid()
  );
};

util.getAllOpenApplications = (req, res) => {
  let noncommercialApplicationsPromise = NoncommercialApplication.findAll({
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
    where: { $or: [{ status: 'Received' }, { status: 'Hold' }] },
    order: [['createdAt', 'DESC']]
  });
  let tempOutfitterApplicationPromise = TempOutfitterApplication.findAll({
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
    where: { $or: [{ status: 'Received' }, { status: 'Hold' }] },
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

module.exports = util;
