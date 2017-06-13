'use strict';

let AWS = require('aws-sdk');
let bodyParser = require('body-parser');
let express =  require('express');
let jsonschema = require('jsonschema');
let multer = require('multer');
let multerS3 = require('multer-s3');
let request = require('request');

let util = require('./util.es6');
let NoncommercialApplication = require('./models/noncommercial-application.es6');
let ApplicationFile = require('./models/application-files.es6');
let TempOutfitterApplication = require('./models/tempoutfitter-application.es6');

// Environment variables

const VCAPServices = JSON.parse(process.env.VCAP_SERVICES);
const accessKeyId = VCAPServices.s3[0].credentials.access_key_id;
const secretAccessKey = VCAPServices.s3[0].credentials.secret_access_key;
const region = VCAPServices.s3[0].credentials.region;
const bucket = VCAPServices.s3[0].credentials.bucket;
const middleLayerBaseUrl = VCAPServices['user-provided'][0].credentials.MIDDLELAYER_BASE_URL;
const middleLayerUsername = VCAPServices['user-provided'][0].credentials.MIDDLELAYER_USERNAME;
const middleLayerPassword = VCAPServices['user-provided'][0].credentials.MIDDLELAYER_PASSWORD;

// JSON Validators

let validator = new jsonschema.Validator();
let validatorOptions = { 'nestedErrors' : true };

let addressSchema = require('./json-schemas/address-schema.es6');
let applicantInfoBaseSchema = require('./json-schemas/application-info-base-schema.es6');
let commonFieldsSchema = require('./json-schemas/common-fields-schema.es6');
let noncommercialApplicantInfoSchema = require('./json-schemas/noncommercial-application-info-schema.es6');
let noncommercialFieldsSchema = require('./json-schemas/noncommercial-fields-schema.es6');
let noncommercialSchema = require('./json-schemas/noncommercial-schema.es6');
let phoneNumberSchema = require('./json-schemas/phone-number-schema.es6');
let tempOutfitterAppInfoSchema = require('./json-schemas/tempOutfitter-application-info-schema.es6');
let tempOutfitterFieldsSchema = require('./json-schemas/tempOutfitter-fields-schema.es6');
let tempOutfitterSchema = require('./json-schemas/tempOutfitter-schema.es6');

validator.addSchema(addressSchema);
validator.addSchema(applicantInfoBaseSchema);
validator.addSchema(commonFieldsSchema);
validator.addSchema(noncommercialApplicantInfoSchema);
validator.addSchema(noncommercialFieldsSchema);
validator.addSchema(noncommercialSchema);
validator.addSchema(phoneNumberSchema);
validator.addSchema(tempOutfitterAppInfoSchema);
validator.addSchema(tempOutfitterFieldsSchema);
validator.addSchema(tempOutfitterSchema);

// Controllers

let sendAcceptedNoncommercialApplicationToMiddleLayer = (application, successCallback, failureCallback) => {

  let authOptions = {
    url: middleLayerBaseUrl + 'auth',
    json: true,
    body: { username: middleLayerUsername, password: middleLayerPassword }
  };

  let acceptanceOptions = {
    url: middleLayerBaseUrl + 'permits/applications/special-uses/noncommercial/',
    headers: { 'x-access-token': undefined },
    json: true,
    body: util.translateFromIntakeToMiddleLayer(application)
  };

  request.post(authOptions, (error, response, body) => {
    if (error || response.statusCode !== 200) {
      failureCallback(error || response);
    } else {
      acceptanceOptions.headers['x-access-token'] = body.token;
      request.post(acceptanceOptions, (error, response, body) => {
        if (error || response.statusCode !== 200) {
          failureCallback(error || response);
        } else {
          successCallback(body);
        }
      });
    }
  });
};

