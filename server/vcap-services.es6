'use strict';

const vcapConstants = {};
const VCAPServices = JSON.parse(process.env.VCAP_SERVICES);

// Intake S3
let intakeS3 = VCAPServices['s3'].find(element => {
  return element.name === 'intake-s3';
});
vcapConstants.accessKeyId = intakeS3.credentials.access_key_id;
vcapConstants.secretAccessKey = intakeS3.credentials.secret_access_key;
vcapConstants.region = intakeS3.credentials.region;
vcapConstants.bucket = intakeS3.credentials.bucket;

// Certs S3
let certsS3 = VCAPServices['s3'].find(element => {
  return element.name === 'certs';
});
vcapConstants.certsAccessKeyId = certsS3.credentials.access_key_id;
vcapConstants.certsSecretAccessKey = certsS3.credentials.secret_access_key;
vcapConstants.certsRegion = certsS3.credentials.region;
vcapConstants.certsBucket = certsS3.credentials.bucket;

// Middle layer
let middlelayerService = VCAPServices['user-provided'].find(element => {
  return element.name === 'middlelayer-service';
});
vcapConstants.middleLayerBaseUrl = middlelayerService.credentials.MIDDLELAYER_BASE_URL;
vcapConstants.middleLayerUsername = middlelayerService.credentials.MIDDLELAYER_USERNAME;
vcapConstants.middleLayerPassword = middlelayerService.credentials.MIDDLELAYER_PASSWORD;

// Intake
let intakeService = VCAPServices['user-provided'].find(element => {
  return element.name === 'intake-client-service';
});
vcapConstants.intakeClientBaseUrl = intakeService.credentials.INTAKE_CLIENT_BASE_URL;
vcapConstants.intakeUsername = intakeService.credentials.INTAKE_USERNAME;
vcapConstants.intakePassword = intakeService.credentials.INTAKE_PASSWORD;

// Login.gov
let loginGovService = VCAPServices['user-provided'].find(element => {
  return element.name === 'login-service-provider';
});
vcapConstants.loginGovIssuer = loginGovService.credentials.issuer;
vcapConstants.loginGovJwk = loginGovService.credentials.jwk;
vcapConstants.loginGovIdpUsername = loginGovService.credentials.IDP_USERNAME;
vcapConstants.loginGovIdpPassword = loginGovService.credentials.IDP_PASSWORD;
// vcapConstants.loginGovRedirectURI = loginGovService.credentials.redirecturi;

module.exports = vcapConstants;
