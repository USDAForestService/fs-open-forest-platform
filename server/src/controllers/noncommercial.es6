'use strict;';

/**
 * Module for noncommercial permit application controllers
 * @module controllers/noncommercial
 */

const moment = require('moment');

const email = require('../email/email-util.es6');
const NoncommercialApplication = require('../models/noncommercial-application.es6');
const Revision = require('../models/revision.es6');
const util = require('../services/util.es6');
const commonControllers = require('./common.es6');
const vcapConstants = require('../vcap-constants.es6');
const logger = require('../services/logger.es6');
const forestInfoService = require('../services/forest.service.es6');

const noncommercial = {};

/**
 * @function translateFromClientToDatabase - private function to translate permit application
 * object from client format to database format.
 * @param {Object} input
 * @param {Object} output
 */
noncommercial.translateFromClientToDatabase = (input, output) => {
  output.applicantInfoDayPhoneAreaCode = input.applicantInfo.dayPhone.areaCode;
  output.applicantInfoDayPhoneExtension = input.applicantInfo.dayPhone.extension;
  output.applicantInfoDayPhoneNumber = input.applicantInfo.dayPhone.number;
  output.applicantInfoDayPhonePrefix = input.applicantInfo.dayPhone.prefix;
  output.applicantInfoEmailAddress = input.applicantInfo.emailAddress;
  output.applicantInfoEveningPhoneAreaCode =
    input.applicantInfo.eveningPhone && input.applicantInfo.eveningPhone.areaCode
      ? input.applicantInfo.eveningPhone.areaCode
      : null;
  output.applicantInfoEveningPhoneExtension =
    input.applicantInfo.eveningPhone && input.applicantInfo.eveningPhone.extension
      ? input.applicantInfo.eveningPhone.extension
      : null;
  output.applicantInfoEveningPhoneNumber =
    input.applicantInfo.eveningPhone && input.applicantInfo.eveningPhone.number
      ? input.applicantInfo.eveningPhone.number
      : null;
  output.applicantInfoEveningPhonePrefix =
    input.applicantInfo.eveningPhone && input.applicantInfo.eveningPhone.prefix
      ? input.applicantInfo.eveningPhone.prefix
      : null;
  output.applicantInfoOrganizationName = input.applicantInfo.organizationName;
  output.applicantInfoOrgMailingAddress =
    input.applicantInfo.organizationAddress && input.applicantInfo.organizationAddress.mailingAddress
      ? input.applicantInfo.organizationAddress.mailingAddress
      : null;
  output.applicantInfoOrgMailingAddress2 =
    input.applicantInfo.organizationAddress && input.applicantInfo.organizationAddress.mailingAddress2
      ? input.applicantInfo.organizationAddress.mailingAddress2
      : null;
  output.applicantInfoOrgMailingCity =
    input.applicantInfo.organizationAddress && input.applicantInfo.organizationAddress.mailingCity
      ? input.applicantInfo.organizationAddress.mailingCity
      : null;
  output.applicantInfoOrgMailingState =
    input.applicantInfo.organizationAddress && input.applicantInfo.organizationAddress.mailingState
      ? input.applicantInfo.organizationAddress.mailingState
      : null;
  output.applicantInfoOrgMailingZIP =
    input.applicantInfo.organizationAddress && input.applicantInfo.organizationAddress.mailingZIP
      ? input.applicantInfo.organizationAddress.mailingZIP
      : null;
  output.applicantInfoOrgType = input.applicantInfo.orgType;
  output.applicantInfoPrimaryFirstName = input.applicantInfo.primaryFirstName;
  output.applicantInfoPrimaryLastName = input.applicantInfo.primaryLastName;
  output.applicantInfoPrimaryMailingAddress =
    input.applicantInfo.primaryAddress && input.applicantInfo.primaryAddress.mailingAddress
      ? input.applicantInfo.primaryAddress.mailingAddress
      : null;
  output.applicantInfoPrimaryMailingAddress2 =
    input.applicantInfo.primaryAddress && input.applicantInfo.primaryAddress.mailingAddress2
      ? input.applicantInfo.primaryAddress.mailingAddress2
      : null;
  output.applicantInfoPrimaryMailingCity =
    input.applicantInfo.primaryAddress && input.applicantInfo.primaryAddress.mailingCity
      ? input.applicantInfo.primaryAddress.mailingCity
      : null;
  output.applicantInfoPrimaryMailingState =
    input.applicantInfo.primaryAddress && input.applicantInfo.primaryAddress.mailingState
      ? input.applicantInfo.primaryAddress.mailingState
      : null;
  output.applicantInfoPrimaryMailingZIP =
    input.applicantInfo.primaryAddress && input.applicantInfo.primaryAddress.mailingZIP
      ? input.applicantInfo.primaryAddress.mailingZIP
      : null;
  output.applicantInfoSecondaryFirstName = input.applicantInfo.secondaryFirstName;
  output.applicantInfoSecondaryLastName = input.applicantInfo.secondaryLastName;
  output.applicantInfoSecondaryMailingAddress =
    input.applicantInfo.secondaryAddress && input.applicantInfo.secondaryAddress.mailingAddress
      ? input.applicantInfo.secondaryAddress.mailingAddress
      : null;
  output.applicantInfoSecondaryMailingAddress2 =
    input.applicantInfo.secondaryAddress && input.applicantInfo.secondaryAddress.mailingAddress2
      ? input.applicantInfo.secondaryAddress.mailingAddress2
      : null;
  output.applicantInfoSecondaryMailingCity =
    input.applicantInfo.secondaryAddress && input.applicantInfo.secondaryAddress.mailingCity
      ? input.applicantInfo.secondaryAddress.mailingCity
      : null;
  output.applicantInfoSecondaryMailingState =
    input.applicantInfo.secondaryAddress && input.applicantInfo.secondaryAddress.mailingState
      ? input.applicantInfo.secondaryAddress.mailingState
      : null;
  output.applicantInfoSecondaryMailingZIP =
    input.applicantInfo.secondaryAddress && input.applicantInfo.secondaryAddress.mailingZIP
      ? input.applicantInfo.secondaryAddress.mailingZIP
      : null;
  output.applicantInfoWebsite = input.applicantInfo.website;
  output.authorizingOfficerName = input.authorizingOfficerName;
  output.authorizingOfficerTitle = input.authorizingOfficerTitle;
  output.district = input.district;
  output.eventName = input.eventName;
  output.forest = input.forest;
  output.noncommercialFieldsActivityDescription = input.noncommercialFields.activityDescription;
  output.noncommercialFieldsEndDateTime = input.dateTimeRange.endDateTime;
  output.noncommercialFieldsLocationDescription = input.noncommercialFields.locationDescription;
  output.noncommercialFieldsNumberParticipants = input.noncommercialFields.numberParticipants;
  output.noncommercialFieldsSpectatorCount = input.noncommercialFields.numberSpectators;
  output.noncommercialFieldsStartDateTime = input.dateTimeRange.startDateTime;
  output.region = input.region;
  output.signature = input.signature;
  output.type = 'noncommercial';
};

