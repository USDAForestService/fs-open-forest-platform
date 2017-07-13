'use strict';

let ApplicationFile = require('./models/application-files.es6');
let AWS = require('aws-sdk');
let multer = require('multer');
let multerS3 = require('multer-s3');
let TempOutfitterApplication = require('./models/tempoutfitter-application.es6');
let validator = require('./validation.es6');
let vcapServices = require('./vcap-services.es6');

let tempOutfitterRestHandlers = {};

let translateFromApiToDatabase = input => {
  return {
    applicantInfoDayPhoneAreaCode: input.applicantInfo.dayPhone.areaCode,
    applicantInfoDayPhoneExtension: input.applicantInfo.dayPhone.extension,
    applicantInfoDayPhoneNumber: input.applicantInfo.dayPhone.number,
    applicantInfoDayPhonePrefix: input.applicantInfo.dayPhone.prefix,
    applicantInfoEmailAddress: input.applicantInfo.emailAddress,
    applicantInfoEveningPhoneAreaCode: input.applicantInfo.eveningPhone ? input.applicantInfo.eveningPhone.areaCode : null,
    applicantInfoEveningPhoneExtension: input.applicantInfo.eveningPhone ? input.applicantInfo.eveningPhone.extension : null,
    applicantInfoEveningPhoneNumber: input.applicantInfo.eveningPhone ? input.applicantInfo.eveningPhone.number : null,
    applicantInfoEveningPhonePrefix: input.applicantInfo.eveningPhone ? input.applicantInfo.eveningPhone.prefix : null,
    applicantInfoFaxAreaCode: input.applicantInfo.faxNumber ? input.applicantInfo.faxNumber.areaCode : null,
    applicantInfoFaxExtension: input.applicantInfo.faxNumber ? input.applicantInfo.faxNumber.extension : null,
    applicantInfoFaxNumber: input.applicantInfo.faxNumber ? input.applicantInfo.faxNumber.number : null,
    applicantInfoFaxPrefix: input.applicantInfo.faxNumber ? input.applicantInfo.faxNumber.prefix : null,
    applicantInfoOrganizationName: input.applicantInfo.organizationName,
    applicantInfoOrgType: input.applicantInfo.orgType,
    applicantInfoPrimaryFirstName: input.applicantInfo.primaryFirstName,
    applicantInfoPrimaryLastName: input.applicantInfo.primaryLastName,
    applicantInfoPrimaryMailingAddress: input.applicantInfo.primaryAddress.mailingAddress,
    applicantInfoPrimaryMailingAddress2: input.applicantInfo.primaryAddress.mailingAddress2,
    applicantInfoPrimaryMailingCity: input.applicantInfo.primaryAddress.mailingCity,
    applicantInfoPrimaryMailingState: input.applicantInfo.primaryAddress.mailingState,
    applicantInfoPrimaryMailingZIP: input.applicantInfo.primaryAddress.mailingZIP,
    applicantInfoWebsite: input.applicantInfo.website,
    authorizingOfficerName: input.authorizingOfficerName,
    authorizingOfficerTitle: input.authorizingOfficerTitle,
    district: input.district,
    forest: input.forest,
    reasonForReturn: input.reasonForReturn,
    region: input.region,
    signature: input.signature,
    tempOutfitterFieldsActDescFieldsAudienceDesc: input.tempOutfitterFields.activityDescriptionFields.audienceDescription,
    tempOutfitterFieldsActDescFieldsDescCleanupRestoration: input.tempOutfitterFields.activityDescriptionFields.descriptionOfCleanupAndRestoration,
    tempOutfitterFieldsActDescFieldsEndDateTime: input.tempOutfitterFields.activityDescriptionFields.dateTimeRange.endDateTime,
    tempOutfitterFieldsActDescFieldsListGovFacilities: input.tempOutfitterFields.activityDescriptionFields.listOfGovernmentFacilities,
    tempOutfitterFieldsActDescFieldsListTempImprovements: input.tempOutfitterFields.activityDescriptionFields.listOfTemporaryImprovements,
    tempOutfitterFieldsActDescFieldsLocationDesc: input.tempOutfitterFields.activityDescriptionFields.locationDescription,
    tempOutfitterFieldsActDescFieldsNumServiceDaysReq: input.tempOutfitterFields.activityDescriptionFields.numberServiceDaysRequested,
    tempOutfitterFieldsActDescFieldsNumTrips: input.tempOutfitterFields.activityDescriptionFields.numberOfTrips,
    tempOutfitterFieldsActDescFieldsServProvided: input.tempOutfitterFields.activityDescriptionFields.servicesProvided,
    tempOutfitterFieldsActDescFieldsStartDateTime: input.tempOutfitterFields.activityDescriptionFields.dateTimeRange.startDateTime,
    tempOutfitterFieldsActDescFieldsStmtAssignedSite: input.tempOutfitterFields.activityDescriptionFields.statementOfAssignedSite,
    tempOutfitterFieldsActDescFieldsStmtMotorizedEquip: input.tempOutfitterFields.activityDescriptionFields.statementOfMotorizedEquipment,
    tempOutfitterFieldsActDescFieldsStmtTransportLivestock: input.tempOutfitterFields.activityDescriptionFields.statementOfTransportationOfLivestock,
    tempOutfitterFieldsAdvertisingDescription: input.tempOutfitterFields.advertisingDescription,
    tempOutfitterFieldsAdvertisingUrl: input.tempOutfitterFields.advertisingURL,
    tempOutfitterFieldsClientCharges: input.tempOutfitterFields.clientCharges,
    tempOutfitterFieldsExperienceList: input.tempOutfitterFields.experienceList,
    tempOutfitterFieldsIndividualCitizen: input.tempOutfitterFields.individualIsCitizen,
    tempOutfitterFieldsSmallBusiness: input.tempOutfitterFields.smallBusiness,
    type: input.type
  };
};

