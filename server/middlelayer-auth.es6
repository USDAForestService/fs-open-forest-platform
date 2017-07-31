'use strict';

let request = require('request');
let vcapServices = require('./vcap-services.es6');

module.exports = () => {
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