/**
 * @function translateFromDatabaseToClient - private function to translate permit application
 * object from database format to client format..
 * @param {Object} input
 */
const translateFromDatabaseToClient = input => {
  const result = {
    applicantInfo: {
      dayPhone: {
        areaCode: input.applicantInfoDayPhoneAreaCode,
        prefix: input.applicantInfoDayPhonePrefix,
        number: input.applicantInfoDayPhoneNumber,
        extension: input.applicantInfoDayPhoneExtension || '',
        tenDigit:
          input.applicantInfoDayPhoneAreaCode + input.applicantInfoDayPhonePrefix + input.applicantInfoDayPhoneNumber
      },
      eveningPhone: {
        areaCode: input.applicantInfoEveningPhoneAreaCode || '',
        prefix: input.applicantInfoEveningPhonePrefix || '',
        number: input.applicantInfoEveningPhoneNumber || '',
        extension: input.applicantInfoEveningPhoneExtension || '',
        tenDigit:
          input.applicantInfoEveningPhoneAreaCode +
          input.applicantInfoEveningPhonePrefix +
          input.applicantInfoEveningPhoneNumber
      },
      primaryAddress: {
        mailingAddress: input.applicantInfoPrimaryMailingAddress || '',
        mailingAddress2: input.applicantInfoPrimaryMailingAddress2 || '',
        mailingCity: input.applicantInfoPrimaryMailingCity || '',
        mailingState: input.applicantInfoPrimaryMailingState || '',
        mailingZIP: input.applicantInfoPrimaryMailingZIP || ''
      },
      organizationAddress: {
        mailingAddress: input.applicantInfoOrgMailingAddress,
        mailingAddress2: input.applicantInfoOrgMailingAddress2 || '',
        mailingCity: input.applicantInfoOrgMailingCity,
        mailingState: input.applicantInfoOrgMailingState,
        mailingZIP: input.applicantInfoOrgMailingZIP
      },
      secondaryAddress: {
        mailingAddress: input.applicantInfoSecondaryMailingAddress,
        mailingAddress2: input.applicantInfoSecondaryMailingAddress2 || '',
        mailingCity: input.applicantInfoSecondaryMailingCity,
        mailingState: input.applicantInfoSecondaryMailingState,
        mailingZIP: input.applicantInfoSecondaryMailingZIP
      },
      orgType: input.applicantInfoOrgType,
      primaryFirstName: input.applicantInfoPrimaryFirstName,
      primaryLastName: input.applicantInfoPrimaryLastName,
      secondaryFirstName: input.applicantInfoSecondaryFirstName || '',
      secondaryLastName: input.applicantInfoSecondaryLastName || '',
      emailAddress: input.applicantInfoEmailAddress,
      organizationName: input.applicantInfoOrganizationName || '',
      website: input.applicantInfoWebsite || ''
    },
    noncommercialFields: {
      activityDescription: input.noncommercialFieldsActivityDescription,
      locationDescription: input.noncommercialFieldsLocationDescription,
      numberParticipants: input.noncommercialFieldsNumberParticipants,
      numberSpectators: input.noncommercialFieldsSpectatorCount
    },
    dateTimeRange: {
      startDateTime: input.noncommercialFieldsStartDateTime,
      startMonth: moment(input.noncommercialFieldsStartDateTime, util.datetimeFormat).format('M'),
      startDay: moment(input.noncommercialFieldsStartDateTime, util.datetimeFormat).format('D'),
      startYear: moment(input.noncommercialFieldsStartDateTime, util.datetimeFormat).format('YYYY'),
      startHour: moment(input.noncommercialFieldsStartDateTime, util.datetimeFormat).format('hh'),
      startMinutes: moment(input.noncommercialFieldsStartDateTime, util.datetimeFormat).format('mm'),
      startPeriod: moment(input.noncommercialFieldsStartDateTime, util.datetimeFormat).format('a'),
      endDateTime: input.noncommercialFieldsEndDateTime,
      endMonth: moment(input.noncommercialFieldsEndDateTime, util.datetimeFormat).format('M'),
      endDay: moment(input.noncommercialFieldsEndDateTime, util.datetimeFormat).format('D'),
      endYear: moment(input.noncommercialFieldsEndDateTime, util.datetimeFormat).format('YYYY'),
      endHour: moment(input.noncommercialFieldsEndDateTime, util.datetimeFormat).format('hh'),
      endMinutes: moment(input.noncommercialFieldsEndDateTime, util.datetimeFormat).format('mm'),
      endPeriod: moment(input.noncommercialFieldsEndDateTime, util.datetimeFormat).format('a')
    },
    authorizingOfficerName: input.authorizingOfficerName,
    authorizingOfficerTitle: input.authorizingOfficerTitle,
    appControlNumber: input.appControlNumber,
    controlNumber: input.controlNumber,
    applicationId: input.applicationId,
    createdAt: input.createdAt,
    district: input.district,
    eventName: input.eventName,
    forest: input.forest,
    applicantMessage: input.applicantMessage || '',
    region: input.region,
    signature: input.signature,
    status: input.status,
    authEmail: input.authEmail,
    type: input.type
  };
  result.applicantInfo.addSecondaryPermitHolder =
    !!result.applicantInfo.secondaryFirstName && !!result.applicantInfo.secondaryFirstName;
  result.applicantInfo.secondaryAddressSameAsPrimary =
    !result.applicantInfo.secondaryAddress.mailingAddress &&
    !result.applicantInfo.secondaryAddress.mailingAddress2 &&
    !result.applicantInfo.secondaryAddress.mailingCity &&
    !result.applicantInfo.secondaryAddress.mailingState &&
    !result.applicantInfo.secondaryAddress.mailingZIP;
  result.applicantInfo.primaryAddressSameAsOrganization =
    !result.applicantInfo.organizationAddress.mailingAddress &&
    !result.applicantInfo.organizationAddress.mailingAddress2 &&
    !result.applicantInfo.organizationAddress.mailingCity &&
    !result.applicantInfo.organizationAddress.mailingState &&
    !result.applicantInfo.organizationAddress.mailingZIP;
  result.applicantInfo.addAdditionalPhone = !!result.applicantInfo.eveningPhone.tenDigit;

  return result;
};

