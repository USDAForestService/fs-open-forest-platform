/**
 * Module for various utility functions and constants
 * @module services/util
 */

const AWS = require('aws-sdk');
const crypto = require('crypto');
const moment = require('moment');
const request = require('request-promise-native');
const Sequelize = require('sequelize');
const Util = require('util');
const xml2js = require('xml2js');

const dbConfig = require('../../.sequelize.js');
const vcapConstants = require('../vcap-constants.es6');
const logger = require('../services/logger.es6');

const util = {};

util.ADMIN_ROLE = 'admin';
util.USER_ROLE = 'user';

/**
* @function noncommercialOrgTypes - Enum for noncommercial application permit organization types.
* @return {array} - organization types array
*/
util.noncommercialOrgTypes = ['Person', 'Corporation'];

/**
* @function datetimeFormat - UTC date format required by the middle layer API
* @return {string} - UTC date format
*/
util.datetimeFormat = 'YYYY-MM-DDTHH:mm:ssZ';

/**
* @function stateCodes - Enum for state codes.
* @return {array} - US states array
*/
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


/**
* enum stateAndPossessionCodes - Enum for state and possession codes.
* @readonly
* @enum {string}
*/
util.stateAndPossessionCodes = [
  'AK',
  'AL',
  'AS',
  'AR',
  'AZ',
  'CA',
  'CO',
  'CT',
  'DC',
  'DE',
  'FM',
  'FL',
  'GA',
  'GU',
  'HI',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MH',
  'MD',
  'MA',
  'MI',
  'MN',
  'MS',
  'MO',
  'MT',
  'NE',
  'NV',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NC',
  'ND',
  'MP',
  'OH',
  'OK',
  'OR',
  'PW',
  'PA',
  'PR',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VI',
  'VA',
  'WA',
  'WV',
  'WI',
  'WY'
];


/**
* @function statusOptions - Enum for permit application status.
* @return {array} - array of application statuses
*/
util.statusOptions = ['Submitted', 'Incomplete', 'Hold', 'Review', 'Cancelled', 'Accepted', 'Rejected', 'Expired'];

/**
 * @function validateDateTime - Validate a UTC datetime string.
 * @return {boolean} - datetime string validity
 */
util.validateDateTime = input => (
  /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)/.test(input)
    && moment(input, util.datetimeFormat).isValid()
);

/**
 * @function getSequelizeConnection - Get a sequelize connection.
 * @return {Object} - Sequelize database connection object
 */
util.getSequelizeConnection = () => new Sequelize(dbConfig);

/**
 * @function middleLayerAuth - Authenticate to the middle layer.
 * @return {Object} - http request
 */