// populates an applicationId on the object before return
let createNoncommercialTempApp = (req, res) => {

  let errorArr = [];
  let errorRet = {};

  // overall validation
  let result = validator.validate(req.body, noncommercialSchema, validatorOptions);
  if (result.errors.length > 0) {
    util.collateErrors(result, errorArr);
  }

  // if there is an evening phone, validate it
  if (req.body.applicantInfo.eveningPhone && Object.keys(req.body.applicantInfo.eveningPhone).length > 0) {
    result = validator.validate(req.body.applicantInfo.eveningPhone, phoneNumberSchema, validatorOptions);
    util.collateErrors(result, errorArr, 'applicantInfo.eveningPhone.');
  }

  // if the orgType is Individual, then primaryAddress is required
  if (req.body.applicantInfo.orgType === 'Person') {
    if (req.body.applicantInfo.primaryAddress && Object.keys(req.body.applicantInfo.primaryAddress).length > 0) {
      result = validator.validate(req.body.applicantInfo.primaryAddress, addressSchema, validatorOptions);
      util.collateErrors(result, errorArr, 'applicantInfo.primaryAddress.');
    } else {
      errorArr.push('required-applicantInfo.primaryAddress');
    }
  }

  // if the orgType is Corporation, then organizationAddress is required and might have a primary address
  if (req.body.applicantInfo.orgType === 'Corporation') {
    if (req.body.applicantInfo.organizationAddress && Object.keys(req.body.applicantInfo.organizationAddress).length > 0) {
      result = validator.validate(req.body.applicantInfo.organizationAddress, addressSchema, validatorOptions);
      util.collateErrors(result, errorArr, 'applicantInfo.organizationAddress.');
    } else {
      errorArr.push('required-applicantInfo.organizationAddress');
    }

    if (req.body.applicantInfo.primaryAddress && Object.keys(req.body.applicantInfo.primaryAddress).length > 0) {
      result = validator.validate(req.body.applicantInfo.primaryAddress, addressSchema, validatorOptions);
      util.collateErrors(result, errorArr, 'applicantInfo.primaryAddress.');
    }
  }

  // if secondaryAddress exists, then validate it
  if (req.body.applicantInfo.secondaryAddress && Object.keys(req.body.applicantInfo.secondaryAddress).length > 0) {
    result = validator.validate(req.body.applicantInfo.secondaryAddress, addressSchema, validatorOptions);
    util.collateErrors(result, errorArr, 'applicantInfo.secondaryAddress.');
  }

  if (errorArr.length > 0) {
    errorRet['errors'] = errorArr;
    res.status(400).json(errorRet);
  } else {

    // create the noncommercial app object and persist
    NoncommercialApplication.create({
      region: req.body.region,
      forest: req.body.forest,
      district: req.body.district,
      authorizingOfficerName: req.body.authorizingOfficerName,
      authorizingOfficerTitle: req.body.authorizingOfficerTitle,
      eventName: req.body.eventName,
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
      applicantInfoOrgMailingAddress: req.body.applicantInfo.organizationAddress ? req.body.applicantInfo.organizationAddress.mailingAddress : null,
      applicantInfoOrgMailingAddress2: req.body.applicantInfo.organizationAddress ? req.body.applicantInfo.organizationAddress.mailingAddress2 : null,
      applicantInfoOrgMailingCity: req.body.applicantInfo.organizationAddress ? req.body.applicantInfo.organizationAddress.mailingCity : null,
      applicantInfoOrgMailingState: req.body.applicantInfo.organizationAddress ? req.body.applicantInfo.organizationAddress.mailingState : null,
      applicantInfoOrgMailingZIP: req.body.applicantInfo.organizationAddress ? req.body.applicantInfo.organizationAddress.mailingZIP : null,
      applicantInfoPrimaryMailingAddress: req.body.applicantInfo.primaryAddress ? req.body.applicantInfo.primaryAddress.mailingAddress : null,
      applicantInfoPrimaryMailingAddress2: req.body.applicantInfo.primaryAddress ? req.body.applicantInfo.primaryAddress.mailingAddress2 : null,
      applicantInfoPrimaryMailingCity: req.body.applicantInfo.primaryAddress ? req.body.applicantInfo.primaryAddress.mailingCity : null,
      applicantInfoPrimaryMailingState: req.body.applicantInfo.primaryAddress ? req.body.applicantInfo.primaryAddress.mailingState : null,
      applicantInfoPrimaryMailingZIP: req.body.applicantInfo.primaryAddress ? req.body.applicantInfo.primaryAddress.mailingZIP : null,
      applicantInfoSecondaryMailingAddress: req.body.applicantInfo.secondaryAddress ? req.body.applicantInfo.secondaryAddress.mailingAddress : null,
      applicantInfoSecondaryMailingAddress2: req.body.applicantInfo.secondaryAddress ? req.body.applicantInfo.secondaryAddress.mailingAddress2 : null,
      applicantInfoSecondaryMailingCity: req.body.applicantInfo.secondaryAddress ? req.body.applicantInfo.secondaryAddress.mailingCity : null,
      applicantInfoSecondaryMailingState: req.body.applicantInfo.secondaryAddress ? req.body.applicantInfo.secondaryAddress.mailingState : null,
      applicantInfoSecondaryMailingZIP: req.body.applicantInfo.secondaryAddress ? req.body.applicantInfo.secondaryAddress.mailingZIP : null,
      applicantInfoOrganizationName: req.body.applicantInfo.organizationName,
      applicantInfoWebsite: req.body.applicantInfo.website,
      applicantInfoOrgType: req.body.applicantInfo.orgType,
      applicantInfoSecondaryFirstName: req.body.applicantInfo.secondaryFirstName,
      applicantInfoSecondaryLastName: req.body.applicantInfo.secondaryLastName,
      type: req.body.type,
      noncommercialFieldsActivityDescription: req.body.noncommercialFields.activityDescription,
      noncommercialFieldsLocationDescription: req.body.noncommercialFields.locationDescription,
      noncommercialFieldsStartDateTime: req.body.noncommercialFields.startDateTime,
      noncommercialFieldsEndDateTime: req.body.noncommercialFields.endDateTime,
      noncommercialFieldsNumberParticipants: req.body.noncommercialFields.numberParticipants,
      noncommercialFieldsSpectatorCount: req.body.noncommercialFields.spectators,
      signature: req.body.signature,
      reasonForReturn: req.body.reasonForReturn
    }).then((noncommApp) => {
      req.body['applicationId'] = noncommApp.applicationId;
      req.body['appControlNumber'] = noncommApp.appControlNumber;
      res.status(201).json(req.body);
    }).error((err) => {
      res.status(500).json(err);
    });
  }
};

