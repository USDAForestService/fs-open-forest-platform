'use strict';

let request = require('request');

let util = require('./util.es6');

const VCAPServices = JSON.parse(process.env.VCAP_SERVICES);

const middleLayerBaseUrl = VCAPServices['user-provided'][0].credentials.MIDDLELAYER_BASE_URL;
const middleLayerUsername = VCAPServices['user-provided'][0].credentials.MIDDLELAYER_USERNAME;
const middleLayerPassword = VCAPServices['user-provided'][0].credentials.MIDDLELAYER_PASSWORD;

module.exports = (application, successCallback, failureCallback) => {

  let authOptions = {
    url: middleLayerBaseUrl + 'auth',
    json: true,
    body: { username: middleLayerUsername, password: middleLayerPassword }
  };

  let acceptanceOptions = {
    url: middleLayerBaseUrl + 'permits/applications/special-uses/noncommercial/',
    headers: { 'x-access-token': undefined },
    json: true,
    body: util.translateFromIntakeToMiddleLayer(application)
  };

  request.post(authOptions, (error, response, body) => {
    console.log('begin post to middle layer');
    if (error || response.statusCode !== 200) {
      console.log('middle layer post to auth, failed');
      failureCallback(error || response);
    } else {
      acceptanceOptions.headers['x-access-token'] = body.token;
      request.post(acceptanceOptions, (error, response, body) => {
        if (error || response.statusCode !== 200) {
          console.log('middle layer post to suds, failed');
          failureCallback(error || response);
        } else {
          console.log('middle layer post, success');
          successCallback(body);
        }
      });
    }
  });
};
