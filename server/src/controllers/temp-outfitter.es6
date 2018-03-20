'use strict';

/**
 * Module for temp outfitter permit application controllers
 * @module controllers/temp-outfitter
 */

const cryptoRandomString = require('crypto-random-string');
const moment = require('moment');
const multer = require('multer');
const multerS3 = require('multer-s3');

const ApplicationFile = require('../models/application-files.es6');
const email = require('../email/email-util.es6');
const Revision = require('../models/revision.es6');
const TempOutfitterApplication = require('../models/tempoutfitter-application.es6');
const util = require('../services/util.es6');
const commonControllers = require('./common.es6');
const vcapConstants = require('../vcap-constants.es6');

const tempOutfitter = {};

const s3 = util.getS3();

/**
 * @function translateFromClientToDatabase - private function to translate permit application
 * object from client format to database format.
 * @param {Object} input
 * @param {Object} output
 */
const translateFromClientToDatabase = (input, output) => {
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
  output.applicantInfoFaxAreaCode =
    input.applicantInfo.fax && input.applicantInfo.fax.areaCode ? input.applicantInfo.fax.areaCode : null;
  output.applicantInfoFaxExtension =
    input.applicantInfo.fax && input.applicantInfo.fax.extension ? input.applicantInfo.fax.extension : null;
  output.applicantInfoFaxNumber =
    input.applicantInfo.fax && input.applicantInfo.fax.number ? input.applicantInfo.fax.number : null;
  output.applicantInfoFaxPrefix =
    input.applicantInfo.fax && input.applicantInfo.fax.prefix ? input.applicantInfo.fax.prefix : null;
  output.applicantInfoOrganizationName = input.applicantInfo.organizationName;
  output.applicantInfoOrgType = input.applicantInfo.orgType;
  output.applicantInfoPrimaryFirstName = input.applicantInfo.primaryFirstName;
  output.applicantInfoPrimaryLastName = input.applicantInfo.primaryLastName;
  output.applicantInfoPrimaryMailingAddress = input.applicantInfo.primaryAddress.mailingAddress;
  output.applicantInfoPrimaryMailingAddress2 = input.applicantInfo.primaryAddress.mailingAddress2;
  output.applicantInfoPrimaryMailingCity = input.applicantInfo.primaryAddress.mailingCity;
  output.applicantInfoPrimaryMailingState =
    input.applicantInfo.primaryAddress && input.applicantInfo.primaryAddress.mailingState
      ? input.applicantInfo.primaryAddress.mailingState
      : null;
  output.applicantInfoPrimaryMailingZIP = input.applicantInfo.primaryAddress.mailingZIP;
  output.applicantInfoWebsite = input.applicantInfo.website;
  output.authorizingOfficerName = input.authorizingOfficerName;
  output.authorizingOfficerTitle = input.authorizingOfficerTitle;
  output.district = input.district;
  output.forest = input.forest;
  output.applicantMessage = input.applicantMessage;
  output.region = input.region;
  output.signature = input.signature;
  output.tempOutfitterFieldsActDescFieldsAudienceDesc =
    input.tempOutfitterFields.activityDescriptionFields.audienceDescription;
  output.tempOutfitterFieldsActDescFieldsDescCleanupRestoration =
    input.tempOutfitterFields.activityDescriptionFields.descriptionOfCleanupAndRestoration;
  output.tempOutfitterFieldsActDescFieldsEndDateTime =
    input.tempOutfitterFields.activityDescriptionFields.dateTimeRange.endDateTime;
  output.tempOutfitterFieldsActDescFieldsListGovFacilities =
    input.tempOutfitterFields.activityDescriptionFields.listOfGovernmentFacilities;
  output.tempOutfitterFieldsActDescFieldsListTempImprovements =
    input.tempOutfitterFields.activityDescriptionFields.listOfTemporaryImprovements;
  output.tempOutfitterFieldsActDescFieldsLocationDesc =
    input.tempOutfitterFields.activityDescriptionFields.locationDescription;
  output.tempOutfitterFieldsActDescFieldsNumServiceDaysReq =
    input.tempOutfitterFields.activityDescriptionFields.numberServiceDaysRequested;
  output.tempOutfitterFieldsActDescFieldsNumTrips = input.tempOutfitterFields.activityDescriptionFields.numberOfTrips;
  output.tempOutfitterFieldsActDescFieldsServProvided =
    input.tempOutfitterFields.activityDescriptionFields.servicesProvided;
  output.tempOutfitterFieldsActDescFieldsStartDateTime =
    input.tempOutfitterFields.activityDescriptionFields.dateTimeRange.startDateTime;
  output.tempOutfitterFieldsActDescFieldsStmtAssignedSite =
    input.tempOutfitterFields.activityDescriptionFields.statementOfAssignedSite;
  output.tempOutfitterFieldsActDescFieldsStmtMotorizedEquip =
    input.tempOutfitterFields.activityDescriptionFields.statementOfMotorizedEquipment;
  output.tempOutfitterFieldsActDescFieldsStmtTransportLivestock =
    input.tempOutfitterFields.activityDescriptionFields.statementOfTransportationOfLivestock;
  output.tempOutfitterFieldsAdvertisingDescription = input.tempOutfitterFields.advertisingDescription;
  output.tempOutfitterFieldsAdvertisingUrl = input.tempOutfitterFields.advertisingURL;
  output.tempOutfitterFieldsClientCharges = input.tempOutfitterFields.clientCharges;
  output.tempOutfitterFieldsExperienceList = input.tempOutfitterFields.experienceList;
  output.tempOutfitterFieldsIndividualCitizen = input.tempOutfitterFields.individualIsCitizen;
  output.tempOutfitterFieldsSmallBusiness = input.tempOutfitterFields.smallBusiness;
  output.type = input.type;
  output.tempOutfitterFieldsActDescFieldsPartySize = input.tempOutfitterFields.activityDescriptionFields.partySize;
  output.tempOutfitterFieldsExpAllCitations = input.tempOutfitterFields.experienceFields.listAllCitations;
  output.tempOutfitterFieldsExpNatForestPermits =
    input.tempOutfitterFields.experienceFields.listAllNationalForestPermits;
  output.tempOutfitterFieldsExpOtherPermits = input.tempOutfitterFields.experienceFields.listAllOtherPermits;

  return output;
};

