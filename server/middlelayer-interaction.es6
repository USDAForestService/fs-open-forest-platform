'use strict';

let request = require('request');

let util = require('./util.es6');
let vcapServices = require('./vcap-services.es6');

module.exports = (application, successCallback, failureCallback) => {
  let authOptions = {
    url: vcapServices.middleLayerBaseUrl + 'auth',
    json: true,
    body: { username: vcapServices.middleLayerUsername, password: vcapServices.middleLayerPassword }
  };

  let acceptanceOptions = {
    url: vcapServices.middleLayerBaseUrl + 'permits/applications/special-uses/noncommercial/',
    headers: { 'x-access-token': undefined },
    json: true,
    body: util.translateFromIntakeToMiddleLayer(application)
  };

  request.post(authOptions, (error, response, body) => {
    if (error || response.statusCode !== 200) {
      failureCallback(error || response);
    } else {
      acceptanceOptions.headers['x-access-token'] = body.token;
      request.post(acceptanceOptions, (error, response, body) => {
        if (error || response.statusCode !== 200) {
          failureCallback(error || response);
        } else {
          successCallback(body);
        }
      });
    }
  });
};
