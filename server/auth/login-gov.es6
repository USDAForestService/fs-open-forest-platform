'use strict';

let express = require('express');
let Issuer = require('openid-client').Issuer;
let jose = require('node-jose');
let passport = require('passport');
let OpenIDConnectStrategy = require('openid-client').Strategy;
let vcapServices = require('../vcap-services.es6');

let loginGov = {};

let basicAuthOptions = {
  headers: {
    Host: 'idp.int.login.gov',
    Authorization:
      'Basic ' +
      new Buffer(vcapServices.loginGovIdpUsername + ':' + vcapServices.loginGovIdpPassword).toString('base64')
  }
};

const params = {
  acr_values: 'http://idmanagement.gov/ns/assurance/loa/1',
  nonce: new Buffer(`${Math.random()}${Math.random()}`).toString('hex'),
  prompt: 'select_account',
  redirect_uri: vcapServices.baseUrl + '/auth/login-gov/openid/callback',
  response_type: 'code',
  scope: 'openid email',
  state: new Buffer(`${Math.random()}${Math.random()}`).toString('hex')
};

loginGov.setup = () => {
  Issuer.defaultHttpOptions = basicAuthOptions;
  Issuer.discover('https://idp.int.login.gov/.well-known/openid-configuration').then(loginGovIssuer => {
    let keys = {
      keys: [vcapServices.loginGovJwk]
    };
    jose.JWK.asKeyStore(keys).then(joseKeystore => {
      let client = new loginGovIssuer.Client(
        {
          client_id: vcapServices.loginGovIssuer,
          token_endpoint_auth_method: 'private_key_jwt',
          id_token_signed_response_alg: 'RS256'
        },
        joseKeystore
      );
      passport.use(
        'oidc',
        new OpenIDConnectStrategy(
          {
            client,
            params
          },
          (tokenset, done) => {
            return done(null, {
              email: tokenset.claims.email,
              role: 'user'
            });
          }
        )
      );
    });
  });
  return passport;
};

loginGov.router = express.Router();

loginGov.router.get('/auth/login-gov/openid/login', passport.authenticate('oidc'));

loginGov.router.get('/auth/login-gov/openid/callback', passport.authenticate('oidc'), (req, res) => {
  res.redirect(vcapServices.intakeClientBaseUrl);
});

module.exports = loginGov;
