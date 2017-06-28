'use strict';

var request = require('supertest');
var tempOutfitterTestData = require('./data/tempOutfitterTestData.es6');
var server = require('../app.es6');
var testPostURL = '/permits/applications/special-uses/temp-outfitters';

// var postFileURL = '/permits/applications/special-uses/temp-outfitters/file';
// var mockAws = require('aws-sdk-mock');

describe('temp outfitter server tests', () => {
  it('should return a 201 response and a db generated applicationId', (done) => {
    request(server)
      .post(testPostURL)
      .set('Accept', 'application/json')
      .send(tempOutfitterTestData.basicTempOutfitter.create())
      .expect('Content-Type', /json/)
      .expect(/"applicationId":[\d]+/)
      .expect(201, done);
  });


// keep these as a starting point to get the s3 mocking working
  // it('should save a file to mock s3 and the db', (done) => {
  //
  //   mockAws.mock('S3', 'upload', (params, callback) => {
  //     console.log('upload');
  //     callback(null, {
  //       ETag: 'SomeETag"',
  //       Location: 'PublicWebsiteLink',
  //       Key: 'RandomKey',
  //       Bucket: 'TestBucket'
  //     });
  //   });
  //
  //   mockAws.mock('S3', 'upload.on', (params, callback) => {
  //     console.log('in upload.on');
  //     callback(null, {});
  //   });
  //
  //   mockAws.mock('S3', 'upload.send', (params, callback) => {
  //     console.log('in upload.send');
  //     callback(null, {});
  //   });
  //
  //   var server = require('../app.es6');
  //
  //   request(server)
  //     .post(postFileURL)
  //     .attach('file', './test/data/test-pdf.pdf')
  //     .expect(201)
  //     .end(function(err, res) {
  //       mockAws.restore();
  //       done();
  //     });
  //
  //
  //
  // });
});
