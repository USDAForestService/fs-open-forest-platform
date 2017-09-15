'use strict';

const tempOutfitterTestData = require('./data/temp-outfitter-test-data.es6');
const AWS = require('mock-aws');

AWS.mock('S3', 'putObject', function(params, cb) {
  cb(null, { ETag: '"82e8674bebaea2797c28872c9a38ad43"' });
});
AWS.mock('S3', 'getObject', function(params, cb) {
  cb(null, tempOutfitterTestData.mockS3Get);
});

after(function() {
  AWS.restore();
});

module.exports = require('../app.es6');