let updateApp = (req, res) => {
  NoncommercialApplication.findOne({ 'where': {app_control_number: req.params.id}}).then(app => {
    if(app) {
      app.status = req.body.status;
      if (app.status === 'Accepted') {
        sendAcceptedNoncommercialApplicationToMiddleLayer(app,
          (response) => {
            app.controlNumber = response.controlNumber;
            app.save().then(() => {
              res.status(200).json(util.translateFromDatabaseToJSON(app));
            });
          },
          (error) => {
            res.status(400).send(error);
          }
        );
      } else {
        app.save().then(() => {
          res.status(200).json(util.translateFromDatabaseToJSON(app));
        });
      }
    } else {
      res.status(404);
    }
  });
};

let getApp = (req, res) => {
  NoncommercialApplication.findOne({ 'where': {app_control_number: req.params.id}})
    .then(app => {
      if(app) {
        res.status(200).json(util.translateFromDatabaseToJSON(app));
      } else {
        res.status(404).send();
      }
    })
    .catch(error => res.status(400).json(error.message));
};

let getAllApps = (req, res) => {
  NoncommercialApplication.findAll().then(allApps => {
    res.status(200).json(util.translateArrayFromDatabaseToJSON(allApps));
  });
};

let createAppFile = (req, res) => {

  ApplicationFile.create({
    fileId: req.body.fileId,
    applicationId: req.body.applicationId,
    applicationType: req.body.applicationType,
    s3FileName: req.body.s3FileName,
    originalFileName: req.body.originalFileName
  }).then((appfile) => {
    req.body['fileId'] = appfile.fileId;
    res.status(201).json(req.body);
  }).error((err) => {
    res.status(500).json(err);
  });

};