/**
 * @function translateFromDatabaseToClient - private function to translate permit application
 * object from database format to client format.
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
      fax: {
        areaCode: input.applicantInfoFaxAreaCode || '',
        prefix: input.applicantInfoFaxPrefix || '',
        number: input.applicantInfoFaxNumber || '',
        extension: input.applicantInfoFaxExtension || '',
        tenDigit: input.applicantInfoFaxAreaCode + input.applicantInfoFaxPrefix + input.applicantInfoFaxNumber
      },
      primaryAddress: {
        mailingAddress: input.applicantInfoPrimaryMailingAddress || '',
        mailingAddress2: input.applicantInfoPrimaryMailingAddress2 || '',
        mailingCity: input.applicantInfoPrimaryMailingCity || '',
        mailingState: input.applicantInfoPrimaryMailingState || '',
        mailingZIP: input.applicantInfoPrimaryMailingZIP || ''
      },
      emailAddress: input.applicantInfoEmailAddress,
      orgType: input.applicantInfoOrgType,
      primaryFirstName: input.applicantInfoPrimaryFirstName,
      primaryLastName: input.applicantInfoPrimaryLastName,
      organizationName: input.applicantInfoOrganizationName || '',
      website: input.applicantInfoWebsite || ''
    },
    appControlNumber: input.appControlNumber,
    controlNumber: input.controlNumber,
    applicationId: input.applicationId,
    authorizingOfficerName: input.authorizingOfficerName,
    authorizingOfficerTitle: input.authorizingOfficerTitle,
    createdAt: input.createdAt,
    district: input.district,
    forest: input.forest,
    applicantMessage: input.applicantMessage || '',
    region: input.region,
    signature: input.signature,
    authEmail: input.authEmail,
    status: input.status,
    type: input.type,
    tempOutfitterFields: {
      advertisingDescription: input.tempOutfitterFieldsAdvertisingDescription,
      advertisingURL: input.tempOutfitterFieldsAdvertisingUrl,
      clientCharges: input.tempOutfitterFieldsClientCharges,
      experienceList: input.tempOutfitterFieldsExperienceList,
      individualIsCitizen: input.tempOutfitterFieldsIndividualCitizen,
      smallBusiness: input.tempOutfitterFieldsSmallBusiness,
      activityDescriptionFields: {
        audienceDescription: input.tempOutfitterFieldsActDescFieldsAudienceDesc,
        descriptionOfCleanupAndRestoration: input.tempOutfitterFieldsActDescFieldsDescCleanupRestoration,
        haveLivestock: !!input.tempOutfitterFieldsActDescFieldsStmtTransportLivestock,
        haveMotorizedEquipment: !!input.tempOutfitterFieldsActDescFieldsStmtMotorizedEquip,
        listOfGovernmentFacilities: input.tempOutfitterFieldsActDescFieldsListGovFacilities,
        listOfTemporaryImprovements: input.tempOutfitterFieldsActDescFieldsListTempImprovements,
        locationDescription: input.tempOutfitterFieldsActDescFieldsLocationDesc,
        needAssignedSite: !!input.tempOutfitterFieldsActDescFieldsStmtAssignedSite,
        needGovernmentFacilities: !!input.tempOutfitterFieldsActDescFieldsListGovFacilities,
        needTemporaryImprovements: !!input.tempOutfitterFieldsActDescFieldsListTempImprovements,
        numberOfTrips: input.tempOutfitterFieldsActDescFieldsNumTrips,
        numberServiceDaysRequested: input.tempOutfitterFieldsActDescFieldsNumServiceDaysReq,
        partySize: input.tempOutfitterFieldsActDescFieldsPartySize,
        servicesProvided: input.tempOutfitterFieldsActDescFieldsServProvided,
        statementOfAssignedSite: input.tempOutfitterFieldsActDescFieldsStmtAssignedSite,
        statementOfMotorizedEquipment: input.tempOutfitterFieldsActDescFieldsStmtMotorizedEquip,
        statementOfTransportationOfLivestock: input.tempOutfitterFieldsActDescFieldsStmtTransportLivestock,
        dateTimeRange: {
          startDateTime: input.tempOutfitterFieldsActDescFieldsStartDateTime,
          startMonth: moment(input.tempOutfitterFieldsActDescFieldsStartDateTime, util.datetimeFormat).format('M'),
          startDay: moment(input.tempOutfitterFieldsActDescFieldsStartDateTime, util.datetimeFormat).format('D'),
          startYear: moment(input.tempOutfitterFieldsActDescFieldsStartDateTime, util.datetimeFormat).format('YYYY'),
          startHour: moment(input.tempOutfitterFieldsActDescFieldsStartDateTime, util.datetimeFormat).format('hh'),
          startMinutes: moment(input.tempOutfitterFieldsActDescFieldsStartDateTime, util.datetimeFormat).format('mm'),
          startPeriod: moment(input.tempOutfitterFieldsActDescFieldsStartDateTime, util.datetimeFormat).format('A'),
          endDateTime: input.tempOutfitterFieldsActDescFieldsEndDateTime,
          endMonth: moment(input.tempOutfitterFieldsActDescFieldsEndDateTime, util.datetimeFormat).format('M'),
          endDay: moment(input.tempOutfitterFieldsActDescFieldsEndDateTime, util.datetimeFormat).format('D'),
          endYear: moment(input.tempOutfitterFieldsActDescFieldsEndDateTime, util.datetimeFormat).format('YYYY'),
          endHour: moment(input.tempOutfitterFieldsActDescFieldsEndDateTime, util.datetimeFormat).format('hh'),
          endMinutes: moment(input.tempOutfitterFieldsActDescFieldsEndDateTime, util.datetimeFormat).format('mm'),
          endPeriod: moment(input.tempOutfitterFieldsActDescFieldsEndDateTime, util.datetimeFormat).format('A')
        }
      },
      experienceFields: {
        haveCitations:
          input.tempOutfitterFieldsExpAllCitations !== undefined && input.tempOutfitterFieldsExpAllCitations.length > 0
            ? true
            : false,
        haveNationalForestPermits:
          input.tempOutfitterFieldsExpNatForestPermits !== undefined &&
          input.tempOutfitterFieldsExpNatForestPermits.length > 0
            ? true
            : false,
        haveOtherPermits:
          input.tempOutfitterFieldsExpOtherPermits !== undefined && input.tempOutfitterFieldsExpOtherPermits.length > 0
            ? true
            : false,
        listAllCitations: input.tempOutfitterFieldsExpAllCitations,
        listAllNationalForestPermits: input.tempOutfitterFieldsExpNatForestPermits,
        listAllOtherPermits: input.tempOutfitterFieldsExpOtherPermits
      }
    }
  };
  result.tempOutfitterFields.noPromotionalWebsite = !result.tempOutfitterFields.advertisingURL;
  result.applicantInfo.addAdditionalPhone = !!result.applicantInfo.eveningPhone.tenDigit;

  return result;
};

/**
 * @function translateFromIntakeToMiddleLayer - API function to translate permit application object
 * from database format to middle layer format..
 * @param {Object} application
 */
