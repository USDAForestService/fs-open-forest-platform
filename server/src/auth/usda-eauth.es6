/**
 * Module for USDA eAuth integration
 * @module auth/usda-eauth
 */

const SamlStrategy = require('passport-saml').Strategy;
const vcapConstants = require('../vcap-constants.es6');
const util = require('../services/util.es6');
const logger = require('../services/logger.es6');

const eAuth = {};

const forestsData = [
   {
      "id":1,
      "forestName":"Arapaho and Roosevelt National Forests",
      "forestNameShort":"Arapaho and Roosevelt",
      "description":"Arapaho & Roosevelt | Colorado",
      "forestAbbr":"arp",
      "startDate":"2019-11-01T07:00:00.000Z",
      "endDate":"2020-01-06T07:59:59.000Z",
      "timezone":"America/Denver",
      "state":"Colorado",
      "region":2
   },
   {
      "id":2,
      "forestName":"Flathead National Forest",
      "forestNameShort":"Flathead",
      "description":"Flathead | Montana",
      "forestAbbr":"flathead",
      "startDate":"2019-11-15T07:00:00.000Z",
      "endDate":"2019-12-31T07:59:59.000Z",
      "timezone":"America/Denver",
      "state":"Montana",
      "region":1
   },
   {
      "id":3,
      "forestName":"Mt. Hood National Forest",
      "forestNameShort":"Mt. Hood",
      "description":"Mt. Hood | Oregon",
      "forestAbbr":"mthood",
      "startDate":"2019-11-14T08:00:00.000Z",
      "endDate":"2019-12-24T08:59:59.000Z",
      "timezone":"America/Los_Angeles",
      "state":"Oregon",
      "region":6
   },
   {
      "id":4,
      "forestName":"Shoshone National Forest",
      "forestNameShort":"Shoshone",
      "description":"Shoshone | Wyoming",
      "forestAbbr":"shoshone",
      "startDate":"2019-11-18T07:00:00.000Z",
      "endDate":"2019-12-30T07:59:59.000Z",
      "timezone":"America/Denver",
      "state":"Wyoming",
      "region":2
   },
   {
      "id":5,
      "forestName":"Gifford Pinchot National Forest",
      "forestNameShort":"Gifford Pinchot",
      "description":"Gifford Pinchot | Washington",
      "forestAbbr":"giffordpinchot",
      "startDate":"2019-11-14T08:00:00.000Z",
      "endDate":"2019-12-31T08:59:59.000Z",
      "timezone":"America/Vancouver",
      "state":"Washington",
      "region":6
   },
   {
      "id":6,
      "forestName":"Fremont-Winema National Forest",
      "forestNameShort":"Fremont-Winema",
      "description":"Fremont-Winema | Oregon",
      "forestAbbr":"fremont-winema",
      "startDate":"2019-11-01T08:00:00.000Z",
      "endDate":"2019-12-25T08:59:59.000Z",
      "timezone":"America/Vancouver",
      "state":"Oregon",
      "region":6
   },
   {
      "id":7,
      "forestName":"Mt. Baker-Snoqualmie National Forest",
      "forestNameShort":"Mt. Baker-Snoqualmie",
      "description":"Mt. Baker-Snoqualmie | Washington",
      "forestAbbr":"mbs",
      "startDate":"2019-11-12T08:00:00.000Z",
      "endDate":"2019-12-30T08:59:59.000Z",
      "timezone":"America/Vancouver",
      "state":"Washington",
      "region":6
   },
   {
      "id":8,
      "forestName":"Deschutes National Forest",
      "forestNameShort":"Deschutes",
      "description":"Deschutes | Oregon",
      "forestAbbr":"deschutes",
      "startDate":"2019-11-18T08:00:00.000Z",
      "endDate":"2019-12-25T08:59:59.000Z",
      "timezone":"America/Vancouver",
      "state":"Oregon",
      "region":6
   },
   {
      "id":9,
      "forestName":"Willamette National Forest ",
      "forestNameShort":"Willamette",
      "description":"Willamette | Oregon",
      "forestAbbr":"willamette",
      "startDate":"2019-11-12T08:00:00.000Z",
      "endDate":"2020-01-06T08:59:59.000Z",
      "timezone":"America/Vancouver",
      "state":"Oregon",
      "region":6
   },
   {
      "id":10,
      "forestName":"Rogue River-Siskiyou National Forest ",
      "forestNameShort":"Rogue River-Siskiyou",
      "description":"Rogue River-Siskiyou | Oregon",
      "forestAbbr":"rrs",
      "startDate":"2019-11-08T08:00:00.000Z",
      "endDate":"2019-12-25T08:59:59.000Z",
      "timezone":"America/Vancouver",
      "state":"Oregon and California",
      "region":6
   },
   {
      "id":11,
      "forestName":"Okanogan-Wenatchee National Forest",
      "forestNameShort":"Okanogan-Wenatchee",
      "description":"Okanogan-Wenatchee | Washington",
      "forestAbbr":"okawen",
      "startDate":"2019-11-01T08:00:00.000Z",
      "endDate":"2019-12-31T08:59:59.000Z",
      "timezone":"America/Vancouver",
      "state":"Washington",
      "region":6
   },
   {
      "id":12,
      "forestName":"Umatilla National Forest",
      "forestNameShort":"Umatilla",
      "description":"Umatilla | Oregon",
      "forestAbbr":"umatilla",
      "startDate":"2019-11-18T08:00:00.000Z",
      "endDate":"2019-12-31T08:59:59.000Z",
      "timezone":"America/Vancouver",
      "state":"Oregon and Washington",
      "region":6
   },
   {
      "id":13,
      "forestName":"Ochoco National Forest",
      "forestNameShort":"Ochoco",
      "description":"Ochoco | Oregon",
      "forestAbbr":"ochoco",
      "startDate":"2019-11-18T08:00:00.000Z",
      "endDate":"2019-12-25T08:59:59.000Z",
      "timezone":"America/Vancouver",
      "state":"Oregon",
      "region":6
   }
];

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
eAuth.setUserObject = (profile) => {
  // profile.usdaemail does not return for every users, so we create an ID from first and last names
  let adminUsername = '';
  let role = 'user';
  let email = '';
  let approles = '';
  let adminUserObject = {};

  if (profile.usdafirstname && profile.usdalastname) {
    adminUsername = `${profile.usdafirstname}_${profile.usdalastname}`.toUpperCase().replace(/\s/g, '_');
  }

  if (profile.usdaapproles) {
    approles = `${profile.usdaapproles}`;
  }

  email = profile.usdaemail && profile.usdaemail !== 'EEMSCERT@ftc.usda.gov' ? profile.usdaemail : '';
  role = util.getUserRole(approles);
  adminUserObject = {
    adminUsername: role === 'admin' ? adminUsername : '',
    email,
    role,
    poc1_forests: util.getPOC1Forests(approles, forestsData),
    poc2_forests: util.getPOC2Forests(approles, forestsData),
    forests: util.getEauthForests(approles, forestsData)
  };

  logger.info(`APP ROLES : ${approles}`);
  logger.info(`AUTHENTICATION: ${adminUserObject.role.toUpperCase()}: ${adminUsername} has logged in via USDA eAuth.`);
  return adminUserObject;
};

module.exports = eAuth;
