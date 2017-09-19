'use strict';

/* VCAP environment variables are used by cloud.gov to pass in instance specific settings */
const vcapServices = JSON.parse(process.env.VCAP_SERVICES);
const vcapApplication = JSON.parse(process.env.VCAP_APPLICATION);

const vcapConstants = {};

// Base URL of this instance
vcapConstants.baseUrl = 'https://' + vcapApplication.uris[0];

// Intake S3
const intakeS3 = vcapServices['s3'].find(element => {
  return element.name === 'intake-s3';
});
vcapConstants.accessKeyId = intakeS3.credentials.access_key_id;
vcapConstants.secretAccessKey = intakeS3.credentials.secret_access_key;
vcapConstants.region = intakeS3.credentials.region;
vcapConstants.bucket = intakeS3.credentials.bucket;

// Middle layer
const middlelayerService = vcapServices['user-provided'].find(element => {
  return element.name === 'middlelayer-service';
});
vcapConstants.middleLayerBaseUrl = middlelayerService.credentials.MIDDLELAYER_BASE_URL;
vcapConstants.middleLayerUsername = middlelayerService.credentials.MIDDLELAYER_USERNAME;
vcapConstants.middleLayerPassword = middlelayerService.credentials.MIDDLELAYER_PASSWORD;

// Intake
const intakeService = vcapServices['user-provided'].find(element => {
  return element.name === 'intake-client-service';
});
vcapConstants.intakeClientBaseUrl = intakeService.credentials.INTAKE_CLIENT_BASE_URL;
vcapConstants.intakeUsername = intakeService.credentials.INTAKE_USERNAME;
vcapConstants.intakePassword = intakeService.credentials.INTAKE_PASSWORD;

// Login.gov
const loginGovService = vcapServices['user-provided'].find(element => {
  return element.name === 'login-service-provider';
});
vcapConstants.loginGovIssuer = loginGovService.credentials.issuer;
vcapConstants.loginGovJwk = loginGovService.credentials.jwk;
vcapConstants.loginGovIdpUsername = loginGovService.credentials.IDP_USERNAME;
vcapConstants.loginGovIdpPassword = loginGovService.credentials.IDP_PASSWORD;
vcapConstants.loginGovDiscoveryUrl = loginGovService.credentials.discoveryurl;

// USDA eAuth
const eAuthService = vcapServices['user-provided'].find(element => {
  return element.name === 'eauth-service-provider';
});
vcapConstants.eAuthUserWhiteList = eAuthService.credentials.whitelist;
vcapConstants.eAuthIssuer = eAuthService.credentials.issuer;
vcapConstants.eAuthEntryPoint = eAuthService.credentials.entrypoint;
vcapConstants.eAuthCert = eAuthService.credentials.cert;
vcapConstants.eAuthPrivateKey = eAuthService.credentials.privatekey;

// SMTP
const smtp = vcapServices['user-provided'].find(element => {
  return element.name === 'smtp-service';
});
vcapConstants.smtpHost = smtp.credentials.smtpserver;
vcapConstants.smtpUsername = smtp.credentials.username;
vcapConstants.smtpPassword = smtp.credentials.password;
vcapConstants.specialUseAdminEmailAddresses = smtp.credentials.admins;

module.exports = vcapConstants;
