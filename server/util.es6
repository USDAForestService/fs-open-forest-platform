'use strict';

let moment = require('moment');

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
    } else if (error.name === 'enum' || error.name === 'pattern' || error.name === 'type')  {
      errorArr.push(error.name + '-' + (prefix ? prefix : '') + extractField(error, false));
    }
  }

  return errorArr;
};

util.translateFromDatabaseToJSON = (input) => {
  return {
    'applicantInfo': {
      'dayPhone': {
        'areaCode': input.applicantInfoDayPhoneAreaCode,
        'prefix': input.applicantInfoDayPhonePrefix,
        'number': input.applicantInfoDayPhoneNumber,
        'extension' : input.applicantInfoDayPhoneExtension || undefined
      },
      'eveningPhone': {
        'areaCode': input.applicantInfoEveningPhoneAreaCode || undefined,
        'prefix': input.applicantInfoEveningPhonePrefix || undefined,
        'number': input.applicantInfoEveningPhoneNumber || undefined,
        'extension': input.applicantInfoEveningPhoneExtension || undefined
      },
      'primaryAddress': {
        'mailingAddress': input.applicantInfoPrimaryMailingAddress || undefined,
        'mailingAddress2': input.applicantInfoPrimaryMailingAddress2 || undefined,
        'mailingCity': input.applicantInfoPrimaryMailingCity || undefined,
        'mailingState': input.applicantInfoPrimaryMailingState || undefined,
        'mailingZIP': input.applicantInfoPrimaryMailingZIP || undefined
      },
      'organizationAddress': {
        'mailingAddress': input.applicantInfoOrgMailingAddress || undefined,
        'mailingAddress2': input.applicantInfoOrgMailingAddress2 || undefined,
        'mailingCity': input.applicantInfoOrgMailingCity || undefined,
        'mailingState': input.applicantInfoOrgMailingState || undefined,
        'mailingZIP': input.applicantInfoOrgMailingZIP || undefined
      },
      'secondaryAddress': {
        'mailingAddress': input.applicantInfoSecondaryMailingAddress || undefined,
        'mailingAddress2': input.applicantInfoSecondaryMailingAddress2 || undefined,
        'mailingCity': input.applicantInfoSecondaryMailingCity || undefined,
        'mailingState': input.applicantInfoSecondaryMailingState || undefined,
        'mailingZIP': input.applicantInfoSecondaryMailingZIP || undefined
      },
      'orgType': input.applicantInfoOrgType,
      'primaryFirstName': input.applicantInfoPrimaryFirstName,
      'primaryLastName': input.applicantInfoPrimaryLastName,
      'secondaryFirstName': input.applicantInfoSecondaryFirstName || undefined,
      'secondaryLastName': input.applicantInfoSecondaryLastName || undefined,
      'emailAddress': input.applicantInfoEmailAddress,
      'organizationName': input.applicantInfoOrganizationName || undefined,
      'website': input.applicantInfoWebsite || undefined
    },
    'noncommercialFields': {
      'activityDescription': input.noncommercialFieldsActivityDescription,
      'locationDescription': input.noncommercialFieldsLocationDescription,
      'numberParticipants': input.noncommercialFieldsNumberParticipants,
      'spectators': input.noncommercialFieldsSpectatorCount,
    },
    'dateTimeRange': {
      'startDateTime': input.noncommercialFieldsStartDateTime,
      'endDateTime': input.noncommercialFieldsEndDateTime
    },
    'district': input.district,
    'region': input.region,
    'forest': input.forest,
    'type': input.type,
    'eventName': input.eventName,
    'signature': input.signature,
    'status': input.status,
    'createdAt': input.createdAt,
    'applicationId': input.applicationId,
    'reasonForReturn': input.reasonForReturn || undefined,
    'appControlNumber': input.appControlNumber,
    'controlNumber': input.controlNumber || undefined
  };
};

util.translateArrayFromDatabaseToJSON = (applications) => {
  for (var i = 0; i < applications.length; i++) {
    applications[i] = util.translateFromDatabaseToJSON(applications[i]);
  }
  return applications;
};

util.translateFromIntakeToMiddleLayer = (input) => {
  let result = {
    'region': input.region,
    'forest': input.forest,
    'district': input.district,
    'authorizingOfficerName': 'Placeholder', // TODO: Add value when user has authenticated
    'authorizingOfficerTitle': 'Placeholder', // TODO: Add value when user has authenticated
    'applicantInfo': {
      'firstName': input.applicantInfoPrimaryFirstName,
      'lastName': input.applicantInfoPrimaryLastName,
      'dayPhone': {
        'areaCode': input.applicantInfoDayPhoneAreaCode,
        'number': input.applicantInfoDayPhonePrefix + input.applicantInfoDayPhoneNumber,
        'extension': input.applicantInfoDayPhoneExtension || undefined,
        'phoneType': 'standard'
      },
      'eveningPhone': {
        'areaCode': input.applicantInfoEveningPhoneAreaCode || input.applicantInfoDayPhoneAreaCode,
        'number': (input.applicantInfoEveningPhonePrefix + input.applicantInfoEveningPhoneNumber) || (input.applicantInfoDayPhonePrefix + input.applicantInfoDayPhoneNumber),
        'extension': input.applicantInfoEveningPhoneExtension || input.applicantInfoDayPhoneExtension || undefined,
        'phoneType': 'standard'
      },
      'emailAddress': input.applicantInfoEmailAddress,
      'organizationName': input.applicantInfoOrganizationName || undefined,
      'website': input.applicantInfoWebsite || undefined,
      'orgType': input.applicantInfoOrgType
    },
    'type': input.type,
    'noncommercialFields': {
      'activityDescription': input.noncommercialFieldsActivityDescription,
      'locationDescription': input.noncommercialFieldsLocationDescription,
      'startDateTime': input.noncommercialFieldsStartDateTime,
      'endDateTime': input.noncommercialFieldsEndDateTime,
      'numberParticipants': Number(input.noncommercialFieldsNumberParticipants)
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

util.validateDateTime = (input) => {
  return /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)/.test(input) && moment(input, 'YYYY-MM-DDTHH:mm:ssZ').isValid();
};

module.exports = util;