tempOutfitter.translateFromIntakeToMiddleLayer = application => {
  const result = {
    intakeId: application.applicationId,
    region: application.region,
    forest: application.forest,
    district: application.district,
    authorizingOfficerName: application.authorizingOfficerName,
    authorizingOfficerTitle: application.authorizingOfficerTitle,
    applicantInfo: {
      firstName: application.applicantInfoPrimaryFirstName,
      lastName: application.applicantInfoPrimaryLastName,
      dayPhone: {
        areaCode: application.applicantInfoDayPhoneAreaCode,
        number: application.applicantInfoDayPhonePrefix + application.applicantInfoDayPhoneNumber,
        extension: application.applicantInfoDayPhoneExtension || undefined,
        phoneType: 'day'
      },
      eveningPhone: {
        areaCode: application.applicantInfoEveningPhoneAreaCode || application.applicantInfoDayPhoneAreaCode,
        number:
          application.applicantInfoEveningPhonePrefix + application.applicantInfoEveningPhoneNumber ||
          application.applicantInfoDayPhonePrefix + application.applicantInfoDayPhoneNumber,
        extension:
          application.applicantInfoEveningPhoneExtension || application.applicantInfoDayPhoneExtension || undefined,
        phoneType: 'evening'
      },
      emailAddress: application.applicantInfoEmailAddress,
      mailingAddress: application.applicantInfoPrimaryMailingAddress,
      mailingAddress2: application.applicantInfoPrimaryMailingAddress2,
      mailingCity: application.applicantInfoPrimaryMailingCity,
      mailingState: application.applicantInfoPrimaryMailingState,
      mailingZIP: application.applicantInfoPrimaryMailingZIP,
      organizationName: application.applicantInfoOrganizationName,
      website: application.applicantInfoWebsite,
      orgType: application.applicantInfoOrgType
    },
    type: 'tempOutfitters',
    tempOutfitterFields: {
      individualIsCitizen: application.tempOutfitterFieldsIndividualCitizen,
      smallBusiness: application.tempOutfitterFieldsSmallBusiness,
      // Start date
      activityDescription:
        application.tempOutfitterFieldsActDescFieldsStartDateTime +
        '\n' +
        // End date
        application.tempOutfitterFieldsActDescFieldsEndDateTime +
        '\n' +
        // Anticipated number of trips
        application.tempOutfitterFieldsActDescFieldsNumTrips +
        '\n' +
        // Anticipated party size
        application.tempOutfitterFieldsActDescFieldsPartySize +
        '\n' +
        // Location Description
        application.tempOutfitterFieldsActDescFieldsLocationDesc +
        '\n' +
        // Services Provided
        application.tempOutfitterFieldsActDescFieldsServProvided +
        '\n' +
        // Audience Description
        application.tempOutfitterFieldsActDescFieldsAudienceDesc +
        '\n' +
        // List facilities needed
        application.tempOutfitterFieldsActDescFieldsListGovFacilities +
        '\n' +
        // List of temporary improvements or signs that you propose to use
        application.tempOutfitterFieldsActDescFieldsListTempImprovements +
        '\n' +
        // Description of the proposed operations involving motorized equipment
        application.tempOutfitterFieldsActDescFieldsStmtMotorizedEquip +
        '\n' +
        // Description of the proposed operations involving the transportation of livestock, and whether grazing is requested
        application.tempOutfitterFieldsActDescFieldsStmtTransportLivestock +
        '\n' +
        // Description of cleanup and restoration during and after the proposed operations
        application.tempOutfitterFieldsActDescFieldsDescCleanupRestoration,
      advertisingURL: application.tempOutfitterFieldsAdvertisingUrl,
      advertisingDescription: application.tempOutfitterFieldsAdvertisingDescription,
      clientCharges: application.tempOutfitterFieldsClientCharges,
      experienceList: application.tempOutfitterFieldsExperienceList
    }
  };

  // nonprofit isn't an option on the middle layer
  if (result.applicantInfo.orgType === 'Nonprofit') {
    result.applicantInfo.orgType = 'Corporation';
  }

  return result;
};

