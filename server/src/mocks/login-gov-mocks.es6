'use strict';

const express = require('express');
const middleware = require('../middleware.es6');

const loginGovMocks = {};
/**
 * Mock login.gov discovery url
 */
loginGovMocks.router = express.Router();
loginGovMocks.router.get(
  '/mocks/login-gov/discovery-url/.well-known/openid-configuration',
  middleware.setCorsHeaders,
  function(req, res) {
    return res.send({
      acr_values_supported: [
        'http://idmanagement.gov/ns/assurance/loa/1',
        'http://idmanagement.gov/ns/assurance/loa/3'
      ],
      claims_supported: [
        'iss',
        'sub',
        'email',
        'email_verified',
        'address',
        'phone',
        'phone_verified',
        'given_name',
        'family_name',
        'birthdate',
        'social_security_number'
      ],
      grant_types_supported: ['authorization_code'],
      response_types_supported: ['code'],
      scopes_supported: [
        'address',
        'email',
        'openid',
        'phone',
        'profile',
        'profile:birthdate',
        'profile:name',
        'social_security_number'
      ],
      subject_types_supported: ['pairwise'],
      authorization_endpoint: 'https://secure.login.gov/openid_connect/authorize',
      issuer: 'https://secure.login.gov/',
      jwks_uri: 'https://secure.login.gov/api/openid_connect/certs',
      service_documentation: 'https://pages.18f.gov/identity-dev-docs/',
      token_endpoint: 'https://secure.login.gov/api/openid_connect/token',
      userinfo_endpoint: 'https://secure.login.gov/api/openid_connect/userinfo',
      end_session_endpoint: 'https://secure.login.gov/openid_connect/logout',
      id_token_signing_alg_values_supported: ['RS256'],
      token_endpoint_auth_methods_supported: ['private_key_jwt'],
      token_endpoint_auth_signing_alg_values_supported: ['RS256']
    });
  }
);

module.exports = loginGovMocks;
