'use strict';

let ApplicationFile = require('./models/application-files.es6');
let AWS = require('aws-sdk');
let multer = require('multer');
let multerS3 = require('multer-s3');
let TempOutfitterApplication = require('./models/tempoutfitter-application.es6');
// let util = require('./util.es6');
let validator = require('./validation.es6');
let vcapServices = require('./vcap-services.es6');

let tempOutfitterFuncs = {};

// S3 Setup

// Upload to S3
let s3 = new AWS.S3({
  accessKeyId: vcapServices.accessKeyId,
  secretAccessKey: vcapServices.secretAccessKey,
  region: vcapServices.region
});

tempOutfitterFuncs.streamToS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: vcapServices.bucket,
    key: function (req, file, cb) {
      cb(null, file.originalname); //use Date.now() for unique file keys
    }
  })
});

tempOutfitterFuncs.createAppFile = (req, res) => {

  ApplicationFile.create({
    applicationId: req.body.applicationId,
    // applicationType: req.body.applicationType,
    // s3FileName: req.body.s3FileName,
    // originalFileName: req.body.originalFileName
    applicationType: 'tempoutfitters',
    s3FileName: 'test.pdf',
    originalFileName: 'originalTest.pdf'
  }).then((appfile) => {
    req.body['fileId'] = appfile.fileId;
    res.status(201).json(req.body);
  }).error((err) => {
    res.status(500).json(err);
  });

};