/**
 * @function getFile - private function to get a file from the S3 bucket.
 * @param {string} key
 * @param {string} documentType
 */
const getFile = (key, documentType) => {
  return new Promise((resolve, reject) => {
    s3.getObject(
      {
        Bucket: vcapConstants.BUCKET,
        Key: key
      },
      (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve({
            fileBuffer: data.Body,
            documentType: documentType,
            key: key
          });
        }
      }
    );
  });
};

/**
 * @function getAllFiles - private function to get all file attachments for a permit application.
 * @param {string} applicationId
 */
const getAllFiles = applicationId => {
  return new Promise((resolve, reject) => {
    ApplicationFile.findAll({
      where: {
        applicationId: applicationId
      }
    })
      .then(results => {
        let filePromises = [];
        for (let item of results) {
          filePromises.push(getFile(item.s3FileName, item.documentType));
        }
        Promise.all(filePromises).then(results => {
          let files = {};
          for (let item of results) {
            files[item.documentType] = {
              buffer: item.fileBuffer,
              filename: item.key
            };
          }
          resolve(files);
        });
      })
      .catch(error => {
        reject(error);
      });
  });
};

/**
 * @function streamFile - private function Stream a file from the S3 bucket.
 * @param {string} fileName
 * @param {Object} response
 */
