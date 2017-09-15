'use strict';

let express = require('express');
let Issuer = require('openid-client').Issuer;
let jose = require('node-jose');
let passport = require('passport');
let OpenIDConnectStrategy = require('openid-client').Strategy;
let vcapConstants = require('../vcap-constants.es6');

let loginGov = {};

// basic auth is needed for the int version of login.gov
let basicAuthOptions = {
  headers: {
    Host: 'idp.int.login.gov',
    Authorization:
      'Basic ' +
      new Buffer(vcapConstants.loginGovIdpUsername + ':' + vcapConstants.loginGovIdpPassword).toString('base64')
  }
};

loginGov.params = {
  acr_values: 'http://idmanagement.gov/ns/assurance/loa/1',
  nonce: new Buffer(`${Math.random()}${Math.random()}`).toString('hex'),
  prompt: 'select_account',
  redirect_uri: vcapConstants.baseUrl + '/auth/login-gov/openid/callback',
  response_type: 'code',
  scope: 'openid email',
  state: new Buffer(`${Math.random()}${Math.random()}`).toString('hex')
};

loginGov.setup = () => {
  Issuer.defaultHttpOptions = basicAuthOptions;
  Issuer.discover(vcapConstants.loginGovDiscoveryUrl).then(loginGovIssuer => {
    loginGov.issuer = loginGovIssuer;
    let keys = {
      keys: [vcapConstants.loginGovJwk]
    };
    // a joseKeystore is required by openid-client
    jose.JWK.asKeyStore(keys).then(joseKeystore => {
      let client = new loginGovIssuer.Client(
        {
          client_id: vcapConstants.loginGovIssuer,
          token_endpoint_auth_method: 'private_key_jwt',
          id_token_signed_response_alg: 'RS256'
        },
        joseKeystore
      );
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
              // the token is required to logout of login.gov
              token: tokenset.id_token
            });
          }
        )
      );
    });
  });
  return passport;
};

// router for login.gov specific endpoints
loginGov.router = express.Router();

loginGov.router.get('/auth/login-gov/openid/login', passport.authenticate('oidc'));

loginGov.router.get('/auth/login-gov/openid/logout', (req, res) => {
  // destroy the session
  req.logout();
  // res.redirect doesn't pass the Blink's Content Security Policy directive
  res.send(`<script>window.location = '${vcapConstants.intakeClientBaseUrl}'</script>`);
});

loginGov.router.get(
  '/auth/login-gov/openid/callback',
  // the failureRedirect is used for a return to app link on login.gov, it's not actually an error in this case
  passport.authenticate('oidc', { failureRedirect: vcapConstants.intakeClientBaseUrl }),
  (req, res) => {
    // res.redirect doesn't pass the Blink's Content Security Policy directive
    res.send(`<script>window.location = '${vcapConstants.intakeClientBaseUrl}/logged-in'</script>`);
  }
);

module.exports = loginGov;
