'use strict';

let ApplicationFile = require('./models/application-files.es6');
let AWS = require('aws-sdk');
let cryptoRandomString = require('crypto-random-string');
let multer = require('multer');
let multerS3 = require('multer-s3');
let request = require('request');
let TempOutfitterApplication = require('./models/tempoutfitter-application.es6');
let util = require('./util.es6');
let validator = require('./validation.es6');
let vcapServices = require('./vcap-services.es6');

let tempOutfitter = {};

let s3 = new AWS.S3({
  accessKeyId: vcapServices.accessKeyId,
  secretAccessKey: vcapServices.secretAccessKey,
  region: vcapServices.region
});

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
    applicantInfoFaxAreaCode: input.applicantInfo.fax ? input.applicantInfo.fax.areaCode : null,
    applicantInfoFaxExtension: input.applicantInfo.fax ? input.applicantInfo.fax.extension : null,
    applicantInfoFaxNumber: input.applicantInfo.fax ? input.applicantInfo.fax.number : null,
    applicantInfoFaxPrefix: input.applicantInfo.fax ? input.applicantInfo.fax.prefix : null,
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
    tempOutfitterFieldsActDescFieldsAudienceDesc:
      input.tempOutfitterFields.activityDescriptionFields.audienceDescription,
    tempOutfitterFieldsActDescFieldsDescCleanupRestoration:
      input.tempOutfitterFields.activityDescriptionFields.descriptionOfCleanupAndRestoration,
    tempOutfitterFieldsActDescFieldsEndDateTime:
      input.tempOutfitterFields.activityDescriptionFields.dateTimeRange.endDateTime,
    tempOutfitterFieldsActDescFieldsListGovFacilities:
      input.tempOutfitterFields.activityDescriptionFields.listOfGovernmentFacilities,
    tempOutfitterFieldsActDescFieldsListTempImprovements:
      input.tempOutfitterFields.activityDescriptionFields.listOfTemporaryImprovements,
    tempOutfitterFieldsActDescFieldsLocationDesc:
      input.tempOutfitterFields.activityDescriptionFields.locationDescription,
    tempOutfitterFieldsActDescFieldsNumServiceDaysReq:
      input.tempOutfitterFields.activityDescriptionFields.numberServiceDaysRequested,
    tempOutfitterFieldsActDescFieldsNumTrips: input.tempOutfitterFields.activityDescriptionFields.numberOfTrips,
    tempOutfitterFieldsActDescFieldsServProvided: input.tempOutfitterFields.activityDescriptionFields.servicesProvided,
    tempOutfitterFieldsActDescFieldsStartDateTime:
      input.tempOutfitterFields.activityDescriptionFields.dateTimeRange.startDateTime,
    tempOutfitterFieldsActDescFieldsStmtAssignedSite:
      input.tempOutfitterFields.activityDescriptionFields.statementOfAssignedSite,
    tempOutfitterFieldsActDescFieldsStmtMotorizedEquip:
      input.tempOutfitterFields.activityDescriptionFields.statementOfMotorizedEquipment,
    tempOutfitterFieldsActDescFieldsStmtTransportLivestock:
      input.tempOutfitterFields.activityDescriptionFields.statementOfTransportationOfLivestock,
    tempOutfitterFieldsAdvertisingDescription: input.tempOutfitterFields.advertisingDescription,
    tempOutfitterFieldsAdvertisingUrl: input.tempOutfitterFields.advertisingURL,
    tempOutfitterFieldsClientCharges: input.tempOutfitterFields.clientCharges,
    tempOutfitterFieldsExperienceList: input.tempOutfitterFields.experienceList,
    tempOutfitterFieldsIndividualCitizen: input.tempOutfitterFields.individualIsCitizen,
    tempOutfitterFieldsSmallBusiness: input.tempOutfitterFields.smallBusiness,
    type: input.type,
    tempOutfitterFieldsActDescFieldsPartySize: input.tempOutfitterFields.activityDescriptionFields.partySize,
    tempOutfitterFieldsExpAllCitations: input.tempOutfitterFields.experienceFields.listAllCitations,
    tempOutfitterFieldsExpNatForestPermits: input.tempOutfitterFields.experienceFields.listAllNationalForestPermits,
    tempOutfitterFieldsExpOtherPermits: input.tempOutfitterFields.experienceFields.listAllOtherPermits
  };
};