const streamFile = (fileName, res) => {
  res.set('Content-Type', util.getContentType(fileName));
  s3
    .getObject({
      Bucket: vcapConstants.BUCKET,
      Key: fileName
    })
    .createReadStream()
    .pipe(res);
};

/**
 * @function getAllFileNames - Private function to get all file attachment names for a permit application
 * @param {string} applicationId
 */
const getAllFileNames = applicationId => {
  return ApplicationFile.findAll({
    where: {
      applicationId: applicationId
    }
  });
};

/**
 * @function updateApplicationModel - API function to update the permit application model based on permissions.
 * @param {Object} model
 * @param {Object} submitted
 * @param {Object} user
 */
tempOutfitter.updateApplicationModel = (model, submitted, user) => {
  if (user.role === 'admin') {
    model.status = submitted.status;
    model.applicantMessage = submitted.applicantMessage;
    translateFromClientToDatabase(submitted, model);
  } else if (user.role === 'user' && user.email === model.authEmail) {
    if (submitted.status === 'Hold') {
      model.status = 'Review';
    } else if (submitted.status !== 'Accepted') {
      model.status = submitted.status;
    }
    translateFromClientToDatabase(submitted, model);
  }
};

/**
 * @function acceptApplication - Private function to send an application to the middle layer.
 * @param {Object} application
 */