/**
 * @function translateFromIntakeToMiddleLayer - API function to translate permit application object
 * from database format to middle layer format.
 * @param {Object} input
 */

noncommercial.translateFromIntakeToMiddleLayer = input => {
  let result = {
    intakeId: input.applicationId,
    region: input.region,
    forest: input.forest,
    district: input.district,
    authorizingOfficerName: input.authorizingOfficerName,
    authorizingOfficerTitle: input.authorizingOfficerTitle,
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

/**
 * @function updateApplicationModel - API function to update the permit application
 * model values based on permissions.
 * @param {Object} model
 * @param {Object} submitted
 * @param {Object} user
 */
noncommercial.updateApplicationModel = (model, submitted, user) => {
  if (user.role === 'admin') {
    model.status = submitted.status;
    model.applicantMessage = submitted.applicantMessage;
    if (submitted.status !== 'Cancelled'){
      noncommercial.translateFromClientToDatabase(submitted, model);
    }
  } else if (user.role === 'user' && user.email === model.authEmail) {
    if (submitted.status === 'Hold') {
      model.status = 'Review';
    } else if (submitted.status !== 'Accepted') {
      model.status = submitted.status;
    }
    if (submitted.status !== 'Cancelled') {
      noncommercial.translateFromClientToDatabase(submitted, model);
    }
  }
};

/**
 * @function acceptApplication - API function to send the permit application to the middle layer.
 * @param {Object} application
 */
noncommercial.acceptApplication = application => {
  const requestOptions = {
    method: 'POST',
    url: vcapConstants.MIDDLE_LAYER_BASE_URL + 'permits/applications/special-uses/noncommercial/',
    headers: {},
    json: true,
    simple: true,
    body: noncommercial.translateFromIntakeToMiddleLayer(application)
  };
  return new Promise((resolve, reject) => {
    util
      .middleLayerAuth()
      .then(token => {
        requestOptions.headers['x-access-token'] = token;
        util
          .request(requestOptions)
          .then(resolve)
          .catch(reject);
      })
      .catch(error => {
        reject(error);
      });
  });
};

/**
 * @function getOne - API function to get one permit application.
 * @param {Object} req - http request
 * @param {Object} res - http response
 */
noncommercial.getOne = (req, res) => {
  NoncommercialApplication.findOne({
    where: {
      app_control_number: req.params.id
    }
  })
    .then(app => {
      if (!app) {
        return res.status(404).send();
      }
      if (!util.hasPermissions(req.user, app)) {
        return res.status(403).send();
      }
      util.logControllerAction(req, 'noncommerical.getOne', app);
      Revision.findAll({
        where: {
          applicationId: app.applicationId,
          applicationType: app.type
        }
      })
        .then(revisions => {
          const formattedApp = translateFromDatabaseToClient(app);
          formattedApp.revisions = revisions;
          return res.status(200).json(formattedApp);
        })
        .catch(error => {
          logger.info('U fired');
          util.handleErrorResponse(error, res, 'getOne#revisions');
        });
    })
    .catch(() => {
      util.handleErrorResponse(new Error('Uncaught noncommericial error'), res, 'getOne#end');
    });
};

/**
 * @function create - API function to create a new permit application.
 * @param {Object} req - http request
 * @param {Object} res - http response
 */
noncommercial.create = (req, res) => {
  util.setAuthEmail(req);
  let model = {
    authEmail: req.body.authEmail
  };
  noncommercial.translateFromClientToDatabase(req.body, model);
  NoncommercialApplication.create(model)
    .then(app => {
      util.logControllerAction(req, 'noncommerical.create', app);
      app.forestName = forestInfoService.specialUseForestName(app.region + app.forest);
      email.sendEmail('noncommercialApplicationSubmittedAdminConfirmation', app);
      email.sendEmail('noncommercialApplicationSubmittedConfirmation', app);
      req.body['applicationId'] = app.applicationId;
      req.body['appControlNumber'] = app.appControlNumber;
      return res.status(201).json(req.body);
    })
    .catch(error => {
      util.handleErrorResponse(error, res, 'create#end');
    });
};

/**
 * @function update - API function to update a permit application.
 * @param {Object} req - http request
 * @param {Object} res - http response
 */
noncommercial.update = (req, res) => {
  NoncommercialApplication.findOne({
    where: {
      app_control_number: req.params.id
    }
  })
    .then(app => {
      if (!app) {
        return res.status(404).send();
      }
      if (!util.hasPermissions(req.user, app)) {
        return res.status(403).send();
      }
      noncommercial.updateApplicationModel(app, req.body, req.user);
      if (app.status === 'Accepted') {
        noncommercial
          .acceptApplication(app)
          .then(response => {
            util.logControllerAction(req, 'noncommerical.update', app);
            app.controlNumber = response.controlNumber;
            app
              .save()
              .then(() => {
                commonControllers.createRevision(req.user, app);
                app.forestName = forestInfoService.specialUseForestName(app.region + app.forest);
                email.sendEmail(`noncommercialApplication${app.status}`, app);
                return res.status(200).json(translateFromDatabaseToClient(app));
              })
              .catch(error => {
                util.handleErrorResponse(error, res, 'updateApplicationModel#revision');
              });
          })
          .catch(error => {
            util.handleErrorResponse(error, res, 'updateApplicationModel#acceptedpermit');
          });
      } else {
        app
          .save()
          .then(() => {
            commonControllers.updateEmailSwitch(req, res, app, 'noncommercial');
            return res.status(200).json(translateFromDatabaseToClient(app));
          })
          .catch(error => {
            util.handleErrorResponse(error, res, 'updateApplicationModel#emailswitch');
          });
      }
    })
    .catch(() => {
      return res.status(500).send();
    });
};



module.exports = noncommercial;
