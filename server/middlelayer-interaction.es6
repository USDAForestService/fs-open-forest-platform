'use strict';

let request = require('request');
let util = require('./util.es6');
let vcapServices = require('./vcap-services.es6');

let middlelayerFacade = {};

let authenticate = () => {
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

middlelayerFacade.acceptNoncommercialPermitApplication = application => {
  let requestOptions = {
    url: vcapServices.middleLayerBaseUrl + 'permits/applications/special-uses/noncommercial/',
    headers: {},
    json: true,
    body: util.translateFromIntakeToMiddleLayer(application)
  };
  return new Promise((resolve, reject) => {
    authenticate()
      .then(token => {
        requestOptions.headers['x-access-token'] = token;
        request.post(requestOptions, (error, response, body) => {
          if (error || response.statusCode !== 200) {
            reject(error || response);
          } else {
            resolve(body);
          }
        });
      })
      .catch(error => {
        reject(error);
      });
  });
};

module.exports = middlelayerFacade;
