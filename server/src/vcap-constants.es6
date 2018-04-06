'use strict';

const fs = require('fs-extra');

/**
 * Module for VCAP Constants
 * @module vcap-constants
 */

const vcapApplication = JSON.parse(process.env.VCAP_APPLICATION);

const vcapConstants = {};

vcapConstants.isLocalOrCI = ['CI', 'local'].indexOf(process.env.PLATFORM) !== -1;

/** VCAP environment variables are used by cloud.gov to pass in instance specific settings. */
let vcapServices;
if (process.env.VCAP_SERVICES) {
  vcapServices = JSON.parse(process.env.VCAP_SERVICES);
} else {
  vcapServices = JSON.parse(fs.readFileSync('vcap-services/local-or-ci.json', 'utf8'));
  if (process.env.AWS_CONFIG) {
    vcapServices.s3 = JSON.parse(process.env.AWS_CONFIG).s3;
  } else {
    vcapServices.s3 = JSON.parse(fs.readFileSync('vcap-services/aws-config.json', 'utf8')).s3;
  }
}

const getUserProvided = function(name) {
  return vcapServices['user-provided'].find(element => {
    return element.name === name;
  });
};

/** Base URL of this instance */
vcapConstants.BASE_URL = 'https://' + vcapApplication.uris[0];

/** jwt token used to generate permit confirmation URL **/
const jwt = getUserProvided('jwt');
vcapConstants.PERMIT_SECRET = jwt.credentials.permit_secret;

/** S3 BUCKET settings */
const intakeS3 = vcapServices['s3'].find(element => {
  return element.name === 'intake-s3';
});
if (intakeS3.credentials.access_key_id && intakeS3.credentials.secret_access_key) {
  vcapConstants.accessKeyId = intakeS3.credentials.access_key_id;
  vcapConstants.secretAccessKey = intakeS3.credentials.secret_access_key;
}
vcapConstants.REGION = intakeS3.credentials.region;
vcapConstants.BUCKET = intakeS3.credentials.bucket;

/** Middle layer settings */
const middlelayerService = getUserProvided('middlelayer-service');
vcapConstants.MIDDLE_LAYER_BASE_URL = middlelayerService.credentials.middlelayer_base_url;
vcapConstants.MIDDLE_LAYER_USERNAME = middlelayerService.credentials.middlelayer_username;
vcapConstants.MIDDLE_LAYER_PASSWORD = middlelayerService.credentials.middlelayer_password;

/** Intake module settings */
const intakeService = getUserProvided('intake-client-service');
vcapConstants.INTAKE_CLIENT_BASE_URL = intakeService.credentials.intake_client_base_url;

/** Login.gov settings */
const loginGovService = getUserProvided('login-service-provider');
vcapConstants.LOGIN_GOV_ISSUER = loginGovService.credentials.issuer;
vcapConstants.LOGIN_GOV_JWK = loginGovService.credentials.jwk;
vcapConstants.LOGIN_GOV_IDP_USERNAME = loginGovService.credentials.idp_username;
vcapConstants.LOGIN_GOV_IDP_PASSWORD = loginGovService.credentials.idp_password;
vcapConstants.LOGIN_GOV_BASE_URL = loginGovService.credentials.base_url;

/** USDA eAuth settings */
const eAuthService = getUserProvided('eauth-service-provider');
vcapConstants.EAUTH_USER_SAFELIST = eAuthService.credentials.whitelist;
vcapConstants.EAUTH_ISSUER = eAuthService.credentials.issuer;
vcapConstants.EAUTH_ENTRY_POINT = eAuthService.credentials.entrypoint;
vcapConstants.EAUTH_CERT = eAuthService.credentials.cert;
vcapConstants.EAUTH_PRIVATE_KEY = eAuthService.credentials.private_key;

/** SMTP settings */
const smtp = getUserProvided('smtp-service');
vcapConstants.SMTP_HOST = smtp.credentials.smtp_server;
vcapConstants.SMTP_USERNAME = smtp.credentials.username;
vcapConstants.SMTP_PASSWORD = smtp.credentials.password;
vcapConstants.SPECIAL_USE_ADMIN_EMAIL_ADDRESSES = smtp.credentials.admins;

/** Pay.gov */
const payGov = getUserProvided('pay-gov');
vcapConstants.PAY_GOV_URL = payGov.credentials.url;
vcapConstants.PAY_GOV_CLIENT_URL = payGov.credentials.client_url;
vcapConstants.PAY_GOV_APP_ID = payGov.credentials.tcs_app_id;
vcapConstants.PAY_GOV_CERT = payGov.credentials.certificate;
vcapConstants.PAY_GOV_PRIVATE_KEY = payGov.credentials.private_key;

module.exports = vcapConstants;
