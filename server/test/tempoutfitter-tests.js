'use strict';

const _ = require('lodash');
const expect = require('chai').expect;
const request = require('supertest');
const sinon = require('sinon');

const ApplicationFile = require('../src/models/application-files.es6');
const server = require('./mock-aws-app');
const tempOutfitterTestData = require('./data/temp-outfitter-test-data.es6');
const util = require('../src/util.es6');

const postFileURL = '/permits/applications/special-uses/temp-outfitter/file';
const url = '/permits/applications/special-uses/temp-outfitter';

describe('temp outfitter server tests', () => {
  let testApp;

  it('should return a 201 response and a db generated applicationId', done => {
    request(server)
      .post(url)
      .set('Accept', 'application/json')
      .send(tempOutfitterTestData.basicTempOutfitter.create())
      .expect('Content-Type', /json/)
      .expect(/"applicationId":[\d]+/)
      .expect(201, (err, res) => {
        if (err) return done(err);
        testApp = res.body;
        done();
      });
  });

  it('should return a 400 response and a name required error', done => {
    request(server)
      .post(url)
      .set('Accept', 'application/json')
      .send(
        tempOutfitterTestData.basicTempOutfitter.create({
          'applicantInfo.primaryFirstName': undefined
        })
      )
      .expect('Content-Type', /json/)
      .expect(/"required-applicantInfo.primaryFirstName"/)
      .expect(400, done);
  });

  it('creates a temp outfitter app with undef evening phone', done => {
    request(server)
      .post(url)
      .set('Accept', 'application/json')
      .send(
        tempOutfitterTestData.basicTempOutfitter.create({
          'applicantInfo.eveningPhone': undefined
        })
      )
      .expect('Content-Type', /json/)
      .expect(/"applicationId":[\d]+/)
      .expect(201, done);
  });

  it('creates a temp outfitter app with undef fax number', done => {
    request(server)
      .post(url)
      .set('Accept', 'application/json')
      .send(
        tempOutfitterTestData.basicTempOutfitter.create({
          'applicantInfo.faxNumber': undefined
        })
      )
      .expect('Content-Type', /json/)
      .expect(/"applicationId":[\d]+/)
      .expect(201, done);
  });

  it('creates a temp outfitter app with too long website, 500 error', done => {
    let testData = tempOutfitterTestData.basicTempOutfitter.create();
    testData.applicantInfo.website =
      'http:thisisasuperduperlongurlthatissolongitwillbreakthingsandthrowanerrorhopefullyreallythisneedstobeatleast256charactersinlengthsoletsjustcopypasteanddoublethelengthhttp:thisisasuperduperlongurlthatissolongitwillbreakthingsandthrowanerrorhopefullyreallythisneedstobeatleast256charactersinlengthsoletsjustcopypasteanddoublethelength';
    request(server)
      .post(url)
      .set('Accept', 'application/json')
      .send(testData)
      .expect('Content-Type', /json/)
      .expect(500, done);
  });

  describe('getApplicationFileNames', () => {
    let appId = 'appId';
    let app = { appId };
    let findAll;
    beforeEach(() => {
      findAll = sinon.stub(ApplicationFile, 'findAll').resolves(app);
    });
    afterEach(() => {
      findAll.restore();
    });
    it('GET /:appId/files should return all application file names', done => {
      request(server)
        .get(`${url}/${appId}/files`)
        .expect(200, (err, res) => {
          expect(res.body.appId).to.equal(app.appId);
          done();
        });
    });
    it('GET /:appId/files should return a 404 not found if the application can not be found', done => {
      findAll.restore();
      findAll = sinon.stub(ApplicationFile, 'findAll').resolves();
      request(server)
        .get(`${url}/${appId}/files`)
        .expect(404, done);
    });
    it('GET /:appId/files should return a 500 if an error occurs', done => {
      let error = 'No way, no how';
      findAll.restore();
      findAll = sinon.stub(ApplicationFile, 'findAll').rejects(new Error(error));
      request(server)
        .get(`${url}/${appId}/files`)
        .expect(500, (err, res) => {
          expect(res.body).to.equal(error);
          done();
        });
    });
  });

  describe(`POST ${postFileURL} accepts a file`, () => {
    it('should accept a guide-document file and return 201 created', done => {
      request(server)
        .post(postFileURL)
        .type('multipart/form-data')
        .field('applicationId', testApp.applicationId)
        .field('documentType', 'guide-document')
        .set('Accept', 'text/html')
        .attach('file', './test/data/test.docx')
        .expect('Content-Type', /json/)
        .expect(/"applicationId":"[\d]+"/)
        .expect(201, err => {
          expect(err).to.be.null;
          done(err);
        });
    });
    it('should accept a good-standing-evidence file and return 201 created', done => {
      request(server)
        .post(postFileURL)
        .type('multipart/form-data')
        .field('applicationId', testApp.applicationId)
        .field('documentType', 'good-standing-evidence')
        .set('Accept', 'text/html')
        .attach('file', './test/data/test.docx')
        .expect('Content-Type', /json/)
        .expect(/"applicationId":"[\d]+"/)
        .expect(201, err => {
          expect(err).to.be.null;
          done(err);
        });
    });
    it('should accept a acknowledgement-of-risk-form file and return 201 created', done => {
      request(server)
        .post(postFileURL)
        .type('multipart/form-data')
        .field('applicationId', testApp.applicationId)
        .field('documentType', 'acknowledgement-of-risk-form')
        .set('Accept', 'text/html')
        .attach('file', './test/data/test.docx')
        .expect('Content-Type', /json/)
        .expect(/"applicationId":"[\d]+"/)
        .expect(201, err => {
          expect(err).to.be.null;
          done(err);
        });
    });
    it('should accept a insurance-certificate file and return 201 created', done => {
      request(server)
        .post(postFileURL)
        .type('multipart/form-data')
        .field('applicationId', testApp.applicationId)
        .field('documentType', 'insurance-certificate')
        .set('Accept', 'text/html')
        .attach('file', './test/data/test.docx')
        .expect('Content-Type', /json/)
        .expect(/"applicationId":"[\d]+"/)
        .expect(201, err => {
          expect(err).to.be.null;
          done(err);
        });
    });
    it('should accept a operating-plan file and return 201 created', done => {
      request(server)
        .post(postFileURL)
        .type('multipart/form-data')
        .field('applicationId', testApp.applicationId)
        .field('documentType', 'operating-plan')
        .set('Accept', 'text/html')
        .attach('file', './test/data/test.docx')
        .expect('Content-Type', /json/)
        .expect(/"applicationId":"[\d]+"/)
        .expect(201, err => {
          expect(err).to.be.null;
          done(err);
        });
    });
    it('should return a 500 error and an error message if an error occurs', done => {
      let error = 'nope';
      sinon.stub(ApplicationFile, 'create').rejects(new Error(error));
      request(server)
        .post(postFileURL)
        .type('multipart/form-data')
        .field('applicationId', testApp.applicationId)
        .field('documentType', 'guide-document')
        .set('Accept', 'text/html')
        .attach('file', './test/data/test.docx')
        .expect(500, done);
    });
  });

  describe(`PUT ${url}/:uuid updates an application`, () => {
    it('should return 200 and the updated application', done => {
      let testData = _.clone(testApp);
      testData.applicantInfo.website = 'http://super.site';
      request(server)
        .put(`${url}/${testApp.appControlNumber}`)
        .set('Accept', 'application/json')
        .send(testData)
        .expect('Content-Type', /json/)
        .expect(/"applicationId":[\d]+/)
        .expect(200, done);
    });

    it('should accept an application return 200 and the updated application', done => {
      let testData = _.clone(testApp);
      testData.applicantInfo.website = 'http://super.site';
      testData.status = 'Accepted';
      const middleLayerAuth = sinon.stub(util, 'middleLayerAuth').callsFake(function() {
        return new Promise(resolve => {
          resolve('atoken');
        });
      });
      const req = sinon.stub(require('request'), 'post').callsFake(function(opts, cb) {
        cb(null, { statusCode: 200 }, { name: 'body' });
      });
      request(server)
        .put(`${url}/${testApp.appControlNumber}`)
        .set('Accept', 'application/json')
        .send(testData)
        .expect('Content-Type', /json/)
        .expect(/"applicationId":[\d]+/)
        .expect(200, err => {
          middleLayerAuth.restore();
          req.restore();
          done(err);
        });
    });

    it('should not accept an application return 500 if middleLayerAuth fails', done => {
      let testData = _.clone(testApp);
      testData.applicantInfo.website = 'http://super.site';
      testData.status = 'Accepted';
      const middleLayerAuth = sinon.stub(util, 'middleLayerAuth').callsFake(function() {
        return new Promise((resolve, reject) => {
          reject(new Error('Not gonna happen'));
        });
      });
      request(server)
        .put(`${url}/${testApp.appControlNumber}`)
        .set('Accept', 'application/json')
        .send(testData)
        .expect('Content-Type', /json/)
        .expect(500, err => {
          middleLayerAuth.restore();
          done(err);
        });
    });

    it('should not accept an application return 500 if call to middle layer fails', done => {
      let testData = _.clone(testApp);
      testData.applicantInfo.website = 'http://super.site';
      testData.status = 'Accepted';
      const middleLayerAuth = sinon.stub(util, 'middleLayerAuth').callsFake(function() {
        return new Promise(resolve => {
          resolve('A token');
        });
      });
      const req = sinon.stub(require('request'), 'post').callsFake(function(opts, cb) {
        cb(null, { statusCode: 400 }, { name: 'body' });
      });
      request(server)
        .put(`${url}/${testApp.appControlNumber}`)
        .set('Accept', 'application/json')
        .send(testData)
        .expect('Content-Type', /json/)
        .expect(500, err => {
          middleLayerAuth.restore();
          req.restore();
          done(err);
        });
    });
  });
});
