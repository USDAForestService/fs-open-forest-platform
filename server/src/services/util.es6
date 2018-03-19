'use strict';

/**
 * Module for various utility functions and constants
 * @module services/util
 */

const AWS = require('aws-sdk');
const crypto = require('crypto');
const moment = require('moment');
const request = require('request-promise');
const Sequelize = require('sequelize');

const dbConfig = require('../../.sequelize.js');
const vcapConstants = require('../vcap-constants.es6');

let util = {};

util.ADMIN_ROLE = 'admin';
util.USER_ROLE = 'user';

/**  Enum for noncommercial application permit organization types. */
util.noncommercialOrgTypes = ['Person', 'Corporation'];

/**  UTC date format required by the middle layer API */
util.datetimeFormat = 'YYYY-MM-DDTHH:mm:ssZ';

/**  Enum for state codes. */
util.stateCodes = [
  'AK',
  'AL',
  'AR',
  'AZ',
  'CA',
  'CO',
  'CT',
  'DE',
  'FL',
  'GA',
  'HI',
  'IA',
  'ID',
  'IL',
  'IN',
  'KS',
  'KY',
  'LA',
  'MA',
  'MD',
  'ME',
  'MI',
  'MN',
  'MO',
  'MS',
  'MT',
  'NC',
  'ND',
  'NE',
  'NH',
  'NJ',
  'NM',
  'NV',
  'NY',
  'OH',
  'OK',
  'OR',
  'PA',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VA',
  'VT',
  'WA',
  'WI',
  'WV',
  'WY'
];

/**  Enum for permit application status. */
util.statusOptions = ['Submitted', 'Incomplete', 'Hold', 'Review', 'Cancelled', 'Accepted', 'Rejected', 'Expired'];

/**
 * Validate a UTC datetime string.
 */
util.validateDateTime = input => {
  return (
    /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)/.test(input) &&
    moment(input, util.datetimeFormat).isValid()
  );
};

/**
 * Get a sequelize connection.
 */
util.getSequelizeConnection = () => {
  return new Sequelize(dbConfig);
};

/**
 * Authenticate to the middle layer.
 */
util.middleLayerAuth = () => {
  const requestOptions = {
    method: 'POST',
    url: vcapConstants.MIDDLE_LAYER_BASE_URL + 'auth',
    json: true,
    simple: true,
    body: {
      username: vcapConstants.MIDDLE_LAYER_USERNAME,
      password: vcapConstants.MIDDLE_LAYER_PASSWORD
    },
    transform: body => body.token
  };
  return util.request(requestOptions);
};

/**
 * Get the extension from a file name.
 */
const getExtension = filename => {
  return filename.split('.').reverse()[0];
};

/**
 * Get the content type based on a file name.
 */
util.getContentType = filename => {
  if (getExtension(filename) === 'pdf') {
    return 'application/pdf';
  }
  if (getExtension(filename) === 'rtf') {
    return 'application/rtf';
  }
  if (getExtension(filename) === 'doc') {
    return 'application/msword';
  }
  if (getExtension(filename) === 'docx') {
    return 'application/msword';
  }
  if (getExtension(filename) === 'xls') {
    return 'application/vnd.ms-excel';
  }
  if (getExtension(filename) === 'xlsx') {
    return 'application/vnd.ms-excel';
  }
};

/**
 * Check for testing environment.
 */
util.isLocalOrCI = () => {
  return vcapConstants.isLocalOrCI;
};

/**
 * is production flag
 */
util.isProduction = () => {
  return process.env.NODE_ENV === 'production';
};

/**
 * is staging flag
 */
util.isStaging = () => {
  return process.env.NODE_ENV === 'staging';
};

/**
 * Set the request body's authenticated email based on the passport user.
 */
util.setAuthEmail = req => {
  if (util.isLocalOrCI()) {
    req.body.authEmail = 'test@test.com';
  } else {
    req.body.authEmail = req.user.email;
  }
};

/**
 * Get the passport user from the request object.
 */
util.getUser = req => {
  if (util.isLocalOrCI()) {
    return {
      adminUsername: 'TEST_USER',
      email: 'test@test.com',
      role: util.ADMIN_ROLE,
      forests: util.getAdminForests('TEST_USER')
    };
  } else {
    return req.user;
  }
};

/**
 * Check that a user has permissions to view a permit application.
 */
util.hasPermissions = (user, applicationModel) => {
  return user.role === util.ADMIN_ROLE || user.email === applicationModel.authEmail;
};

/**
 * Convert a camel case string to regular form.
 */
util.camelCaseToRegularForm = string => {
  const spaced = string.replace(/([A-Z])/g, ' $1');
  const lowerCase = spaced.toLowerCase();
  return lowerCase.charAt(0).toUpperCase() + lowerCase.slice(1);
};

/**
 * Get the business name or personal name based on the data in the permit application.
 */
util.businessNameElsePersonalName = application => {
  let businessName = application.applicantInfoOrganizationName;
  if (!businessName) {
    businessName = `${application.applicantInfoPrimaryFirstName} ${application.applicantInfoPrimaryLastName}`;
  }
  return businessName;
};

/**
 * Create a random hex string.
 */
util.getRandomString = length => {
  return crypto.randomBytes(length).toString('hex');
};

/**
 * Get the assigned forests to the christmas trees forest admins by email address
 */
util.getAdminForests = adminUsername => {
  const user = vcapConstants.EAUTH_USER_SAFELIST.find(element => element.admin_username === adminUsername);
  if (user && user.forests) {
    return user.forests;
  } else {
    return [];
  }
};

util.getUserRole = adminUsername => {
  return vcapConstants.EAUTH_USER_SAFELIST.find(element => element.admin_username === adminUsername)
    ? util.ADMIN_ROLE
    : util.USER_ROLE;
};

util.handleErrorResponse = (error, res) => {
  if (error.name === 'SequelizeValidationError') {
    return res.status(400).json({
      errors: error.errors
    });
  } else if (error.name === 'SequelizeDatabaseError') {
    return res.status(404).send();
  } else {
    return res.status(500).send();
  }
};

util.request = request;

/**
 * get S3 credentials
 */
util.getS3 = () => {
  // Initialize our S3 BUCKET connection for file attachments
  // if local or CI use aws credentials
  let s3 = new AWS.S3({
    region: vcapConstants.REGION,
    accessKeyId: vcapConstants.accessKeyId,
    secretAccessKey: vcapConstants.secretAccessKey
  });
  return s3;
};

module.exports = util;