let createTempOutfitterApp = (req, res) => {

  let errorArr = [];
  let errorRet = {};

  // overall validation
  let result = validator.validate(req.body, tempOutfitterSchema, validatorOptions);
  if (result.errors.length > 0) {
    util.collateErrors(result, errorArr);
  }

  // if there is an evening phone, validate it
  if (req.body.applicantInfo.eveningPhone && Object.keys(req.body.applicantInfo.eveningPhone).length > 0) {
    result = validator.validate(req.body.applicantInfo.eveningPhone, phoneNumberSchema, validatorOptions);
    util.collateErrors(result, errorArr, 'applicantInfo.eveningPhone.');
  }

  // if the orgType is Individual, then primaryAddress is required
  if (req.body.applicantInfo.orgType === 'Person') {
    if (req.body.applicantInfo.primaryAddress && Object.keys(req.body.applicantInfo.primaryAddress).length > 0) {
      result = validator.validate(req.body.applicantInfo.primaryAddress, addressSchema, validatorOptions);
      util.collateErrors(result, errorArr, 'applicantInfo.primaryAddress.');
    } else {
      errorArr.push('required-applicantInfo.primaryAddress');
    }
  }

  // if the orgType is Corporation, then organizationAddress is required and might have a primary address
  if (req.body.applicantInfo.orgType === 'Corporation') {
    if (req.body.applicantInfo.organizationAddress && Object.keys(req.body.applicantInfo.organizationAddress).length > 0) {
      result = validator.validate(req.body.applicantInfo.organizationAddress, addressSchema, validatorOptions);
      util.collateErrors(result, errorArr, 'applicantInfo.organizationAddress.');
    } else {
      errorArr.push('required-applicantInfo.organizationAddress');
    }

    if (req.body.applicantInfo.primaryAddress && Object.keys(req.body.applicantInfo.primaryAddress).length > 0) {
      result = validator.validate(req.body.applicantInfo.primaryAddress, addressSchema, validatorOptions);
      util.collateErrors(result, errorArr, 'applicantInfo.primaryAddress.');
    }
  }

  // if secondaryAddress exists, then validate it
  if (req.body.applicantInfo.secondaryAddress && Object.keys(req.body.applicantInfo.secondaryAddress).length > 0) {
    result = validator.validate(req.body.applicantInfo.secondaryAddress, addressSchema, validatorOptions);
    util.collateErrors(result, errorArr, 'applicantInfo.secondaryAddress.');
  }

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
      eventName: req.body.eventName,
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
      applicantInfoOrgMailingAddress: req.body.applicantInfo.organizationAddress ? req.body.applicantInfo.organizationAddress.mailingAddress : null,
      applicantInfoOrgMailingAddress2: req.body.applicantInfo.organizationAddress ? req.body.applicantInfo.organizationAddress.mailingAddress2 : null,
      applicantInfoOrgMailingCity: req.body.applicantInfo.organizationAddress ? req.body.applicantInfo.organizationAddress.mailingCity : null,
      applicantInfoOrgMailingState: req.body.applicantInfo.organizationAddress ? req.body.applicantInfo.organizationAddress.mailingState : null,
      applicantInfoOrgMailingZIP: req.body.applicantInfo.organizationAddress ? req.body.applicantInfo.organizationAddress.mailingZIP : null,
      applicantInfoPrimaryMailingAddress: req.body.applicantInfo.primaryAddress ? req.body.applicantInfo.primaryAddress.mailingAddress : null,
      applicantInfoPrimaryMailingAddress2: req.body.applicantInfo.primaryAddress ? req.body.applicantInfo.primaryAddress.mailingAddress2 : null,
      applicantInfoPrimaryMailingCity: req.body.applicantInfo.primaryAddress ? req.body.applicantInfo.primaryAddress.mailingCity : null,
      applicantInfoPrimaryMailingState: req.body.applicantInfo.primaryAddress ? req.body.applicantInfo.primaryAddress.mailingState : null,
      applicantInfoPrimaryMailingZIP: req.body.applicantInfo.primaryAddress ? req.body.applicantInfo.primaryAddress.mailingZIP : null,
      applicantInfoSecondaryMailingAddress: req.body.applicantInfo.secondaryAddress ? req.body.applicantInfo.secondaryAddress.mailingAddress : null,
      applicantInfoSecondaryMailingAddress2: req.body.applicantInfo.secondaryAddress ? req.body.applicantInfo.secondaryAddress.mailingAddress2 : null,
      applicantInfoSecondaryMailingCity: req.body.applicantInfo.secondaryAddress ? req.body.applicantInfo.secondaryAddress.mailingCity : null,
      applicantInfoSecondaryMailingState: req.body.applicantInfo.secondaryAddress ? req.body.applicantInfo.secondaryAddress.mailingState : null,
      applicantInfoSecondaryMailingZIP: req.body.applicantInfo.secondaryAddress ? req.body.applicantInfo.secondaryAddress.mailingZIP : null,
      applicantInfoOrganizationName: req.body.applicantInfo.organizationName,
      applicantInfoWebsite: req.body.applicantInfo.website,
      applicantInfoOrgType: req.body.applicantInfo.orgType,
      applicantInfoSecondaryFirstName: req.body.applicantInfo.secondaryFirstName,
      applicantInfoSecondaryLastName: req.body.applicantInfo.secondaryLastName,
      type: req.body.type,
      tempOutfitterFieldsIndividualCitizen: req.body.tempOutfitterFields.individualCitizen,
      tempOutfitterFieldsSmallBusiness: req.body.tempOutfitterFields.smallBusiness,
      tempOutfitterFieldsActivityDescription: req.body.tempOutfitterFields.activityDescription,
      tempOutfitterFieldsAdvertisingUrl: req.body.tempOutfitterFields.advertisingURL,
      tempOutfitterFieldsAdvertisingDescription: req.body.tempOutfitterFields.advertisingDescription,
      tempOutfitterFieldsClientCharges: req.body.tempOutfitterFields.clientCharges,
      tempOutfitterFieldsExperienceList: req.body.tempOutfitterFields.experienceList,
      signature: req.body.signature,
      reasonForReturn: req.body.reasonForReturn
    }).then((tempOutfitterApp) => {
      req.body['applicationId'] = tempOutfitterApp.applicationId;
      req.body['appControlNumber'] = tempOutfitterApp.appControlNumber;
      res.status(201).json(req.body);
    }).error((err) => {
      res.status(500).json(err);
    });
  }
};

