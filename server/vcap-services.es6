'use strict';

// Environment variables

const vcapConstants = {};

const VCAPServices = JSON.parse(process.env.VCAP_SERVICES);
vcapConstants.accessKeyId = VCAPServices.s3[0].credentials.access_key_id;
vcapConstants.secretAccessKey = VCAPServices.s3[0].credentials.secret_access_key;
vcapConstants.region = VCAPServices.s3[0].credentials.region;
vcapConstants.bucket = VCAPServices.s3[0].credentials.bucket;
vcapConstants.middleLayerBaseUrl = VCAPServices['user-provided'][0].credentials.MIDDLELAYER_BASE_URL;
vcapConstants.middleLayerUsername = VCAPServices['user-provided'][0].credentials.MIDDLELAYER_USERNAME;
vcapConstants.middleLayerPassword = VCAPServices['user-provided'][0].credentials.MIDDLELAYER_PASSWORD;

module.exports = vcapConstants;