util.middleLayerAuth = () => {
  const requestOptions = {
    method: 'POST',
    url: `${vcapConstants.MIDDLE_LAYER_BASE_URL}auth`,
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
 * @function getExtension - Get the extension from a file name.
 * @param {string} filename - filename
 * @return {string} - extension from the filename
 */
const getExtension = filename => filename.split('.').reverse()[0];

/**
 * @function getContentType - Get the content type based on a file name.
 * @param {string} filename - filename
 * @return {string} - content type for the given file
 */
util.getContentType = (filename) => {
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
  return null;
};

/**
 * @function isProduction - is production flag
 * @return {boolean} - NODE_ENV is production
 */
util.isProduction = () => process.env.NODE_ENV === 'production';

/**
 * @function setAuthEmail - Set the request body's authenticated email based on the passport user.
 * @param {Object} req - http request
 */
util.setAuthEmail = (req) => {
  req.body.authEmail = req.user.email;
};

/**
 * @function hasPermissions - Check that a user has permissions to view a permit application.
 * @param {Object} user - user Object
 * @param {Object} applicationModel - application object
 * @return {boolean} - is user admin or application created user
 */
util.hasPermissions = (user, applicationModel) => user.role === util.ADMIN_ROLE || user.email === applicationModel.authEmail;

/**
 * @function camelCaseToRegularForm - Convert a camel case string to regular form.
 * @param {string} string - string input
 * @return {string} - converted string
 */
util.camelCaseToRegularForm = (string) => {
  const spaced = string.replace(/([A-Z])/g, ' $1');
  const lowerCase = spaced.toLowerCase();
  return lowerCase.charAt(0).toUpperCase() + lowerCase.slice(1);
};

/**
 * @function businessNameElsePersonalName - Get the business name or personal name
 * based on the data in the permit application.
 * @param {Object} application - application object
 * @return {string} - business name out of application
 */
util.businessNameElsePersonalName = (application) => {
  let businessName = application.applicantInfoOrganizationName;
  if (!businessName) {
    businessName = `${application.applicantInfoPrimaryFirstName} ${application.applicantInfoPrimaryLastName}`;
  }
  return businessName;
};

/**
 * @function userApplicationUrl - Get the user's application URL
 * based on the data in the permit application.
 * @param {Object} application - application object
 * @return {string} - application url
 */
util.userApplicationLink = (application, plainText) => {
  let applicationType = application.type;
  if (application.type === 'tempOutfitters') {
    applicationType = 'temp-outfitter'; // for resolving url
  }
  const applicationID = application.appControlNumber;
  const applicationStatus = application.status;

  let status;
  switch (applicationStatus) {
    case 'Accepted':
      status = 'accepted application';
      break;
    case 'Hold':
      status = 'application which needs additional information';
      break;
    case 'Review':
      status = 'application which is under review';
      break;
    case 'Cancelled':
      status = 'cancelled application';
      break;
    case 'Submitted':
      status = 'submitted application';
      break;
    default:
      status = 'application';
      break;
  }
  let text;
  if (plainText === true) {
    text = `You can view your ${status} here`;
  } else {
    text = `View your ${status} here`;
  }
  const url = `${vcapConstants.INTAKE_CLIENT_BASE_URL}/user/applications/${applicationType}/${applicationID}`;
  return { text, url };
};

/**
 * @function adminApplicationUrl - Get the user's application URL
 * based on the data in the permit application.
 * @param {Object} application - application object
 * @return {string} - application url
*/
util.adminApplicationLink = (application, plainText) => {
  let applicationType = application.type;
  if (application.type === 'tempOutfitters') {
    applicationType = 'temp-outfitter'; // for resolving url
  }
  const applicationID = application.appControlNumber;
  const applicationStatus = application.status;

  let status;
  switch (applicationStatus) {
    case 'Accepted':
      status = 'accepted application';
      break;
    case 'Hold':
      status = 'application which needs additional information';
      break;
    case 'Review':
      status = 'application which is under review';
      break;
    case 'Cancelled':
      status = 'cancelled application';
      break;
    case 'Submitted':
      status = 'submitted application';
      break;
    default:
      status = 'application';
      break;
  }
  let text;
  if (plainText === true) {
    text = `You can view the ${status} here`;
  } else {
    text = `View the ${status} here`;
  }
  const url = `${vcapConstants.INTAKE_CLIENT_BASE_URL}/admin/applications/${applicationType}/${applicationID}`;
  return { text, url };
};

/**
 * @function getRandomString - Create a random hex string.
 * @param {integer} length - random string to be length
 * @return {string} - random string
 */
util.getRandomString = length => crypto.randomBytes(length).toString('hex');

/**
 * @function getAdminForests - Get the assigned forests to the christmas trees forest admins by email address
 * @param {string} adminUsername - admin username
 * @return {array} - assigned forests for the given user
 */
util.getAdminForests = (adminUsername) => {
  const user = vcapConstants.EAUTH_USER_SAFELIST.find(element => element.admin_username === adminUsername);
  if (user && user.forests) {
    return user.forests;
  }
  return [];
};

util.getForestsByRegion = (region, forests) => {
  const regionForests = [];
  if (forests) {
    for (let i = 0; i < forests.length; i += 1) {
      if (forests[i] && forests[i].region === region) {
        regionForests.push(forests[i].forestAbbr);
      }
    }
  }
  return regionForests;
};


/**
 * Return an array of forests (short names) that are parsed out from the provided eAuth approles string
 *
*/
util.getEauthForests = (approles, forestsData) => {
  // split the roles from one long string into an array of roles
  const roles = approles.split('^');
  let forests = [];
  let forest = '';

  // check each role for a forest
  for (let i = 0; i < roles.length; i += 1) {
    if (roles[i].includes('FS_Open-Forest_R')) {
      const region = parseInt(roles[i].replace('FS_Open-Forest_R', ''), 10);
      forests = util.getForestsByRegion(region, forestsData);
    } else if (['FS_Open-Forest', 'FS_OpenForest'].some(role => roles[i].includes(role))) {
      // strip the role down to just a forest
      forest = roles[i].replace('-POC2', '')
        .replace('_POC2', '')
        .replace('-POC1', '')
        .replace('_POC1', '')
        .replace('-POC', '')
        .replace('_POC', '')
        .replace('SuperUser', '')
        .replace('Super-User', '')
        .replace('Regional', '')
        .replace('FS_Open-Forest_', '')
        .replace('FS_OpenForest_', '');
      // if we found a forest in the role, add it to the forests array
      if (forest.length > 0) {
        forests.push(forest);
      }
    }
  }

  // if the user is a superuser return all forests
  if (approles.includes('Super')) {
    forests = ['all'];
  }

  return [...new Set(forests)];
};


/**
 * Return an array of POC2 forests (short names) from the provided eAuth approles string
 *
*/
util.getPOC2Forests = (approles, forestsData) => {
  // split the roles from one long string into an array of roles
  const roles = approles.split('^');
  let forests = [];
  let forest = '';

  // check each role for a forest
  for (let i = 0; i < roles.length; i += 1) {
    if (roles[i].includes('FS_Open-Forest_R')) {
      const region = parseInt(roles[i].replace('FS_Open-Forest_R', ''), 10);
      forests = util.getForestsByRegion(region, forestsData);
    } else if (['POC1', 'POC2'].some(role => roles[i].includes(role))) {
      // strip the role down to just a forest
      forest = roles[i].replace('-POC2', '')
        .replace('_POC2', '')
        .replace('-POC1', '')
        .replace('_POC1', '')
        .replace('-POC', '')
        .replace('_POC', '')
        .replace('FS_Open-Forest_', '')
        .replace('FS_OpenForest_', '');
      // if we found a forest in the role, add it to the forests array
      if (forest.length > 0) {
        forests.push(forest);
      }
    }
  }

  // if the user is a superuser return all forests
  if (approles.includes('Super')) {
    forests = ['all'];
  }

  return [...new Set(forests)];
};

/**
 * Return an array of POC1 forests (short names) from the provided eAuth approles string
 *
*/
util.getPOC1Forests = (approles, forestsData) => {
  // split the roles from one long string into an array of roles
  const roles = approles.split('^');
  let forests = [];
  let forest = '';

  // check each role for a forest
  for (let i = 0; i < roles.length; i += 1) {
    if (roles[i].includes('FS_Open-Forest_R')) {
      const region = parseInt(roles[i].replace('FS_Open-Forest_R', ''), 10);
      forests = util.getForestsByRegion(region, forestsData);
    } else if (roles[i].includes('POC1')) {
      // strip the role down to just a forest
      forest = roles[i].replace('-POC2', '')
        .replace('_POC2', '')
        .replace('-POC1', '')
        .replace('_POC1', '')
        .replace('-POC', '')
        .replace('_POC', '')
        .replace('FS_Open-Forest_', '')
        .replace('FS_OpenForest_', '');
      // if we found a forest in the role, add it to the forests array
      if (forest.length > 0) {
        forests.push(forest);
      }
    }
  }

  // if the user is a superuser return all forests
  if (approles.includes('Super')) {
    forests = ['all'];
  }

  return [...new Set(forests)];
};

/**
* @function getUserRole - Check if the given user is admin, return user role if not find
* @param {string} adminUsername - admin user name
* @return {string} - user role ADMIN or USER
*/
util.getUserRole = (approles) => {
  let role = 'user';
  const roles = approles.split('^');
  for (let i = 0; i < roles.length; i += 1) {
    if (roles[i].includes('FS_Open-Forest_R')
    || roles[i].includes('Super')
    || roles[i].includes('POC1')
    || roles[i].includes('POC2')) {
      role = 'admin';
    }
  }
  return role;
};

/**
* @function handleErrorResponse - Handle database errors with http response
* @param {Object} error - error object from sequelize error
* @param {Object} res - http response
* @return {Object} - http response
*/
util.handleErrorResponse = (error, res, method) => {
  if (error !== {} && error !== 'null') {
    let inFile = '';
    if (error.fileName) {
      inFile = `in ${error.fileName}`;
      if (error.lineNumber) {
        inFile = `${inFile} at ${error.lineNumber}`;
      }
    }
    logger.error(`ERROR: ServerError: ${error}${inFile} from ${method}`);
  } else {
    logger.error(`ERROR: ServerError: Unknown error 500 from ${method}`);
  }
  if (error.name === 'SequelizeValidationError') {
    return res.status(400).json({
      errors: error.errors
    });
  } if (error.name === 'SequelizeDatabaseError') {
    return res.status(404).send();
  }
  return res.status(500).send();
};

/**
* @function logControllerAction - logs a controller action
* @param {Object} req - http request
* @param {Object} file - what file called the logger
* @param {Object} applicationOrPermit - what the permit object is
*/
util.logControllerAction = (req, controller, applicationOrPermit) => {
  let eventTime;
  if (req.method === 'PUT') {
    eventTime = applicationOrPermit.updatedAt;
  } else {
    eventTime = applicationOrPermit.createdAt;
  }

  let userID;
  let role;
  let permitID;
  const subPath = controller.split('.');
  if (subPath[0] === 'christmasTreePermits') {
    userID = applicationOrPermit.emailAddress;
    role = 'PUBLIC';
    permitID = applicationOrPermit.permitId;
  } else {
    // userID = req.user.email;
    // role = util.getUserRole(req);
    permitID = applicationOrPermit.applicationId;
  }

  logger.info(`CONTROLLER: ${req.method}:${controller} by ${userID}:${role} for ${permitID} at ${eventTime}`);
};

util.request = request;

/**
 * @function getS3 - get S3 credentials
 * @return {Object} - AWS S3 object with credentials
 */
util.getS3 = () => new AWS.S3({
  region: vcapConstants.REGION,
  accessKeyId: vcapConstants.accessKeyId,
  secretAccessKey: vcapConstants.secretAccessKey
});

util.parseXml = Util.promisify(xml2js.parseString);

util.logPaygov = (event, params) => {
  logger.info(`PAYGOV: ${event} - ${JSON.stringify(params)}`);
};

module.exports = util;