let translateFromDatabaseToApi = input => {
  // TODO: build object
  return input;
};

let translateCollectionFromDatabaseToApi = applications => {
  for (var i = 0; i < applications.length; i++) {
    applications[i] = translateFromDatabaseToApi(applications[i]);
  }
  return applications;
};

// S3 Setup

// Upload to S3
let s3 = new AWS.S3({
  accessKeyId: vcapServices.accessKeyId,
  secretAccessKey: vcapServices.secretAccessKey,
  region: vcapServices.region
});

tempOutfitterRestHandlers.streamToS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: vcapServices.bucket,
    key: function(req, file, next) {
      next(null, file.originalname); //use Date.now() for unique file keys
    }
  })
});

tempOutfitterRestHandlers.attachFile = (req, res) => {
  ApplicationFile.create({
    applicationId: req.body.applicationId,
    // applicationType: req.body.applicationType,
    // s3FileName: req.body.s3FileName,
    // originalFileName: req.body.originalFileName
    applicationType: 'tempoutfitters',
    s3FileName: 'test.pdf',
    originalFileName: 'originalTest.pdf'
  })
    .then(appfile => {
      req.body['fileId'] = appfile.fileId;
      res.status(201).json(req.body);
    })
    .error(err => {
      res.status(500).json(err);
    });
};

tempOutfitterRestHandlers.create = (req, res) => {
  let errorRet = {};
  let errorArr = validator.validateTempOutfitter(req.body);
  if (errorArr.length > 0) {
    errorRet['errors'] = errorArr;
    res.status(400).json(errorRet);
  } else {
    TempOutfitterApplication.create(translateFromApiToDatabase(req.body))
      .then(tempOutfitterApp => {
        req.body['applicationId'] = tempOutfitterApp.applicationId;
        req.body['appControlNumber'] = tempOutfitterApp.appControlNumber;
        res.status(201).json(req.body);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }
};

tempOutfitterRestHandlers.getOne = (req, res) => {
  TempOutfitterApplication.findOne({ where: { app_control_number: req.params.id } })
    .then(app => {
      if (app) {
        res.status(200).json(translateFromDatabaseToApi(app));
      } else {
        res.status(404).send();
      }
    })
    .catch(error => res.status(500).json(error.message));
};

tempOutfitterRestHandlers.getAll = (req, res) => {
  TempOutfitterApplication.findAll()
    .then(results => {
      res.status(200).json(translateCollectionFromDatabaseToApi(results));
    })
    .catch(error => {
      res.status(500).json(error);
    });
};

module.exports = tempOutfitterRestHandlers;
