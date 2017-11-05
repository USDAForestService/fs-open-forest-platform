'use strict';

const AWS = require('mock-aws');
const mock = require('mock-require');
const devnull = require('dev-null');

const mockS3 = require('./data/mock-s3.es6');

function MockMulter() {}

MockMulter.prototype._handleFile = function _handleFile(req, file, callback) {
  file.stream.pipe(devnull()).on('finish', () => {
    callback(null, {
      key: '12333',
      etag: '82e8674bebaea2797c28872c9a38ad43'
    });
  });
};

mock('multer-s3', function(opts) {
  return new MockMulter(opts);
});

AWS.mock('S3', 'getObject', function(params, callback) {
  callback(null, mockS3);
});

after(function() {
  AWS.restore();
  mock.stopAll();
});

module.exports = require('../src/app.es6');
