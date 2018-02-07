'use strict';

/**
 * Module for login.gov integration
 * @module auth/login-gov
 */

const express = require('express');
const Issuer = require('openid-client').Issuer;
const jose = require('node-jose');
const passport = require('passport');
const OpenIDConnectStrategy = require('openid-client').Strategy;
const util = require('../util.es6');
const vcapConstants = require('../vcap-constants.es6');

const loginGov = {};

/** Basic auth is needed for the int version of login.gov. */
const basicAuthOptions = {};
if (vcapConstants.loginGovIdpUsername && vcapConstants.loginGovIdpPassword) {
  basicAuthOptions.headers = {
    Host: 'idp.int.login.gov',
    Authorization:
      'Basic ' +
      new Buffer(vcapConstants.loginGovIdpUsername + ':' + vcapConstants.loginGovIdpPassword).toString('base64')
  };
}

/** Settings for the passport OpenIDConnectStrategy. */
loginGov.params = {
  acr_values: 'http://idmanagement.gov/ns/assurance/loa/1',
  nonce: util.getRandomString(32),
  prompt: 'select_account',
  redirect_uri: vcapConstants.baseUrl + '/auth/login-gov/openid/callback',
  response_type: 'code',
  scope: 'openid email',
  state: util.getRandomString(32)
};

/**
 * Setup the passport OpenIDConnectStrategy.
 */
loginGov.setup = () => {
  Issuer.defaultHttpOptions = basicAuthOptions;
  /** issuer discovery */
  Issuer.discover(vcapConstants.loginGovDiscoveryUrl)
    .then(loginGovIssuer => {
      loginGov.issuer = loginGovIssuer;
      let keys = {
        keys: [vcapConstants.loginGovJwk]
      };
      /** a joseKeystore is required by openid-client */
      jose.JWK.asKeyStore(keys).then(joseKeystore => {
        let client = new loginGovIssuer.Client(
          {
            client_id: vcapConstants.loginGovIssuer,
            token_endpoint_auth_method: 'private_key_jwt',
            id_token_signed_response_alg: 'RS256'
          },
          joseKeystore
        );
        /** instantiate the passport strategy */
        passport.use(
          'oidc',
          new OpenIDConnectStrategy(
            {
              client: client,
              params: loginGov.params
            },
            (tokenset, done) => {
              return done(null, {
                email: tokenset.claims.email,
                role: 'user',
                /** the token is required to logout of login.gov */
                token: tokenset.id_token
              });
            }
          )
        );
      });
    })
    .catch(e => {
      throw new Error(e);
    });
};

/** router for login.gov specific endpoints */
loginGov.router = express.Router();

/**
 * Initiate authentication via login.gov.
 */
loginGov.router.get('/auth/login-gov/openid/login', passport.authenticate('oidc'));

/**
 * Initiate logging out of login.gov
 */
loginGov.router.get('/auth/login-gov/openid/logout', (req, res) => {
  /** destroy the session */
  req.logout();
  /** res.redirect doesn't pass the Blink's Content Security Policy directive */
  return res.send(`<script>window.location = '${vcapConstants.intakeClientBaseUrl}'</script>`);
});

/**
 * Callback from login.gov.
 */
loginGov.router.get(
  '/auth/login-gov/openid/callback',
  /** the failureRedirect is used for a return to app link on login.gov, it's not actually an error in this case */
  passport.authenticate('oidc', {
    failureRedirect: vcapConstants.intakeClientBaseUrl
  }),
  (req, res) => {
    /** res.redirect doesn't pass the Blink's Content Security Policy directive */
    return res.send(`<script>window.location = '${vcapConstants.intakeClientBaseUrl}/logged-in'</script>`);
  }
);

/**
 * login.gov integration
 * @exports auth/loginGov
 */
module.exports = loginGov;