let translateFromDatabaseToClient = input => {
  return {
    appControlNumber: input.appControlNumber,
    applicationId: input.applicationId,
    authorizingOfficerName: input.authorizingOfficerName,
    authorizingOfficerTitle: input.authorizingOfficerTitle,
    createdAt: input.createdAt,
    district: input.district,
    forest: input.forest,
    reasonForReturn: input.reasonForReturn || undefined,
    region: input.region,
    signature: input.signature,
    status: input.status,
    type: input.type,
    applicantInfo: {
      emailAddress: input.applicantInfoEmailAddress,
      primaryFirstName: input.applicantInfoPrimaryFirstName,
      primaryLastName: input.applicantInfoPrimaryLastName,
      primaryAddress: {
        mailingAddress: input.applicantInfoPrimaryMailingAddress,
        mailingAddress2: input.applicantInfoPrimaryMailingAddress2,
        mailingCity: input.applicantInfoPrimaryMailingCity,
        mailingState: input.applicantInfoPrimaryMailingState,
        mailingZIP: input.applicantInfoPrimaryMailingZIP
      },
      website: input.applicantInfoWebsite,
      organizationName: input.applicantInfoOrganizationName,
      orgType: input.applicantInfoOrgType,
      dayPhone: {
        areaCode: input.applicantInfoDayPhoneAreaCode,
        extension: input.applicantInfoDayPhoneExtension || undefined,
        number: input.applicantInfoDayPhoneNumber,
        prefix: input.applicantInfoDayPhonePrefix
      },
      eveningPhone: {
        areaCode: input.applicantInfoEveningPhoneAreaCode || undefined,
        extension: input.applicantInfoEveningPhoneExtension || undefined,
        number: input.applicantInfoEveningPhoneNumber || undefined,
        prefix: input.applicantInfoEveningPhonePrefix || undefined
      },
      fax: {
        areaCode: input.applicantInfoFaxAreaCode || undefined,
        extension: input.applicantInfoFaxExtension || undefined,
        number: input.applicantInfoFaxNumber || undefined,
        prefix: input.applicantInfoFaxPrefix || undefined
      }
    },
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
          endDateTime: input.tempOutfitterFieldsActDescFieldsEndDateTime,
          startDateTime: input.tempOutfitterFieldsActDescFieldsStartDateTime
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
};

let translateFromIntakeToMiddleLayer = application => {
  let result = {
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
      activityDescription:
        ' Location Description: ' +
        application.tempOutfitterFieldsActDescFieldsLocationDesc +
        ' Services Provided: ' +
        application.tempOutfitterFieldsActDescFieldsServProvided +
        ' Audience Description: ' +
        application.tempOutfitterFieldsActDescFieldsAudienceDesc,
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

let getFile = (key, documentType) => {
  return new Promise((resolve, reject) => {
    s3.getObject({ Bucket: vcapServices.bucket, Key: key }, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve({ fileBuffer: data.Body, documentType: documentType, key: key });
      }
    });
  });
};

let getAllFiles = applicationId => {
  return new Promise((resolve, reject) => {
    ApplicationFile.findAll({
      where: { applicationId: applicationId }
    })
      .then(results => {
        let filePromises = [];
        for (let item of results) {
          filePromises.push(getFile(item.s3FileName, item.documentType));
        }
        Promise.all(filePromises).then(results => {
          let files = {};
          for (let item of results) {
            files[item.documentType] = { buffer: item.fileBuffer, filename: item.key };
          }
          resolve(files);
        });
      })
      .catch(error => {
        reject(error);
      });
  });
};

tempOutfitter.acceptApplication = application => {
  return new Promise((resolve, reject) => {
    getAllFiles(application.applicationId).then(files => {
      let requestOptions = {
        url: vcapServices.middleLayerBaseUrl + 'permits/applications/special-uses/commercial/temp-outfitters/',
        headers: {},
        formData: {
          body: JSON.stringify(translateFromIntakeToMiddleLayer(application)),
          insuranceCertificate: {
            value: files['insurance-certificate'].buffer,
            options: {
              filename: files['insurance-certificate'].filename,
              contentType: util.getContentType(files['insurance-certificate'].filename)
            }
          },
          operatingPlan: {
            value: files['operating-plan'].buffer,
            options: {
              filename: files['operating-plan'].filename,
              contentType: util.getContentType(files['operating-plan'].filename)
            }
          }
        }
      };

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
  });
};

tempOutfitter.streamToS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: vcapServices.bucket,
    metadata: function(req, file, next) {
      next(null, null, Object.assign({}, req.body));
    },
    key: function(req, file, next) {
      next(null, `${cryptoRandomString(20)}/${file.originalname}`);
    }
  })
});

tempOutfitter.attachFile = (req, res) => {
  ApplicationFile.create({
    applicationId: req.body.applicationId,
    applicationType: 'tempoutfitters',
    documentType: req.body.documentType,
    s3FileName: req.files[0].key,
    originalFileName: req.files[0].key
  })
    .then(appfile => {
      req.body['fileId'] = appfile.fileId;
      res.status(201).json(req.body);
    })
    .error(err => {
      res.status(500).json(err);
    });
};

tempOutfitter.create = (req, res) => {
  let errorRet = {};
  let errorArr = validator.validateTempOutfitter(req.body);
  if (errorArr.length > 0) {
    errorRet['errors'] = errorArr;
    res.status(400).json(errorRet);
  } else {
    TempOutfitterApplication.create(translateFromClientToDatabase(req.body))
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

tempOutfitter.getOne = (req, res) => {
  TempOutfitterApplication.findOne({ where: { app_control_number: req.params.id } })
    .then(app => {
      if (app) {
        res.status(200).json(translateFromDatabaseToClient(app));
      } else {
        res.status(404).send();
      }
    })
    .catch(error => {
      res.status(500).json(error.message);
    });
};

tempOutfitter.update = (req, res) => {
  TempOutfitterApplication.findOne({ where: { app_control_number: req.params.id } }).then(app => {
    if (app) {
      app.status = req.body.status;
      if (app.status === 'Accepted') {
        tempOutfitter
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

module.exports = tempOutfitter;
