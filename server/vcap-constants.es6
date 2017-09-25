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
vcapConstants.middleLayerBaseUrl = middlelayerService.credentials.middlelayer_base_url;
vcapConstants.middleLayerUsername = middlelayerService.credentials.middlelayer_username;
vcapConstants.middleLayerPassword = middlelayerService.credentials.middlelayer_password;

// Intake
const intakeService = vcapServices['user-provided'].find(element => {
  return element.name === 'intake-client-service';
});
vcapConstants.intakeClientBaseUrl = intakeService.credentials.intake_client_base_url;

// Login.gov
const loginGovService = vcapServices['user-provided'].find(element => {
  return element.name === 'login-service-provider';
});
vcapConstants.loginGovIssuer = loginGovService.credentials.issuer;
vcapConstants.loginGovJwk = loginGovService.credentials.jwk;
vcapConstants.loginGovIdpUsername = loginGovService.credentials.idp_username;
vcapConstants.loginGovIdpPassword = loginGovService.credentials.idp_password;
vcapConstants.loginGovDiscoveryUrl = loginGovService.credentials.discovery_url;

// USDA eAuth
const eAuthService = vcapServices['user-provided'].find(element => {
  return element.name === 'eauth-service-provider';
});
vcapConstants.eAuthUserWhiteList = eAuthService.credentials.whitelist;
vcapConstants.eAuthIssuer = eAuthService.credentials.issuer;
vcapConstants.eAuthEntryPoint = eAuthService.credentials.entrypoint;
vcapConstants.eAuthCert = eAuthService.credentials.cert;
vcapConstants.eAuthPrivateKey = eAuthService.credentials.private_key;

// SMTP
const smtp = vcapServices['user-provided'].find(element => {
  return element.name === 'smtp-service';
});
vcapConstants.smtpHost = smtp.credentials.smtp_server;
vcapConstants.smtpUsername = smtp.credentials.username;
vcapConstants.smtpPassword = smtp.credentials.password;
vcapConstants.specialUseAdminEmailAddresses = smtp.credentials.admins;

module.exports = vcapConstants;
