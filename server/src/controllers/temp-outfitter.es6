'use strict';

const AWS = require('aws-sdk');
const cryptoRandomString = require('crypto-random-string');
const multer = require('multer');
const multerS3 = require('multer-s3');

const ApplicationFile = require('../models/application-files.es6');
const email = require('../email/email-util.es6');
const Revision = require('../models/revision.es6');
const TempOutfitterApplication = require('../models/tempoutfitter-application.es6');
const util = require('../util.es6');
const validator = require('../validation.es6');
const vcapConstants = require('../vcap-constants.es6');

const tempOutfitter = {};

const s3 = new AWS.S3({
  accessKeyId: vcapConstants.accessKeyId,
  secretAccessKey: vcapConstants.secretAccessKey,
  region: vcapConstants.region
});

const translateFromClientToDatabase = (input, output) => {
  output.applicantInfoDayPhoneAreaCode = input.applicantInfo.dayPhone.areaCode;
  output.applicantInfoDayPhoneExtension = input.applicantInfo.dayPhone.extension;
  output.applicantInfoDayPhoneNumber = input.applicantInfo.dayPhone.number;
  output.applicantInfoDayPhonePrefix = input.applicantInfo.dayPhone.prefix;
  output.applicantInfoEmailAddress = input.applicantInfo.emailAddress;
  output.applicantInfoEveningPhoneAreaCode = input.applicantInfo.eveningPhone
    ? input.applicantInfo.eveningPhone.areaCode
    : '';
  output.applicantInfoEveningPhoneExtension = input.applicantInfo.eveningPhone
    ? input.applicantInfo.eveningPhone.extension
    : '';
  output.applicantInfoEveningPhoneNumber = input.applicantInfo.eveningPhone
    ? input.applicantInfo.eveningPhone.number
    : '';
  output.applicantInfoEveningPhonePrefix = input.applicantInfo.eveningPhone
    ? input.applicantInfo.eveningPhone.prefix
    : '';
  output.applicantInfoFaxAreaCode = input.applicantInfo.fax ? input.applicantInfo.fax.areaCode : '';
  output.applicantInfoFaxExtension = input.applicantInfo.fax ? input.applicantInfo.fax.extension : '';
  output.applicantInfoFaxNumber = input.applicantInfo.fax ? input.applicantInfo.fax.number : '';
  output.applicantInfoFaxPrefix = input.applicantInfo.fax ? input.applicantInfo.fax.prefix : '';
  output.applicantInfoOrganizationName = input.applicantInfo.organizationName;
  output.applicantInfoOrgType = input.applicantInfo.orgType;
  output.applicantInfoPrimaryFirstName = input.applicantInfo.primaryFirstName;
  output.applicantInfoPrimaryLastName = input.applicantInfo.primaryLastName;
  output.applicantInfoPrimaryMailingAddress = input.applicantInfo.primaryAddress.mailingAddress;
  output.applicantInfoPrimaryMailingAddress2 = input.applicantInfo.primaryAddress.mailingAddress2;
  output.applicantInfoPrimaryMailingCity = input.applicantInfo.primaryAddress.mailingCity;
  output.applicantInfoPrimaryMailingState = input.applicantInfo.primaryAddress.mailingState;
  output.applicantInfoPrimaryMailingZIP = input.applicantInfo.primaryAddress.mailingZIP;
  output.applicantInfoWebsite = input.applicantInfo.website;
  output.authorizingOfficerName = input.authorizingOfficerName;
  output.authorizingOfficerTitle = input.authorizingOfficerTitle;
  output.district = input.district;
  output.forest = input.forest;
  output.applicantMessage = input.applicantMessage;
  output.region = input.region;
  output.signature = input.signature;
  output.authEmail = input.authEmail;
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

const translateFromDatabaseToClient = input => {
  return {
    appControlNumber: input.appControlNumber,
    applicationId: input.applicationId,
    authorizingOfficerName: input.authorizingOfficerName,
    authorizingOfficerTitle: input.authorizingOfficerTitle,
    createdAt: input.createdAt,
    district: input.district,
    forest: input.forest,
    applicantMessage: input.applicantMessage || undefined,
    region: input.region,
    signature: input.signature,
    authEmail: input.authEmail,
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

const translateFromIntakeToMiddleLayer = application => {
  const result = {
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

const getFile = (key, documentType) => {
  return new Promise((resolve, reject) => {
    s3.getObject(
      {
        Bucket: vcapConstants.bucket,
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

const streamFile = (fileName, res) => {
  res.set('Content-Type', util.getContentType(fileName));
  s3
    .getObject({
      Bucket: vcapConstants.bucket,
      Key: fileName
    })
    .createReadStream()
    .pipe(res);
};

const getAllFileNames = applicationId => {
  return ApplicationFile.findAll({
    where: {
      applicationId: applicationId
    }
  });
};

tempOutfitter.updateApplication = (model, submitted, user) => {
  if (user.role === 'admin') {
    model.status = submitted.status;
    model.applicantMessage = submitted.applicantMessage;
  } else {
    model.status = 'Review';
  }
  translateFromClientToDatabase(submitted, model);
};

tempOutfitter.acceptApplication = application => {
  return new Promise((resolve, reject) => {
    getAllFiles(application.applicationId)
      .then(files => {
        const requestOptions = {
          method: 'POST',
          url: vcapConstants.middleLayerBaseUrl + 'permits/applications/special-uses/commercial/temp-outfitters/',
          headers: {},
          simple: true,
          formData: {
            body: JSON.stringify(translateFromIntakeToMiddleLayer(application))
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

tempOutfitter.streamToS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: vcapConstants.bucket,
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
    .catch(err => {
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
    util.setAuthEmail(req);
    let model = {
      authEmail: req.body.authEmail
    };
    translateFromClientToDatabase(req.body, model);
    TempOutfitterApplication.create(model)
      .then(tempOutfitterApp => {
        email.sendEmail('tempOutfitterApplicationSubmittedConfirmation', tempOutfitterApp);
        email.sendEmail('tempOutfitterApplicationSubmittedAdminConfirmation', tempOutfitterApp);
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
  TempOutfitterApplication.findOne({
    where: {
      app_control_number: req.params.id
    }
  })
    .then(app => {
      if (app) {
        Revision.findAll({
          where: {
            applicationId: app.applicationId,
            applicationType: app.type
          }
        })
          .then(revisions => {
            const formattedApp = translateFromDatabaseToClient(app);
            formattedApp.revisions = revisions;
            res.status(200).json(formattedApp);
          })
          .catch(error => {
            res.status(400).json(error);
          });
      } else {
        res.status(404).send();
      }
    })
    .catch(error => {
      res.status(400).json(error);
    });
};

tempOutfitter.getApplicationFileNames = (req, res) => {
  getAllFileNames(req.params.id)
    .then(app => {
      if (app) {
        res.status(200).json(app);
      } else {
        res.status(404).send();
      }
    })
    .catch(error => {
      res.status(500).json(error.message);
    });
};

tempOutfitter.streamFile = (req, res) => {
  streamFile(Buffer.from(req.params.file, 'base64').toString(), res);
};

tempOutfitter.update = (req, res) => {
  TempOutfitterApplication.findOne({
    where: {
      app_control_number: req.params.id
    }
  })
    .then(app => {
      if (app) {
        tempOutfitter.updateApplication(app, req.body, util.getUser(req));
        Revision.create({
          applicationId: app.applicationId,
          applicationType: app.type,
          status: app.status,
          email: util.getUser(req).email
        });
        if (app.status === 'Accepted') {
          tempOutfitter
            .acceptApplication(app)
            .then(response => {
              app.controlNumber = response.controlNumber;
              app
                .save()
                .then(() => {
                  email.sendEmail(`tempOutfitterApplication${app.status}`, app);
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
              if (app.status === 'Cancelled' && util.getUser(req).role === 'user') {
                email.sendEmail(`tempOutfitterApplicationUser${app.status}`, app);
              } else {
                email.sendEmail(`tempOutfitterApplication${app.status}`, app);
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
    })
    .catch(error => {
      res.status(500).json(error);
    });
};

module.exports = tempOutfitter;