const acceptApplication = application => {
  return new Promise((resolve, reject) => {
    getAllFiles(application.applicationId)
      .then(files => {
        const requestOptions = {
          method: 'POST',
          url: vcapConstants.MIDDLE_LAYER_BASE_URL + 'permits/applications/special-uses/commercial/temp-outfitters/',
          headers: {},
          simple: true,
          formData: {
            body: JSON.stringify(tempOutfitter.translateFromIntakeToMiddleLayer(application))
          }
        };

        if (files['insurance-certificate']) {
          requestOptions.formData.insuranceCertificate = {
            value: files['insurance-certificate'].buffer,
            options: {
              filename: files['insurance-certificate'].filename,
              contentType: util.getContentType(files['insurance-certificate'].filename)
            }
          };
        }

        if (files['operating-plan']) {
          requestOptions.formData.operatingPlan = {
            value: files['operating-plan'].buffer,
            options: {
              filename: files['operating-plan'].filename,
              contentType: util.getContentType(files['operating-plan'].filename)
            }
          };
        }

        if (files['guide-document']) {
          requestOptions.formData.guideDocumentation = {
            value: files['guide-document'].buffer,
            options: {
              filename: files['guide-document'].filename,
              contentType: util.getContentType(files['guide-document'].filename)
            }
          };
        }

        if (files['good-standing-evidence']) {
          requestOptions.formData.goodStandingEvidence = {
            value: files['good-standing-evidence'].buffer,
            options: {
              filename: files['good-standing-evidence'].filename,
              contentType: util.getContentType(files['good-standing-evidence'].filename)
            }
          };
        }

        if (files['acknowledgement-of-risk-form']) {
          requestOptions.formData.acknowledgementOfRiskForm = {
            value: files['acknowledgement-of-risk-form'].buffer,
            options: {
              filename: files['acknowledgement-of-risk-form'].filename,
              contentType: util.getContentType(files['acknowledgement-of-risk-form'].filename)
            }
          };
        }

        util
          .middleLayerAuth()
          .then(token => {
            requestOptions.headers['x-access-token'] = token;
            util
              .request(requestOptions)
              .then(resolve)
              .catch(reject);
          })
          .catch(reject);
      })
      .catch(reject);
  });
};

/**
 * @function getApplicationFileNames - API function to get file attachment names for a permit application.
 * @param {Object} request
 * @param {Object} response
 */
tempOutfitter.getApplicationFileNames = (req, res) => {
  getAllFileNames(req.params.id)
    .then(app => {
      if (app) {
        return res.status(200).json(app);
      } else {
        return res.status(404).send();
      }
    })
    .catch(() => {
      return res.status(500).send();
    });
};

/**
 * @function streamFile - API function to stream a file attachment from S3.
 * @param {Object} request
 * @param {Object} response
 */
tempOutfitter.streamFile = (req, res) => {
  streamFile(Buffer.from(req.params.file, 'base64').toString(), res);
};

/**
 * @function streamToS3 - API function to stream a file attachment to S3.
 */
tempOutfitter.streamToS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: vcapConstants.BUCKET,
    metadata: function(req, file, next) {
      next(null, null, Object.assign({}, req.body));
    },
    key: function(req, file, next) {
      next(null, `${cryptoRandomString(20)}/${file.originalname}`);
    }
  })
});

/**
 * @function attachFile - API function to add a file attachment to a permit application.
 * @param {Object} request
 * @param {Object} response
 */
tempOutfitter.attachFile = (req, res) => {
  ApplicationFile.destroy({
    where: {
      applicationId: req.body.applicationId,
      applicationType: 'tempoutfitters',
      documentType: req.body.documentType
    }
  })
    .then(() => {
      ApplicationFile.create({
        applicationId: req.body.applicationId,
        applicationType: 'tempoutfitters',
        documentType: req.body.documentType,
        s3FileName: req.files[0].key,
        originalFileName: req.files[0].key
      })
        .then(appfile => {
          req.body['fileId'] = appfile.fileId;
          return res.status(201).json(req.body);
        })
        .catch(() => {
          return res.status(500).send();
        });
    })
    .catch(() => {
      return res.status(500).send();
    });
};

