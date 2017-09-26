'use strict';

const AWS = require('mock-aws');
const mock = require('mock-require');
const devnull = require('dev-null');
const tempOutfitterTestData = require('./data/temp-outfitter-test-data.es6');

function MockMulter () {}

MockMulter.prototype._handleFile = function _handleFile (req, file, cb) {
  file.stream.pipe(devnull())
    .on('finish', () => {
      cb(null,{
        key: '12333',
        etag: '82e8674bebaea2797c28872c9a38ad43'
      })
    })
}

mock('multer-s3', function (opts) {
  return new MockMulter(opts)
});

AWS.mock('S3', 'getObject', function(params, cb) {
  cb(null, tempOutfitterTestData.mockS3Get);
});

after(function() {
  AWS.restore();
  mock.stopAll();
});

module.exports = require('../src/app.es6');
