'use strict';

let express =  require('express');
let bodyParser = require('body-parser');

//------------------------------

let Sequelize = require('sequelize');
let sequelize = new Sequelize(process.env.DATABASE_URL);

const NoncommercialApplication = sequelize.define('noncommercialApplications', {
  applicationId: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  region: { type: Sequelize.STRING(2) },
  forest: { type: Sequelize.STRING(2) },
  district: { type: Sequelize.STRING(2) },
  authorizingOfficerName: { type: Sequelize.STRING },
  authorizingOfficerTitle: { type: Sequelize.STRING },
  eventName: { type: Sequelize.STRING },
  applicantInfoName: { type: Sequelize.STRING },
  applicantInfoSecondaryName: { type: Sequelize.STRING },
  applicantInfoFirstName: { type: Sequelize.STRING },
  applicantInfoLastName: { type: Sequelize.STRING },
  applicantInfoDayPhoneAreaCode: { type: Sequelize.STRING },
  applicantInfoDayPhonePrefix: { type: Sequelize.STRING },
  applicantInfoDayPhoneNumber: { type: Sequelize.STRING },
  applicantInfoDayPhonePhoneType: { type: Sequelize.STRING },
  applicantInfoEvePhoneAreaCode: { type: Sequelize.STRING },
  applicantInfoEvePhonePrefix: { type: Sequelize.STRING },
  applicantInfoEvePhoneNumber: { type: Sequelize.STRING },
  applicantInfoEvePhonePhoneType: { type: Sequelize.STRING },
  applicantInfoEmailAddress: { type: Sequelize.STRING },
  applicantInfoMailingAddress: { type: Sequelize.STRING },
  applicantInfoMailingAddress2: { type: Sequelize.STRING },
  applicantInfoMailingCity: { type: Sequelize.STRING },
  applicantInfoMailingState: { type: Sequelize.STRING },
  applicantInfoMailingZIP: { type: Sequelize.STRING },
  applicantInfoPriPermitHolderNm: { type: Sequelize.STRING },
  applicantInfoPriMailingAddr: { type: Sequelize.STRING },
  applicantInfoPriMailingAddr2: { type: Sequelize.STRING },
  applicantInfoPriMailingCity: { type: Sequelize.STRING },
  applicantInfoPriMailingState: { type: Sequelize.STRING },
  applicantInfoPriMailingZIP: { type: Sequelize.STRING },
  applicantInfoSecMailingAddr: { type: Sequelize.STRING },
  applicantInfoSecMailingAddr2: { type: Sequelize.STRING },
  applicantInfoSecMailingCity: { type: Sequelize.STRING },
  applicantInfoSecMailingState: { type: Sequelize.STRING },
  applicantInfoSecMailingZIP: { type: Sequelize.STRING },
  applicantInfoOrgName: { type: Sequelize.STRING },
  applicantInfoWebsite: { type: Sequelize.STRING },
  applicantInfoOrgType: { type: Sequelize.STRING },
  type: { type: Sequelize.STRING },
  noncommFieldsActivityDesc: { type: Sequelize.STRING },
  noncommFieldsLocationDesc: { type: Sequelize.STRING },
  noncommFieldsStartDateTime: { type: Sequelize.STRING },
  noncommFieldsEndDateTime: { type: Sequelize.STRING },
  noncommFieldsStartMonth: { type: Sequelize.STRING },
  noncommFieldsStartDay: { type: Sequelize.STRING },
  noncommFieldsStartYear: { type: Sequelize.STRING },
  noncommFieldsEndMonth: { type: Sequelize.STRING },
  noncommFieldsEndDay: { type: Sequelize.STRING },
  noncommFieldsEndYear: { type: Sequelize.STRING },
  noncommFieldsStartHour: { type: Sequelize.STRING },
  noncommFieldsStartMinutes: { type: Sequelize.STRING },
  noncommFieldsStartPeriod: { type: Sequelize.STRING },
  noncommFieldsEndHour: { type: Sequelize.STRING },
  noncommFieldsEndMinutes: { type: Sequelize.STRING },
  noncommFieldsEndPeriod: { type: Sequelize.STRING },
  noncommFieldsNumParticipants: { type: Sequelize.STRING }
});

//------------------------------

let Validator = require('jsonschema').Validator;
let v = new Validator();
let validatorOptions = { 'nestedErrors' : true };

var schemas = require('./noncommercial-schema.es6');
v.addSchema(schemas.noncommercialSchema);
v.addSchema(schemas.noncommercialApplicantInfoSchema);
v.addSchema(schemas.noncommercialFieldsSchema);
v.addSchema(schemas.phoneNumberSchema);
v.addSchema(schemas.applicantInfoBaseSchema);
v.addSchema(schemas.commonFieldsSchema);

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

let extractField = (errorObj, withArg) => {
  if (withArg && errorObj.property === 'instance') {
    return errorObj.argument;
  } else if (withArg) {
    // assumption is that the string otherwise is 'instance.<field>'
    return errorObj.property.substring(9) + '.' + errorObj.argument;
  } else {
    return errorObj.property.substring(9);
  }
};