/**
 * @function deleteFile - API function to delete a permit application attachment.
 * @param {Object} request
 * @param {Object} response
 */
tempOutfitter.deleteFile = (req, res) => {
  ApplicationFile.destroy({
    where: {
      fileId: req.params.id
    }
  })
    .then(() => {
      return res.status(204);
    })
    .catch(() => {
      return res.status(500).send();
    });
};

/**
 * @function create - API function to create a permit application.
 * @param {Object} request
 * @param {Object} response
 */
tempOutfitter.create = (req, res) => {
  util.setAuthEmail(req);
  let model = {
    authEmail: req.body.authEmail,
    status: 'Incomplete' // will be updated to Submitted when attachments are ready
  };
  translateFromClientToDatabase(req.body, model);
  TempOutfitterApplication.create(model)
    .then(tempOutfitterApp => {
      email.sendEmail('tempOutfitterApplicationSubmittedConfirmation', tempOutfitterApp);
      email.sendEmail('tempOutfitterApplicationSubmittedAdminConfirmation', tempOutfitterApp);
      req.body['applicationId'] = tempOutfitterApp.applicationId;
      req.body['appControlNumber'] = tempOutfitterApp.appControlNumber;
      return res.status(201).json(req.body);
    })
    .catch(error => {
      if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({
          errors: error.errors
        });
      } else {
        return res.status(500).send();
      }
    });
};

/**
 * @function getOne - API function to get one permit application.
 * @param {Object} request
 * @param {Object} response
 */
tempOutfitter.getOne = (req, res) => {
  TempOutfitterApplication.findOne({
    where: {
      app_control_number: req.params.id
    }
  })
    .then(app => {
      if (!app) {
        return res.status(404).send();
      }
      if (!util.hasPermissions(util.getUser(req), app)) {
        return res.status(403).send();
      }
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
        .catch(() => {
          return res.status(500).send();
        });
    })
    .catch(() => {
      return res.status(500).send();
    });
};

/**
 * @function update - API function to update a permit application.
 * @param {Object} request
 * @param {Object} response
 */
tempOutfitter.update = (req, res) => {
  TempOutfitterApplication.findOne({
    where: {
      app_control_number: req.params.id
    }
  })
    .then(app => {
      if (!app) {
        return res.status(404).send();
      }
      if (!util.hasPermissions(util.getUser(req), app)) {
        return res.status(403).send();
      }
      tempOutfitter.updateApplicationModel(app, req.body, util.getUser(req));
      if (app.status === 'Accepted') {
        acceptApplication(app)
          .then(response => {
            app.controlNumber = JSON.parse(response).controlNumber;
            app
              .save()
              .then(() => {
                commonControllers.createRevision(util.getUser(req), app);
                email.sendEmail(`tempOutfitterApplication${app.status}`, app);
                return res.status(200).json(translateFromDatabaseToClient(app));
              })
              .catch(() => {
                return res.status(500).send();
              });
          })
          .catch(() => {
            return res.status(500).send();
          });
      } else {
        app
          .save()
          .then(() => {
            commonControllers.createRevision(util.getUser(req), app);
            if (app.status === 'Cancelled' && util.getUser(req).role === 'user') {
              email.sendEmail(`tempOutfitterApplicationUser${app.status}`, app);
            } else if (app.status === 'Review' && util.getUser(req).role === 'admin') {
              email.sendEmail('tempOutfitterApplicationRemoveHold', app);
            } else {
              email.sendEmail(`tempOutfitterApplication${app.status}`, app);
            }
            return res.status(200).json(translateFromDatabaseToClient(app));
          })
          .catch(error => {
            if (error.name === 'SequelizeValidationError') {
              return res.status(400).json({
                errors: error.errors
              });
            } else {
              return res.status(500).send();
            }
          });
      }
    })
    .catch(() => {
      return res.status(500).send();
    });
};

module.exports = tempOutfitter;
