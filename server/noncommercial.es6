'use strict';

let NoncommercialApplication = require('./models/noncommercial-application.es6');
let request = require('request');
let util = require('./util.es6');
let validator = require('./validation.es6');
let vcapServices = require('./vcap-services.es6');
let email = require('./email-util.es6');

let noncommercial = {};

let translateFromClientToDatabase = input => {
  return {
    applicantInfoDayPhoneAreaCode: input.applicantInfo.dayPhone.areaCode,
    applicantInfoDayPhoneExtension: input.applicantInfo.dayPhone.extension,
    applicantInfoDayPhoneNumber: input.applicantInfo.dayPhone.number,
    applicantInfoDayPhonePrefix: input.applicantInfo.dayPhone.prefix,
    applicantInfoEmailAddress: input.applicantInfo.emailAddress,
    applicantInfoEveningPhoneAreaCode: input.applicantInfo.eveningPhone
      ? input.applicantInfo.eveningPhone.areaCode
      : null,
    applicantInfoEveningPhoneExtension: input.applicantInfo.eveningPhone
      ? input.applicantInfo.eveningPhone.extension
      : null,
    applicantInfoEveningPhoneNumber: input.applicantInfo.eveningPhone ? input.applicantInfo.eveningPhone.number : null,
    applicantInfoEveningPhonePrefix: input.applicantInfo.eveningPhone ? input.applicantInfo.eveningPhone.prefix : null,
    applicantInfoOrganizationName: input.applicantInfo.organizationName,
    applicantInfoOrgMailingAddress: input.applicantInfo.organizationAddress
      ? input.applicantInfo.organizationAddress.mailingAddress
      : null,
    applicantInfoOrgMailingAddress2: input.applicantInfo.organizationAddress
      ? input.applicantInfo.organizationAddress.mailingAddress2
      : null,
    applicantInfoOrgMailingCity: input.applicantInfo.organizationAddress
      ? input.applicantInfo.organizationAddress.mailingCity
      : null,
    applicantInfoOrgMailingState: input.applicantInfo.organizationAddress
      ? input.applicantInfo.organizationAddress.mailingState
      : null,
    applicantInfoOrgMailingZIP: input.applicantInfo.organizationAddress
      ? input.applicantInfo.organizationAddress.mailingZIP
      : null,
    applicantInfoOrgType: input.applicantInfo.orgType,
    applicantInfoPrimaryFirstName: input.applicantInfo.primaryFirstName,
    applicantInfoPrimaryLastName: input.applicantInfo.primaryLastName,
    applicantInfoPrimaryMailingAddress: input.applicantInfo.primaryAddress
      ? input.applicantInfo.primaryAddress.mailingAddress
      : null,
    applicantInfoPrimaryMailingAddress2: input.applicantInfo.primaryAddress
      ? input.applicantInfo.primaryAddress.mailingAddress2
      : null,
    applicantInfoPrimaryMailingCity: input.applicantInfo.primaryAddress
      ? input.applicantInfo.primaryAddress.mailingCity
      : null,
    applicantInfoPrimaryMailingState: input.applicantInfo.primaryAddress
      ? input.applicantInfo.primaryAddress.mailingState
      : null,
    applicantInfoPrimaryMailingZIP: input.applicantInfo.primaryAddress
      ? input.applicantInfo.primaryAddress.mailingZIP
      : null,
    applicantInfoSecondaryFirstName: input.applicantInfo.secondaryFirstName,
    applicantInfoSecondaryLastName: input.applicantInfo.secondaryLastName,
    applicantInfoSecondaryMailingAddress: input.applicantInfo.secondaryAddress
      ? input.applicantInfo.secondaryAddress.mailingAddress
      : null,
    applicantInfoSecondaryMailingAddress2: input.applicantInfo.secondaryAddress
      ? input.applicantInfo.secondaryAddress.mailingAddress2
      : null,
    applicantInfoSecondaryMailingCity: input.applicantInfo.secondaryAddress
      ? input.applicantInfo.secondaryAddress.mailingCity
      : null,
    applicantInfoSecondaryMailingState: input.applicantInfo.secondaryAddress
      ? input.applicantInfo.secondaryAddress.mailingState
      : null,
    applicantInfoSecondaryMailingZIP: input.applicantInfo.secondaryAddress
      ? input.applicantInfo.secondaryAddress.mailingZIP
      : null,
    applicantInfoWebsite: input.applicantInfo.website,
    authorizingOfficerName: input.authorizingOfficerName,
    authorizingOfficerTitle: input.authorizingOfficerTitle,
    district: input.district,
    eventName: input.eventName,
    forest: input.forest,
    noncommercialFieldsActivityDescription: input.noncommercialFields.activityDescription,
    noncommercialFieldsEndDateTime: input.dateTimeRange.endDateTime,
    noncommercialFieldsLocationDescription: input.noncommercialFields.locationDescription,
    noncommercialFieldsNumberParticipants: input.noncommercialFields.numberParticipants,
    noncommercialFieldsSpectatorCount: input.noncommercialFields.spectators,
    noncommercialFieldsStartDateTime: input.dateTimeRange.startDateTime,
    applicantMessage: input.applicantMessage,
    region: input.region,
    signature: input.signature,
    type: input.type
  };
};