tempOutfitterFuncs.createTempOutfitterApp = (req, res) => {

  let errorRet = {};

  let errorArr = validator.validateTempOutfitter(req.body);

  if (errorArr.length > 0) {
    errorRet['errors'] = errorArr;
    res.status(400).json(errorRet);
  } else {

    // create the temp outfitter app object and persist
    TempOutfitterApplication.create({
      region: req.body.region,
      forest: req.body.forest,
      district: req.body.district,
      authorizingOfficerName: req.body.authorizingOfficerName,
      authorizingOfficerTitle: req.body.authorizingOfficerTitle,
      applicantInfoPrimaryFirstName: req.body.applicantInfo.primaryFirstName,
      applicantInfoPrimaryLastName: req.body.applicantInfo.primaryLastName,
      applicantInfoDayPhoneAreaCode: req.body.applicantInfo.dayPhone.areaCode,
      applicantInfoDayPhonePrefix: req.body.applicantInfo.dayPhone.prefix,
      applicantInfoDayPhoneNumber: req.body.applicantInfo.dayPhone.number,
      applicantInfoDayPhoneExtension: req.body.applicantInfo.dayPhone.extension,
      applicantInfoEveningPhoneAreaCode: req.body.applicantInfo.eveningPhone ? req.body.applicantInfo.eveningPhone.areaCode : null,
      applicantInfoEveningPhonePrefix: req.body.applicantInfo.eveningPhone ? req.body.applicantInfo.eveningPhone.prefix : null,
      applicantInfoEveningPhoneNumber: req.body.applicantInfo.eveningPhone ? req.body.applicantInfo.eveningPhone.number : null,
      applicantInfoEveningPhoneExtension: req.body.applicantInfo.eveningPhone ? req.body.applicantInfo.eveningPhone.extension : null,
      applicantInfoEmailAddress: req.body.applicantInfo.emailAddress,
      applicantInfoPrimaryMailingAddress: req.body.applicantInfo.primaryAddress.mailingAddress,
      applicantInfoPrimaryMailingAddress2: req.body.applicantInfo.primaryAddress.mailingAddress2,
      applicantInfoPrimaryMailingCity: req.body.applicantInfo.primaryAddress.mailingCity,
      applicantInfoPrimaryMailingState: req.body.applicantInfo.primaryAddress.mailingState,
      applicantInfoPrimaryMailingZIP: req.body.applicantInfo.primaryAddress.mailingZIP,
      applicantInfoOrganizationName: req.body.applicantInfo.organizationName,
      applicantInfoWebsite: req.body.applicantInfo.website,
      applicantInfoOrgType: req.body.applicantInfo.orgType,
      type: req.body.type,
      tempOutfitterFieldsIndividualCitizen: req.body.tempOutfitterFields.individualIsCitizen,
      tempOutfitterFieldsSmallBusiness: req.body.tempOutfitterFields.smallBusiness,
      tempOutfitterFieldsAdvertisingUrl: req.body.tempOutfitterFields.advertisingURL,
      tempOutfitterFieldsAdvertisingDescription: req.body.tempOutfitterFields.advertisingDescription,
      tempOutfitterFieldsClientCharges: req.body.tempOutfitterFields.clientCharges,
      tempOutfitterFieldsExperienceList: req.body.tempOutfitterFields.experienceList,
      signature: req.body.signature,
      reasonForReturn: req.body.reasonForReturn,
      applicantInfoFaxAreaCode: req.body.applicantInfo.faxNumber ? req.body.applicantInfo.faxNumber.areaCode : null,
      applicantInfoFaxPrefix: req.body.applicantInfo.faxNumber ? req.body.applicantInfo.faxNumber.prefix : null,
      applicantInfoFaxNumber: req.body.applicantInfo.faxNumber ? req.body.applicantInfo.faxNumber.number : null,
      applicantInfoFaxExtension: req.body.applicantInfo.faxNumber ? req.body.applicantInfo.faxNumber.extension : null,
      tempOutfitterFieldsActDescFieldsNumServiceDaysReq: req.body.tempOutfitterFields.activityDescriptionFields.numberServiceDaysRequested,
      tempOutfitterFieldsActDescFieldsNumTrips: req.body.tempOutfitterFields.activityDescriptionFields.numberOfTrips,
      tempOutfitterFieldsActDescFieldsEndDateTime: req.body.tempOutfitterFields.activityDescriptionFields.dateTimeRange.endDateTime,
      tempOutfitterFieldsActDescFieldsStartDateTime: req.body.tempOutfitterFields.activityDescriptionFields.dateTimeRange.startDateTime,
      tempOutfitterFieldsActDescFieldsLocationDesc: req.body.tempOutfitterFields.activityDescriptionFields.locationDescription,
      tempOutfitterFieldsActDescFieldsServProvided: req.body.tempOutfitterFields.activityDescriptionFields.servicesProvided,
      tempOutfitterFieldsActDescFieldsAudienceDesc: req.body.tempOutfitterFields.activityDescriptionFields.audienceDescription,
      tempOutfitterFieldsActDescFieldsListGovFacilities: req.body.tempOutfitterFields.activityDescriptionFields.listOfGovernmentFacilities,
      tempOutfitterFieldsActDescFieldsListTempImprovements: req.body.tempOutfitterFields.activityDescriptionFields.listOfTemporaryImprovements,
      tempOutfitterFieldsActDescFieldsStmtMotorizedEquip: req.body.tempOutfitterFields.activityDescriptionFields.statementOfMotorizedEquipment,
      tempOutfitterFieldsActDescFieldsStmtTransportLivestock: req.body.tempOutfitterFields.activityDescriptionFields.statementOfTransportationOfLivestock,
      tempOutfitterFieldsActDescFieldsStmtAssignedSite: req.body.tempOutfitterFields.activityDescriptionFields.statementOfAssignedSite,
      tempOutfitterFieldsActDescFieldsDescCleanupRestoration: req.body.tempOutfitterFields.activityDescriptionFields.descriptionOfCleanupAndRestoration
    }).then((tempOutfitterApp) => {
      req.body['applicationId'] = tempOutfitterApp.applicationId;
      req.body['appControlNumber'] = tempOutfitterApp.appControlNumber;
      res.status(201).json(req.body);
    }).catch((err) => {
      res.status(500).json(err);
    });
  }
};

tempOutfitterFuncs.getApp = (req, res) => {
  TempOutfitterApplication.findOne({ 'where': {app_control_number: req.params.id}})
    .then(app => {
      if(app) {
        // TODO: build temp outfitter translator
        // res.status(200).json(util.translateFromDatabaseToJSON(app));
        res.status(200).json('not yet implemented');
      } else {
        res.status(404).send();
      }
    })
    .catch(error => res.status(400).json(error.message));
};

module.exports = tempOutfitterFuncs;
