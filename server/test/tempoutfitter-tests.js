'use strict';

var request = require('supertest');
var tempOutfitterTestData = require('./data/tempOutfitterTestData.es6');
var server = require('../app.es6');
var url = '/permits/applications/special-uses/temp-outfitters';

// var postFileURL = '/permits/applications/special-uses/temp-outfitters/file';
// var mockAws = require('aws-sdk-mock');

describe('temp outfitter server tests', () => {

  it('should return a 201 response and a db generated applicationId', (done) => {
    request(server)
      .post(url)
      .set('Accept', 'application/json')
      .send(tempOutfitterTestData.basicTempOutfitter.create())
      .expect('Content-Type', /json/)
      .expect(/"applicationId":[\d]+/)
      .expect(201, done);
  });

  it('should return a 400 response and a name required error', (done) => {
    request(server)
      .post(url)
      .set('Accept', 'application/json')
      .send(tempOutfitterTestData.basicTempOutfitter.create({ 'applicantInfo.primaryFirstName': undefined }))
      .expect('Content-Type', /json/)
      .expect(/"required-applicantInfo.primaryFirstName"/)
      .expect(400, done);
  });

  it('creates a temp outfitter app with undef evening phone', (done) => {
    request(server)
      .post(url)
      .set('Accept', 'application/json')
      .send(tempOutfitterTestData.basicTempOutfitter.create({ 'applicantInfo.eveningPhone': undefined }))
      .expect('Content-Type', /json/)
      .expect(/"applicationId":[\d]+/)
      .expect(201, done);
  });

  it('creates a temp outfitter app with undef fax number', (done) => {
    request(server)
      .post(url)
      .set('Accept', 'application/json')
      .send(tempOutfitterTestData.basicTempOutfitter.create({ 'applicantInfo.faxNumber': undefined }))
      .expect('Content-Type', /json/)
      .expect(/"applicationId":[\d]+/)
      .expect(201, done);
  });

  it('creates a temp outfitter app with too long website, 500 error', (done) => {
    let testData = tempOutfitterTestData.basicTempOutfitter.create();
    testData.applicantInfo.website = 'http:thisisasuperduperlongurlthatissolongitwillbreakthingsandthrowanerrorhopefullyreallythisneedstobeatleast256charactersinlengthsoletsjustcopypasteanddoublethelengthhttp:thisisasuperduperlongurlthatissolongitwillbreakthingsandthrowanerrorhopefullyreallythisneedstobeatleast256charactersinlengthsoletsjustcopypasteanddoublethelength';
    request(server)
      .post(url)
      .set('Accept', 'application/json')
      .send(testData)
      .expect('Content-Type', /json/)
      .expect(500, done);
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

describe('Persistence tests', () => {

  // uncomment the following line when the GET call below is implemented
  //let intakeControlNumber = undefined;

  it('should persist an application', (done) => {
    request(server)
      .post(url)
      .set('Accept', 'application/json')
      .send(tempOutfitterTestData.basicTempOutfitter.create())
      .expect('Content-Type', /json/)
      // uncomment the following expect() when the GET call below is implemented
      //.expect(function(res) {
      // record the intake control number so that we can the the application back out
      //intakeControlNumber = res.body.appControlNumber;
      //})
      .expect(201, done);
  });

  // TODO: uncomment when the GET call is ready
  // it('should return a persisted application', (done) => {
  //   let basicTempOutfitter = tempOutfitterTestData.basicTempOutfitter.create();
  //   request(server)
  //     .get(url + '/' + intakeControlNumber)
  //     .expect(function(res) {
  //       // update the object with values only present after saving to the DB
  //       basicTempOutfitter.appControlNumber = res.body.appControlNumber;
  //       basicTempOutfitter.applicationId = res.body.applicationId;
  //       basicTempOutfitter.createdAt = res.body.createdAt;
  //       basicTempOutfitter.status = 'Received';
  //     })
  //     .expect(200, basicTempOutfitter, done);
  // });

});