let translateFromDatabaseToClient = input => {
  return {
    applicantInfo: {
      dayPhone: {
        areaCode: input.applicantInfoDayPhoneAreaCode,
        prefix: input.applicantInfoDayPhonePrefix,
        number: input.applicantInfoDayPhoneNumber,
        extension: input.applicantInfoDayPhoneExtension || undefined
      },
      eveningPhone: {
        areaCode: input.applicantInfoEveningPhoneAreaCode || undefined,
        prefix: input.applicantInfoEveningPhonePrefix || undefined,
        number: input.applicantInfoEveningPhoneNumber || undefined,
        extension: input.applicantInfoEveningPhoneExtension || undefined
      },
      primaryAddress: {
        mailingAddress: input.applicantInfoPrimaryMailingAddress || undefined,
        mailingAddress2: input.applicantInfoPrimaryMailingAddress2 || undefined,
        mailingCity: input.applicantInfoPrimaryMailingCity || undefined,
        mailingState: input.applicantInfoPrimaryMailingState || undefined,
        mailingZIP: input.applicantInfoPrimaryMailingZIP || undefined
      },
      organizationAddress: {
        mailingAddress: input.applicantInfoOrgMailingAddress || undefined,
        mailingAddress2: input.applicantInfoOrgMailingAddress2 || undefined,
        mailingCity: input.applicantInfoOrgMailingCity || undefined,
        mailingState: input.applicantInfoOrgMailingState || undefined,
        mailingZIP: input.applicantInfoOrgMailingZIP || undefined
      },
      secondaryAddress: {
        mailingAddress: input.applicantInfoSecondaryMailingAddress || undefined,
        mailingAddress2: input.applicantInfoSecondaryMailingAddress2 || undefined,
        mailingCity: input.applicantInfoSecondaryMailingCity || undefined,
        mailingState: input.applicantInfoSecondaryMailingState || undefined,
        mailingZIP: input.applicantInfoSecondaryMailingZIP || undefined
      },
      orgType: input.applicantInfoOrgType,
      primaryFirstName: input.applicantInfoPrimaryFirstName,
      primaryLastName: input.applicantInfoPrimaryLastName,
      secondaryFirstName: input.applicantInfoSecondaryFirstName || undefined,
      secondaryLastName: input.applicantInfoSecondaryLastName || undefined,
      emailAddress: input.applicantInfoEmailAddress,
      organizationName: input.applicantInfoOrganizationName || undefined,
      website: input.applicantInfoWebsite || undefined
    },
    noncommercialFields: {
      activityDescription: input.noncommercialFieldsActivityDescription,
      locationDescription: input.noncommercialFieldsLocationDescription,
      numberParticipants: input.noncommercialFieldsNumberParticipants,
      spectators: input.noncommercialFieldsSpectatorCount
    },
    dateTimeRange: {
      startDateTime: input.noncommercialFieldsStartDateTime,
      endDateTime: input.noncommercialFieldsEndDateTime
    },
    appControlNumber: input.appControlNumber,
    applicationId: input.applicationId,
    controlNumber: input.controlNumber || undefined,
    createdAt: input.createdAt,
    district: input.district,
    eventName: input.eventName,
    forest: input.forest,
    applicantMessage: input.applicantMessage || undefined,
    region: input.region,
    signature: input.signature,
    status: input.status,
    type: input.type
  };
};

