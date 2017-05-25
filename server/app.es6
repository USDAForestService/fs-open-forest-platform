'use strict';

let express =  require('express');
let bodyParser = require('body-parser');

//------------------------------

let url = require('url');
let Sequelize = require('sequelize');

const sequelizeOptions = {
  dialect: url.parse(process.env.DATABASE_URL, true).protocol.split(':')[0]
};

if (url.parse(process.env.DATABASE_URL, true).hostname !== 'localhost') {
  sequelizeOptions.dialectOptions = {
    ssl: true
  };
}

let sequelize = new Sequelize(process.env.DATABASE_URL, sequelizeOptions);

const NoncommercialApplication = sequelize.define('noncommercialApplications', {
  applicationId: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, field: 'application_id' },
  controlNumber: { type: Sequelize.STRING(50), field: 'control_number' },
  region: { type: Sequelize.STRING(2), field: 'region' },
  forest: { type: Sequelize.STRING(2), field: 'forest' },
  district: { type: Sequelize.STRING(2), field: 'district' },
  authorizingOfficerName: { type: Sequelize.STRING, field: 'authorizing_officer_name' },
  authorizingOfficerTitle: { type: Sequelize.STRING, field: 'authorizing_officer_title' },
  eventName: { type: Sequelize.STRING, field: 'event_name' },
  applicantInfoName: { type: Sequelize.STRING, field: 'applicant_info_name' },
  applicantInfoSecondaryName: { type: Sequelize.STRING, field: 'applicant_info_secondary_name' },
  applicantInfoFirstName: { type: Sequelize.STRING, field: 'applicant_info_first_name' },
  applicantInfoLastName: { type: Sequelize.STRING, field: 'applicant_info_last_name' },
  applicantInfoDayPhoneAreaCode: { type: Sequelize.STRING, field: 'applicant_info_day_phone_areacd' },
  applicantInfoDayPhonePrefix: { type: Sequelize.STRING, field: 'applicant_info_day_phone_prefix' },
  applicantInfoDayPhoneNumber: { type: Sequelize.STRING, field: 'applicant_info_day_phone_number' },
  applicantInfoDayPhonePhoneType: { type: Sequelize.STRING, field: 'applicant_info_day_phone_type' },
  applicantInfoEveningPhoneAreaCode: { type: Sequelize.STRING, field: 'applicant_info_eve_phone_areacd' },
  applicantInfoEveningPhonePrefix: { type: Sequelize.STRING, field: 'applicant_info_eve_phone_prefix' },
  applicantInfoEveningPhoneNumber: { type: Sequelize.STRING, field: 'applicant_info_eve_phone_number' },
  applicantInfoEveningPhonePhoneType: { type: Sequelize.STRING, field: 'applicant_info_eve_phone_type' },
  applicantInfoEmailAddress: { type: Sequelize.STRING, field: 'applicant_info_email_address' },
  applicantInfoMailingAddress: { type: Sequelize.STRING, field: 'applicant_info_mailing_address' },
  applicantInfoMailingAddress2: { type: Sequelize.STRING, field: 'applicant_info_mailing_address2' },
  applicantInfoMailingCity: { type: Sequelize.STRING, field: 'applicant_info_mailing_city' },
  applicantInfoMailingState: { type: Sequelize.STRING, field: 'applicant_info_mailing_state' },
  applicantInfoMailingZIP: { type: Sequelize.STRING, field: 'applicant_info_mailing_zip' },
  applicantInfoPrimaryPermitHolderName: { type: Sequelize.STRING, field: 'appl_info_pri_permit_hold_nm' },
  applicantInfoPrimaryMailingAddress: { type: Sequelize.STRING, field: 'appl_info_pri_mailing_address' },
  applicantInfoPrimaryMailingAddress2: { type: Sequelize.STRING, field: 'appl_info_pri_mailing_address2' },
  applicantInfoPrimaryMailingCity: { type: Sequelize.STRING, field: 'appl_info_pri_mailing_city' },
  applicantInfoPrimaryMailingState: { type: Sequelize.STRING, field: 'appl_info_pri_mailing_state' },
  applicantInfoPrimaryMailingZIP: { type: Sequelize.STRING, field: 'appl_info_pri_mailing_zip' },
  applicantInfoSecondaryMailingAddress: { type: Sequelize.STRING, field: 'appl_info_sec_mailing_address' },
  applicantInfoSecondaryMailingAddress2: { type: Sequelize.STRING, field: 'appl_info_sec_mailing_address2' },
  applicantInfoSecondaryMailingCity: { type: Sequelize.STRING, field: 'appl_info_sec_mailing_city' },
  applicantInfoSecondaryMailingState: { type: Sequelize.STRING, field: 'appl_info_sec_mailing_state' },
  applicantInfoSecondaryMailingZIP: { type: Sequelize.STRING, field: 'appl_info_sec_mailing_zip' },
  applicantInfoOrganizationName: { type: Sequelize.STRING, field: 'applicant_info_org_name' },
  applicantInfoWebsite: { type: Sequelize.STRING, field: 'applicant_info_website' },
  applicantInfoOrgType: { type: Sequelize.STRING, field: 'applicant_info_org_type' },
  type: { type: Sequelize.STRING, field: 'type' },
  noncommercialFieldsActivityDescription: { type: Sequelize.STRING, field: 'noncomm_fields_activity_descr' },
  noncommercialFieldsLocationDescription: { type: Sequelize.STRING, field: 'noncomm_fields_location_descr' },
  noncommercialFieldsStartDateTime: { type: Sequelize.STRING, field: 'noncomm_fields_start_date_time' },
  noncommercialFieldsEndDateTime: { type: Sequelize.STRING, field: 'noncomm_fields_end_date_time' },
  noncommercialFieldsStartMonth: { type: Sequelize.STRING, field: 'noncomm_fields_start_month' },
  noncommercialFieldsStartDay: { type: Sequelize.STRING, field: 'noncomm_fields_start_day' },
  noncommercialFieldsStartYear: { type: Sequelize.STRING, field: 'noncomm_fields_start_year' },
  noncommercialFieldsEndMonth: { type: Sequelize.STRING, field: 'noncomm_fields_end_month' },
  noncommercialFieldsEndDay: { type: Sequelize.STRING, field: 'noncomm_fields_end_day' },
  noncommercialFieldsEndYear: { type: Sequelize.STRING, field: 'noncomm_fields_end_year' },
  noncommercialFieldsStartHour: { type: Sequelize.STRING, field: 'noncomm_fields_start_hour' },
  noncommercialFieldsStartMinutes: { type: Sequelize.STRING, field: 'noncomm_fields_start_minutes' },
  noncommercialFieldsStartPeriod: { type: Sequelize.STRING, field: 'noncomm_fields_start_period' },
  noncommercialFieldsEndHour: { type: Sequelize.STRING, field: 'noncomm_fields_end_hour' },
  noncommercialFieldsEndMinutes: { type: Sequelize.STRING, field: 'noncomm_fields_end_minutes' },
  noncommercialFieldsEndPeriod: { type: Sequelize.STRING, field: 'noncomm_fields_end_period' },
  noncommercialFieldsNumberParticipants: { type: Sequelize.STRING, field: 'noncomm_fields_num_participants' },
  createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, allowNull: false, field: 'created' },
  updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, allowNull: false, field: 'updated' },
  status: { type: Sequelize.STRING, defaultValue: 'Received', field: 'status'}
}, {
  timestamps: true
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
v.addSchema(schemas.addressSchema);

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
      applicantInfoEveningPhoneAreaCode: req.body.applicantInfo.eveningPhone.areaCode,
      applicantInfoEveningPhonePrefix: req.body.applicantInfo.eveningPhone.prefix,
      applicantInfoEveningPhoneNumber: req.body.applicantInfo.eveningPhone.number,
      applicantInfoEveningPhonePhoneType: req.body.applicantInfo.eveningPhone.phoneType,
      applicantInfoEmailAddress: req.body.applicantInfo.emailAddress,
      applicantInfoMailingAddress: req.body.applicantInfo.address.mailingAddress,
      applicantInfoMailingAddress2: req.body.applicantInfo.address.mailingAddress2,
      applicantInfoMailingCity: req.body.applicantInfo.address.mailingCity,
      applicantInfoMailingState: req.body.applicantInfo.address.mailingState,
      applicantInfoMailingZIP: req.body.applicantInfo.address.mailingZIP,
      applicantInfoPrimaryPermitHolderName: req.body.applicantInfo.primaryPermitHolderName,
      applicantInfoPrimaryMailingAddress: req.body.applicantInfo.primaryAddress.mailingAddress,
      applicantInfoPrimaryMailingAddress2: req.body.applicantInfo.primaryAddress.mailingAddress2,
      applicantInfoPrimaryMailingCity: req.body.applicantInfo.primaryAddress.mailingCity,
      applicantInfoPrimaryMailingState: req.body.applicantInfo.primaryAddress.mailingState,
      applicantInfoPrimaryMailingZIP: req.body.applicantInfo.primaryAddress.mailingZIP,
      applicantInfoSecondaryMailingAddress: req.body.applicantInfo.secondaryAddress.mailingAddress,
      applicantInfoSecondaryMailingAddress2: req.body.applicantInfo.secondaryAddress.mailingAddress2,
      applicantInfoSecondaryMailingCity: req.body.applicantInfo.secondaryAddress.mailingCity,
      applicantInfoSecondaryMailingState: req.body.applicantInfo.secondaryAddress.mailingState,
      applicantInfoSecondaryMailingZIP: req.body.applicantInfo.secondaryAddress.mailingZIP,
      applicantInfoOrganizationName: req.body.applicantInfo.organizationName,
      applicantInfoWebsite: req.body.applicantInfo.website,
      applicantInfoOrgType: req.body.applicantInfo.orgType,
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
      noncommercialFieldsNumberParticipants: req.body.noncommercialFields.numParticipants
    }).then((noncommApp) => {
      req.body['applicationId'] = noncommApp.applicationId;
      res.status(201).json(req.body);
    }).error((err) => {
      res.status(500).json(err);
    });
  }
};

let getAllApps = (req, res) => {
  NoncommercialApplication.findAll().then(allApps => {
    res.status(200).json(allApps);
  });
};

// POST /permits/applications/special-uses/noncommercial/
// creates a new noncommercial application
app.post('/permits/applications/special-uses/noncommercial', createNoncommercialTempApp);

// PUT /permits/applications/special-uses/noncommercial/:tempControlNumber
// updates an existing noncommercial application
// may not be able to update everything wholesale due to possible field audit requirements

// GET /permits/applications/special-uses/noncommercial/:tempControlNumber
// retrieve an existing noncommercial application

// GET /permits/applications
// retrieves all applications in the system
app.get('/permits/applications', getAllApps);


app.listen(8080);

module.exports = app;
