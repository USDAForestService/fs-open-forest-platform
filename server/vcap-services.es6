'use strict';

let _ = require('lodash');

const vcapConstants = {};
const VCAPServices = JSON.parse(process.env.VCAP_SERVICES);

// Intake S3
vcapConstants.accessKeyId = _.find(VCAPServices['s3'], {
  name: 'intake-s3'
}).credentials.access_key_id;
vcapConstants.secretAccessKey = _.find(VCAPServices['s3'], {
  name: 'intake-s3'
}).credentials.access_key_id;
vcapConstants.region = _.find(VCAPServices['s3'], {
  name: 'intake-s3'
}).credentials.region;
vcapConstants.bucket = _.find(VCAPServices['s3'], {
  name: 'intake-s3'
}).credentials.bucket;

// Certs S3
vcapConstants.certsAccessKeyId = _.find(VCAPServices['s3'], {
  name: 'certs'
}).credentials.access_key_id;
vcapConstants.certsSecretAccessKey = _.find(VCAPServices['s3'], {
  name: 'certs'
}).credentials.access_key_id;
vcapConstants.certsRegion = _.find(VCAPServices['s3'], {
  name: 'certs'
}).credentials.region;
vcapConstants.certsBucket = _.find(VCAPServices['s3'], {
  name: 'certs'
}).credentials.bucket;

// Middle layer
vcapConstants.middleLayerBaseUrl = _.find(VCAPServices['user-provided'], {
  name: 'middlelayer-service'
}).credentials.MIDDLELAYER_BASE_URL;
vcapConstants.middleLayerUsername = _.find(VCAPServices['user-provided'], {
  name: 'middlelayer-service'
}).credentials.MIDDLELAYER_USERNAME;
vcapConstants.middleLayerPassword = _.find(VCAPServices['user-provided'], {
  name: 'middlelayer-service'
}).credentials.MIDDLELAYER_PASSWORD;

// Intake
vcapConstants.intakeClientBaseUrl = _.find(VCAPServices['user-provided'], {
  name: 'intake-client-service'
}).credentials.INTAKE_CLIENT_BASE_URL;
vcapConstants.intakeUsername = _.find(VCAPServices['user-provided'], {
  name: 'intake-client-service'
}).credentials.INTAKE_USERNAME;
vcapConstants.intakePassword = _.find(VCAPServices['user-provided'], {
  name: 'intake-client-service'
}).credentials.INTAKE_PASSWORD;

// Login.gov
vcapConstants.loginGovCert = _.find(VCAPServices['user-provided'], {
  name: 'login.gov'
}).cert;
vcapConstants.loginGovEntryPoint = _.find(VCAPServices['user-provided'], {
  name: 'login.gov'
}).entryPoint;
vcapConstants.loginGovIssuer = _.find(VCAPServices['user-provided'], {
  name: 'login.gov'
}).issuer;
vcapConstants.loginGovPrivateKey = _.find(VCAPServices['user-provided'], {
  name: 'login.gov'
}).privateKey;

module.exports = vcapConstants;
