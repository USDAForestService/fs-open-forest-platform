/**
 * Module for login.gov integration
 * @module auth/login-gov
 */

const openIdClient = require('openid-client');
const jose = require('node-jose');
const { Strategy } = require('openid-client');
const url = require('url');
const util = require('../services/util.es6');
const vcapConstants = require('../vcap-constants.es6');
const logger = require('../services/logger.es6');

const POST_LOGOUT_REDIRECT_URI = encodeURIComponent(`${vcapConstants.BASE_URL}/auth/login-gov/openid/logout`);

const loginGov = {};

// Basic auth is needed for the int version of login.gov.
const basicAuthOptions = {};
if (vcapConstants.LOGIN_GOV_IDP_USERNAME && vcapConstants.LOGIN_GOV_IDP_PASSWORD) {
  basicAuthOptions.headers = {
    Host: url.parse(vcapConstants.LOGIN_GOV_BASE_URL).hostname,
    Authorization: `Basic ${
      Buffer.from(`${vcapConstants.LOGIN_GOV_IDP_USERNAME}:${vcapConstants.LOGIN_GOV_IDP_PASSWORD}`).toString('base64')}`
  };
}

// Settings for the passport OpenIDConnectStrategy.
loginGov.params = {
  acr_values: 'http://idmanagement.gov/ns/assurance/loa/1',
  nonce: util.getRandomString(32),
  prompt: 'select_account',
  redirect_uri: `${vcapConstants.BASE_URL}/auth/login-gov/openid/callback`,
  response_type: 'code',
  scope: 'openid email',
  state: util.getRandomString(32)
};

/**
 * @function setup - Setup the passport OpenIDConnectStrategy.
 */
loginGov.setup = (name, passport) => {
  logger.info('AUTHENTICATION: Login.gov passport.js middlelayer OpenIDConnectStrategy initiated.');
  openIdClient.Issuer.defaultHttpOptions = basicAuthOptions;
  // issuer discovery
  openIdClient.Issuer.discover(`${vcapConstants.LOGIN_GOV_BASE_URL}.well-known/openid-configuration`)
    .then((loginGovIssuer) => {
      loginGov.issuer = loginGovIssuer;
      const keys = {
        keys: [vcapConstants.LOGIN_GOV_JWK]
      };
      // a joseKeystore is required by openid-client
      jose.JWK.asKeyStore(keys).then((joseKeystore) => {
        const client = new loginGovIssuer.Client({
          client_id: vcapConstants.LOGIN_GOV_ISSUER,
          token_endpoint_auth_method: 'private_key_jwt',
          id_token_signed_response_alg: 'RS256'
        },
        joseKeystore);
        // instantiate the passport strategy
        passport.use(
          name,
          new Strategy({
            client,
            params: loginGov.params
          }, (tokenset, done) => {
            logger.info(`AUTHENTICATION: Login.gov user ${tokenset.claims.email} logged in.`);
            return done(null, {
              email: tokenset.claims.email,
              role: 'user',
              // the token is required to logout of login.gov
              token: tokenset.id_token
            });
          })
        );
      });
    })
    .catch((e) => {
      logger.error(`ERROR: ServerError: AUTHENTICATION- ${e}`);
      throw new Error(e);
    });
};

loginGov.logoutUrl = token => [
  loginGov.issuer.end_session_endpoint,
  `?post_logout_redirect_uri=${POST_LOGOUT_REDIRECT_URI}`,
  `&state=${loginGov.params.state}`,
  `&id_token_hint=${token}`
].join('');

module.exports = loginGov;
