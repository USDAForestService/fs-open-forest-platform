'use strict';

let AWS = require('aws-sdk');
let fs = require('fs');
let moment = require('moment');
let NoncommercialApplication = require('./models/noncommercial-application.es6');
let request = require('request');
let TempOutfitterApplication = require('./models/tempoutfitter-application.es6');
let vcapServices = require('./vcap-services.es6');

let extractField = (errorObj, withArg) => {
  if (withArg && errorObj.property === 'instance') {
    return errorObj.argument;
  } else if (withArg) {
    // assumption is that the string otherwise is 'instance.<field>'
    return errorObj.property.substring(9) + '.' + errorObj.argument;
  } else {
    return errorObj.property.substring(9);
  }
};

let util = {};

util.collateErrors = (result, errorArr, prefix) => {
  for (var error of result.errors) {
    if (error.name === 'required') {
      errorArr.push(error.name + '-' + (prefix ? prefix : '') + extractField(error, true));
    } else if (error.name === 'enum' || error.name === 'pattern' || error.name === 'type') {
      errorArr.push(error.name + '-' + (prefix ? prefix : '') + extractField(error, false));
    }
  }

  return errorArr;
};

util.validateDateTime = input => {
  return (
    /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)/.test(input) &&
    moment(input, 'YYYY-MM-DDTHH:mm:ssZ').isValid()
  );
};

util.getAllOpenApplications = (req, res) => {
  let noncommercialApplicationsPromise = NoncommercialApplication.findAll({
    attributes: [
      'appControlNumber',
      'applicantInfoPrimaryFirstName',
      'applicantInfoPrimaryLastName',
      'applicationId',
      'createdAt',
      'eventName',
      'noncommercialFieldsEndDateTime',
      'noncommercialFieldsLocationDescription',
      'noncommercialFieldsStartDateTime',
      'status'
    ],
    where: { $or: [{ status: 'Received' }, { status: 'Hold' }] },
    order: [['createdAt', 'DESC']]
  });
  let tempOutfitterApplicationPromise = TempOutfitterApplication.findAll({
    attributes: [
      'appControlNumber',
      'applicantInfoOrganizationName',
      'applicantInfoPrimaryFirstName',
      'applicantInfoPrimaryLastName',
      'applicationId',
      'createdAt',
      'status',
      'tempOutfitterFieldsActDescFieldsEndDateTime',
      'tempOutfitterFieldsActDescFieldsLocationDesc',
      'tempOutfitterFieldsActDescFieldsStartDateTime'
    ],
    where: { $or: [{ status: 'Received' }, { status: 'Hold' }] },
    order: [['createdAt', 'DESC']]
  });
  Promise.all([noncommercialApplicationsPromise, tempOutfitterApplicationPromise])
    .then(results => {
      for (let item of results[0]) {
        item.type = 'Noncommercial';
      }
      for (let item of results[1]) {
        item.type = 'Temp outfitter';
      }
      res.status(200).json(results[0].concat(results[1]));
    })
    .catch(errors => {
      res.status(500).json(errors);
    });
};

util.middleLayerAuth = () => {
  let requestOptions = {
    url: vcapServices.middleLayerBaseUrl + 'auth',
    json: true,
    body: { username: vcapServices.middleLayerUsername, password: vcapServices.middleLayerPassword }
  };
  return new Promise((resolve, reject) => {
    request.post(requestOptions, (error, response, body) => {
      if (error || response.statusCode !== 200) {
        reject(error || response);
      } else {
        resolve(body.token);
      }
    });
  });
};

util.prepareCerts = () => {
  let s3 = new AWS.S3({
    accessKeyId: vcapServices.certsAccessKeyId,
    secretAccessKey: vcapServices.certsSecretAccessKey,
    region: vcapServices.certsRegion
  });

  s3
    .getObject({ Bucket: vcapServices.certsBucket, Key: vcapServices.loginGovPrivateKey })
    .createReadStream()
    .pipe(fs.createWriteStream('./login-gov.key'));
};

let getExtension = filename => {
  return filename.split('.').reverse()[0];
};

util.getContentType = filename => {
  if (getExtension(filename) === 'pdf') {
    return 'application/pdf';
  }
  if (getExtension(filename) === 'rtf') {
    return 'application/rtf';
  }
  if (getExtension(filename) === 'doc') {
    return 'application/msword';
  }
  if (getExtension(filename) === 'docx') {
    return 'application/msword';
  }
};

module.exports = util;