// populates an applicationId on the object before return
let createNoncommercialTempApp = (req, res) => {
  let result = v.validate(req.body, schemas.noncommercialSchema, validatorOptions);
  let errorArr = [];
  let errorRet = {};

  if (result.errors.length > 0) {
    console.log(result);
    for (var error of result.errors) {
      if (error.name === 'required') {
        errorArr.push(error.name + '-' + extractField(error, true));
      } else if (error.name === 'enum' || error.name === 'pattern' || error.name === 'type')  {
        errorArr.push(error.name + '-' + extractField(error, false));
      }
    }

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
      applicantInfoName: req.body.applicantInfo.name,
      applicantInfoSecondaryName: req.body.applicantInfo.secondaryName,
      applicantInfoFirstName: req.body.applicantInfo.firstName,
      applicantInfoLastName: req.body.applicantInfo.lastName,
      applicantInfoDayPhoneAreaCode: req.body.applicantInfo.dayPhone.areaCode,
      applicantInfoDayPhonePrefix: req.body.applicantInfo.dayPhone.prefix,
      applicantInfoDayPhoneNumber: req.body.applicantInfo.dayPhone.number,
      applicantInfoDayPhonePhoneType: req.body.applicantInfo.dayPhone.phoneType,
      applicantInfoEvePhoneAreaCode: req.body.applicantInfo.eveningPhone.areaCode,
      applicantInfoEvePhonePrefix: req.body.applicantInfo.eveningPhone.prefix,
      applicantInfoEvePhoneNumber: req.body.applicantInfo.eveningPhone.number,
      applicantInfoEvePhonePhoneType: req.body.applicantInfo.eveningPhone.phoneType,
      applicantInfoEmailAddress: req.body.applicantInfo.emailAddress,
      applicantInfoMailingAddress: req.body.applicantInfo.mailingAddress,
      applicantInfoMailingAddress2: req.body.applicantInfo.mailingAddress2,
      applicantInfoMailingCity: req.body.applicantInfo.mailingCity,
      applicantInfoMailingState: req.body.applicantInfo.mailingState,
      applicantInfoMailingZIP: req.body.applicantInfo.mailingZIP,
      applicantInfoPriPermitHolderNm: req.body.applicantInfo.primaryPermitHolderName,
      applicantInfoPriMailingAddr: req.body.applicantInfo.primaryMailingAddress,
      applicantInfoPriMailingAddr2: req.body.applicantInfo.primaryMailingAddress2,
      applicantInfoPriMailingCity: req.body.applicantInfo.primaryMailingCity,
      applicantInfoPriMailingState: req.body.applicantInfo.primaryMailingState,
      applicantInfoPriMailingZIP: req.body.applicantInfo.primaryMailingZIP,
      applicantInfoSecMailingAddr: req.body.applicantInfo.secondaryMailingAddress,
      applicantInfoSecMailingAddr2: req.body.applicantInfo.secondaryMailingAddress2,
      applicantInfoSecMailingCity: req.body.applicantInfo.secondaryMailingCity,
      applicantInfoSecMailingState: req.body.applicantInfo.secondaryMailingState,
      applicantInfoSecMailingZIP: req.body.applicantInfo.secondaryMailingZIP,
      applicantInfoOrgName: req.body.applicantInfo.organizationName,
      applicantInfoWebsite: req.body.applicantInfo.website,
      applicantInfoOrgType: req.body.applicantInfo.orgType,
      type: req.body.type,
      noncommFieldsActivityDesc: req.body.noncommercialFields.activityDescription,
      noncommFieldsLocationDesc: req.body.noncommercialFields.locationDescription,
      noncommFieldsStartDateTime: req.body.noncommercialFields.startDateTime,
      noncommFieldsEndDateTime: req.body.noncommercialFields.endDateTime,
      noncommFieldsStartMonth: req.body.noncommercialFields.startMonth,
      noncommFieldsStartDay: req.body.noncommercialFields.startDay,
      noncommFieldsStartYear: req.body.noncommercialFields.startYear,
      noncommFieldsEndMonth: req.body.noncommercialFields.endMonth,
      noncommFieldsEndDay: req.body.noncommercialFields.endDay,
      noncommFieldsEndYear: req.body.noncommercialFields.endYear,
      noncommFieldsStartHour: req.body.noncommercialFields.startHour,
      noncommFieldsStartMinutes: req.body.noncommercialFields.startMinutes,
      noncommFieldsStartPeriod: req.body.noncommercialFields.startPeriod,
      noncommFieldsEndHour: req.body.noncommercialFields.endHour,
      noncommFieldsEndMinutes: req.body.noncommercialFields.endMinutes,
      noncommFieldsEndPeriod: req.body.noncommercialFields.endPeriod,
      noncommFieldsNumParticipants: req.body.noncommercialFields.numParticipants
    }).then((noncommApp) => {
      req.body['applicationId'] = noncommApp.applicationId;
      res.status(201).json(req.body);
    }).error((err) => {
      res.status(500).json(err);
    });
  }
};

// POST /permits/applications/special-uses/noncommercial/
// creates a new noncommercial application
app.post('/permits/applications/special-uses/noncommercial', createNoncommercialTempApp);

// PUT /permits/applications/special-uses/noncommercial/:tempControlNumber
// updates an existing noncommercial application
// may not be able to update everything wholesale due to possible field audit requirements

// GET /permits/applications/special-uses/noncommercial/:tempControlNumber
// retrieve an existing noncommercial application

app.listen(8080);

module.exports = app;
