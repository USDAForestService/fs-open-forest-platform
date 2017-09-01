var tempOutfitterTestData = require('./data/tempOutfitterTestData.es6');
const AWS = require('mock-aws');

AWS.mock('S3', 'putObject', function(params, cb) {
  console.log('****************** PUTTING MOCK DATA *************************');
  cb(null, { ETag: '"82e8674bebaea2797c28872c9a38ad43"' });
});
AWS.mock('S3', 'getObject', function (params, cb) {
  console.log('****************** GETTING MOCK DATA *************************');
  cb(null, tempOutfitterTestData.mockS3Get)
});

after(function(){
	AWS.restore();
});

module.exports = require('../app.es6');
