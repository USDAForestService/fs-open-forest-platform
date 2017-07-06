'use strict';

let bodyParser = require('body-parser');
let express =  require('express');

let util = require('./util.es6');
let validator = require('./validation.es6');
let NoncommercialApplication = require('./models/noncommercial-application.es6');

let sendAcceptedNoncommercialApplicationToMiddleLayer = require('./middlelayer-interaction.es6');
let tempOutfitter = require('./temp-outfitter.es6');

// Controllers

// populates an applicationId on the object before return
let createNoncommercialTempApp = (req, res) => {

  //let errorArr = [];
  let errorRet = {};

  let errorArr = validator.validateNoncommercial(req.body);

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
      noncommercialFieldsStartDateTime: req.body.dateTimeRange.startDateTime,
      noncommercialFieldsEndDateTime: req.body.dateTimeRange.endDateTime,
      noncommercialFieldsNumberParticipants: req.body.noncommercialFields.numberParticipants,
      noncommercialFieldsSpectatorCount: req.body.noncommercialFields.spectators,
      signature: req.body.signature,
      reasonForReturn: req.body.reasonForReturn
    }).then((noncommApp) => {
      req.body['applicationId'] = noncommApp.applicationId;
      req.body['appControlNumber'] = noncommApp.appControlNumber;
      res.status(201).json(req.body);
    }).catch((err) => {
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
      res.status(404).send();
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

app.use('/api', express.static('api'));

// Endpoints

// POST /permits/applications/special-uses/noncommercial/
// creates a new noncommercial application
app.post('/permits/applications/special-uses/noncommercial', createNoncommercialTempApp);

// POST /permits/applications/special-uses/temp-outfitters
// creates a new temp outfitter application
app.post('/permits/applications/special-uses/temp-outfitters', tempOutfitter.createTempOutfitterApp);

// POST /permits/applications/special-uses/temp-outfitters/file
// Handles temp outfitter file upload and invokes streamToS3 function
app.post('/permits/applications/special-uses/temp-outfitters/file', tempOutfitter.streamToS3.array('file',1), tempOutfitter.createAppFile);

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
