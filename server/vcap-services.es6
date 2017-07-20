'use strict';

let _ = require('lodash');

// Environment variables

const vcapConstants = {};

const VCAPServices = JSON.parse(process.env.VCAP_SERVICES);
vcapConstants.accessKeyId = VCAPServices.s3[0].credentials.access_key_id;
vcapConstants.secretAccessKey = VCAPServices.s3[0].credentials.secret_access_key;
vcapConstants.region = VCAPServices.s3[0].credentials.region;
vcapConstants.bucket = VCAPServices.s3[0].credentials.bucket;
vcapConstants.middleLayerBaseUrl = _.find(VCAPServices['user-provided'], {
  name: 'middlelayer-service'
}).credentials.MIDDLELAYER_BASE_URL;
vcapConstants.middleLayerUsername = _.find(VCAPServices['user-provided'], {
  name: 'middlelayer-service'
}).credentials.MIDDLELAYER_USERNAME;
vcapConstants.middleLayerPassword = _.find(VCAPServices['user-provided'], {
  name: 'middlelayer-service'
}).credentials.MIDDLELAYER_PASSWORD;
vcapConstants.intakeClientBaseUrl = _.find(VCAPServices['user-provided'], {
  name: 'intake-client-service'
}).credentials.INTAKE_CLIENT_BASE_URL;
vcapConstants.intakeUsername = _.find(VCAPServices['user-provided'], {
  name: 'intake-client-service'
}).credentials.INTAKE_USERNAME;
vcapConstants.intakePassword = _.find(VCAPServices['user-provided'], {
  name: 'intake-client-service'
}).credentials.INTAKE_PASSWORD;

module.exports = vcapConstants;
