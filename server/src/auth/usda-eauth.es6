/**
 * Module for USDA eAuth integration
 * @module auth/usda-eauth
 */

const SamlStrategy = require('passport-saml').Strategy;
const vcapConstants = require('../vcap-constants.es6');
const util = require('../services/util.es6');
const logger = require('../services/logger.es6');
const treesDb = require('../models/trees-db.es6');

const eAuth = {};

// Instantiate the passport SamlStrategy
eAuth.strategy = () => new SamlStrategy(
  {
    path: '/auth/usda-eauth/saml/callback',
    entryPoint: `${vcapConstants.EAUTH_ENTRY_POINT}?SPID=${vcapConstants.EAUTH_ISSUER}`,
    issuer: vcapConstants.EAUTH_ISSUER,
    privateCert: vcapConstants.EAUTH_PRIVATE_KEY,
    cert: vcapConstants.EAUTH_CERT,
    identifierFormat: vcapConstants.EAUTH_IDENTIFIER_FORMAT || undefined,
    disableRequestedAuthnContext: vcapConstants.EAUTH_DISABLE_AUTHN_CONTEXT || undefined
  },
  (profile, done) => done(null, eAuth.setUserObject(profile))
);

// router for eAuth specific endpoints

/**
 * @function setUserObject - set user profile in the eAuth authentication response
 * @param {Object} profile
 */
eAuth.setUserObject = async (profile) => {
  // profile.usdaemail does not return for every users, so we create an ID from first and last names
  let adminUsername = '';
  let role = 'user';
  let email = '';
  let approles = '';
  let forestsData = [];
  let adminUserObject = {};

  if (profile.usdafirstname && profile.usdalastname) {
    adminUsername = `${profile.usdafirstname}_${profile.usdalastname}`.toUpperCase().replace(/\s/g, '_');
  }
  if (profile.usdaapproles) {
    approles = `${profile.usdaapproles}`;
  }
  email = profile.usdaemail && profile.usdaemail !== 'EEMSCERT@ftc.usda.gov' ? profile.usdaemail : '';

  try {
    forestsData = await treesDb.christmasTreesForests.findAll();
    role = util.getUserRole(approles);
    adminUserObject = {
      adminUsername: role === 'admin' ? adminUsername : '',
      email,
      role,
      poc1_forests: util.getPOC1Forests(approles, forestsData),
      poc2_forests: util.getPOC2Forests(approles, forestsData),
      forests: util.getEauthForests(approles, forestsData)
    };
    return adminUserObject;
  } catch (error) {
    console.log(error);
    return adminUserObject;
  }
  logger.info(`APP ROLES : ${approles}`);
  logger.info(`AUTHENTICATION: ${adminUserObject.role.toUpperCase()}: ${adminUsername} has logged in via USDA eAuth.`);
};

module.exports = eAuth;