// server creation ----------------------------------------------------------

let app = express();
app.use(bodyParser.json());

// middleware that will add the Access-Control-Allow-Origin header to everything
app.use(function(req, res, next) {
  var origin = req.headers.origin;
  if(origin === 'http://localhost:4200'){
    res.set('Access-Control-Allow-Origin', origin);
  } else {
    res.set('Access-Control-Allow-Origin', 'https://fs-intake-staging.app.cloud.gov');
  }
  res.set('Access-Control-Allow-Credentials', true);
  next();
});

// set these headers on all of the OPTIONS preflight responses
app.options('*', function(req, res) {
  res.set('Access-Control-Allow-Headers', 'accept, content-type');
  res.set('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS, PATCH');
  res.send();
});

// S3 Setup

// Upload to S3
let s3 = new AWS.S3({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  region: region
});

let streamToS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucket,
    key: function (req, file, cb) {
      cb(null, file.originalname); //use Date.now() for unique file keys
    }
  })
});

// Endpoints

// POST /permits/applications/special-uses/noncommercial/
// creates a new noncommercial application
app.post('/permits/applications/special-uses/noncommercial', createNoncommercialTempApp);

// POST /permits/applications/special-uses/temp-outfitters
// TODO creates a new temp outfitter application
app.post('/permits/applications/special-uses/temp-outfitters', createTempOutfitterApp);

// POST /permits/applications/special-uses/temp-outfitters/file
// Handles temp outfitter file upload and invokes streamToS3 function
app.post('/permits/applications/special-uses/temp-outfitters/file', streamToS3.array('file',1), createAppFile);

// PUT /permits/applications/special-uses/noncommercial/:tempControlNumber
// updates an existing noncommercial application
// may not be able to update everything wholesale due to possible field audit requirements
app.put('/permits/applications/:id', updateApp);

// GET /permits/applications/special-uses/noncommercial/:tempControlNumber
app.get('/permits/applications/:id', getApp);

// GET /permits/applications
// retrieves all applications in the system
app.get('/permits/applications', getAllApps);

app.get('/uptime', function(req, res) {
  res.send('Uptime: ' + process.uptime() + ' seconds');
});

// start the server
app.listen(8080);

// export needed for testing
module.exports = app;
