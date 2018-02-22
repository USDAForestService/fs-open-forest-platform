'use strict';

/**
 * Module for various utility functions and constants
 * @module util
 */

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
    url: vcapConstants.middleLayerBaseUrl + 'auth',
    json: true,
    simple: true,
    body: {
      username: vcapConstants.middleLayerUsername,
      password: vcapConstants.middleLayerPassword
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
  return vcapConstants.nodeEnv === 'production';
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
      email: 'test@test.com',
      role: util.ADMIN_ROLE,
      forests: util.getAdminForests('test@test.com')
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
util.getAdminForests = emailAddress => {
  const user = vcapConstants.eAuthUserWhiteList.find(element => element.user_email === emailAddress);
  if (user && user.forests) {
    return user.forests;
  } else {
    return [];
  }
};

util.getUserRole = emailAddress => {
  return vcapConstants.eAuthUserWhiteList.find(element => element.user_email === emailAddress) ? util.ADMIN_ROLE :
    util.USER_ROLE;
};

util.request = request;

/**
 * Various utility functions and constants
 * @exports util
 */
module.exports = util;