let translateFromIntakeToMiddleLayer = input => {
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

noncommercial.acceptApplication = application => {
  let requestOptions = {
    url: vcapServices.middleLayerBaseUrl + 'permits/applications/special-uses/noncommercial/',
    headers: {},
    json: true,
    body: translateFromIntakeToMiddleLayer(application)
  };
  return new Promise((resolve, reject) => {
    util
      .middleLayerAuth()
      .then(token => {
        requestOptions.headers['x-access-token'] = token;
        request.post(requestOptions, (error, response, body) => {
          if (error || response.statusCode !== 200) {
            reject(error || response);
          } else {
            resolve(body);
          }
        });
      })
      .catch(error => {
        reject(error);
      });
  });
};

noncommercial.getOne = (req, res) => {
  NoncommercialApplication.findOne({
    where: {
      app_control_number: req.params.id
    }
  })
    .then(app => {
      if (app) {
        res.status(200).json(translateFromDatabaseToClient(app));
      } else {
        res.status(404).send();
      }
    })
    .catch(error => {
      res.status(400).json(error);
    });
};

// populates an applicationId on the object before return
noncommercial.create = (req, res) => {
  let errorRet = {};

  let errorArr = validator.validateNoncommercial(req.body);

  if (errorArr.length > 0) {
    errorRet['errors'] = errorArr;
    res.status(400).json(errorRet);
  } else {
    // create the noncommercial app object and persist
    NoncommercialApplication.create(translateFromClientToDatabase(req.body))
      .then(noncommApp => {
        email.sendEmail('noncommercialApplicationSubmittedAdminConfirmation', noncommApp);
        email.sendEmail('noncommercialApplicationSubmittedConfirmation', noncommApp);
        req.body['applicationId'] = noncommApp.applicationId;
        req.body['appControlNumber'] = noncommApp.appControlNumber;
        res.status(201).json(req.body);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }
};

noncommercial.update = (req, res) => {
  NoncommercialApplication.findOne({
    where: {
      app_control_number: req.params.id
    }
  }).then(app => {
    if (app) {
      app.status = req.body.status;
      app.applicantMessage = req.body.applicantMessage;
      if (app.status === 'Accepted') {
        noncommercial
          .acceptApplication(app)
          .then(response => {
            app.controlNumber = response.controlNumber;
            app
              .save()
              .then(() => {
                res.status(200).json(translateFromDatabaseToClient(app));
              })
              .catch(error => {
                res.status(500).json(error);
              });
          })
          .catch(error => {
            res.status(500).json(error);
          });
      } else {
        app
          .save()
          .then(() => {
            if (app.status === 'Returned') {
              //TODO: remove conditional if we want to send emails to applications with Hold status
              email.sendEmail(`application${app.status}`, app);
            }
            res.status(200).json(translateFromDatabaseToClient(app));
          })
          .catch(error => {
            res.status(500).json(error);
          });
      }
    } else {
      res.status(404).send();
    }
  });
};

module.exports = noncommercial;
