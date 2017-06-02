'use strict';

let bodyParser = require('body-parser');
let express =  require('express');
let jsonschema = require('jsonschema');
let request = require('request');

let util = require('./util.es6');
let NoncommercialApplication = require('./models/noncommercial-application.es6');

const middleLayerBaseUrl = process.env.MIDDLELAYER_BASE_URL;
const middleLayerUsername = process.env.MIDDLELAYER_USERNAME;
const middleLayerPassword = process.env.MIDDLELAYER_PASSWORD;

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

validator.addSchema(addressSchema);
validator.addSchema(applicantInfoBaseSchema);
validator.addSchema(commonFieldsSchema);
validator.addSchema(noncommercialApplicantInfoSchema);
validator.addSchema(noncommercialFieldsSchema);
validator.addSchema(noncommercialSchema);
validator.addSchema(phoneNumberSchema);

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
      applicantInfoDayPhonePhoneType: req.body.applicantInfo.dayPhone.phoneType,
      applicantInfoEveningPhoneAreaCode: req.body.applicantInfo.eveningPhone ? req.body.applicantInfo.eveningPhone.areaCode : null,
      applicantInfoEveningPhonePrefix: req.body.applicantInfo.eveningPhone ? req.body.applicantInfo.eveningPhone.prefix : null,
      applicantInfoEveningPhoneNumber: req.body.applicantInfo.eveningPhone ? req.body.applicantInfo.eveningPhone.number : null,
      applicantInfoEveningPhonePhoneType: req.body.applicantInfo.eveningPhone ? req.body.applicantInfo.eveningPhone.phoneType : null,
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
      applicantInfoSecondaryLastName: req.body.applicantInfo.secondaryFirstName,
      type: req.body.type,
      noncommercialFieldsActivityDescription: req.body.noncommercialFields.activityDescription,
      noncommercialFieldsLocationDescription: req.body.noncommercialFields.locationDescription,
      noncommercialFieldsStartDateTime: req.body.noncommercialFields.startDateTime,
      noncommercialFieldsEndDateTime: req.body.noncommercialFields.endDateTime,
      noncommercialFieldsStartMonth: req.body.noncommercialFields.startMonth,
      noncommercialFieldsStartDay: req.body.noncommercialFields.startDay,
      noncommercialFieldsStartYear: req.body.noncommercialFields.startYear,
      noncommercialFieldsEndMonth: req.body.noncommercialFields.endMonth,
      noncommercialFieldsEndDay: req.body.noncommercialFields.endDay,
      noncommercialFieldsEndYear: req.body.noncommercialFields.endYear,
      noncommercialFieldsStartHour: req.body.noncommercialFields.startHour,
      noncommercialFieldsStartMinutes: req.body.noncommercialFields.startMinutes,
      noncommercialFieldsStartPeriod: req.body.noncommercialFields.startPeriod,
      noncommercialFieldsEndHour: req.body.noncommercialFields.endHour,
      noncommercialFieldsEndMinutes: req.body.noncommercialFields.endMinutes,
      noncommercialFieldsEndPeriod: req.body.noncommercialFields.endPeriod,
      noncommercialFieldsNumberParticipants: req.body.noncommercialFields.numberParticipants
    }).then((noncommApp) => {
      req.body['applicationId'] = noncommApp.applicationId;
      res.status(201).json(req.body);
    }).error((err) => {
      res.status(500).json(err);
    });
  }
};

let updateApp = (req, res) => {
  NoncommercialApplication.findOne({ 'where': {application_id: req.params.id}}).then(app => {
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
  NoncommercialApplication.findOne({ 'where': {application_id: req.params.id}}).then(app => {
    if(app) {
      res.status(200).json(util.translateFromDatabaseToJSON(app));
    } else {
      res.status(404);
    }
  });
};

let getAllApps = (req, res) => {
  NoncommercialApplication.findAll().then(allApps => {
    res.status(200).json(util.translateArrayFromDatabaseToJSON(allApps));
  });
};

// server creation ----------------------------------------------------------

let app = express();
app.use(bodyParser.json());

// middleware that will add the Access-Control-Allow-Origin header to everything
app.use(function(req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  next();
});

// set these headers on all of the OPTIONS preflight responses
app.options('*', function(req, res) {
  res.set('Access-Control-Allow-Headers', 'accept, content-type');
  res.set('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS, PATCH');
  res.send();
});

// Endpoints

// POST /permits/applications/special-uses/noncommercial/
// creates a new noncommercial application
app.post('/permits/applications/special-uses/noncommercial', createNoncommercialTempApp);

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
