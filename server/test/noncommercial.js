'use strict';

var _ = require('lodash');
var factory = require('unionized');
var noncommercialInput = require('./data/testInputNoncommercial.json');
var noncommercialFactory = factory.factory(noncommercialInput);
var noncommercialTestData = require('./data/noncommercialTestData.es6');
var request = require('supertest');
var server = require('../app.es6');
var testGetURL = '/permits/applications';
var testURL = '/permits/applications/special-uses/noncommercial';

describe('noncommercial tests', () => {

  describe('POST tests', () => {

    it('should return a 200 response and a db generated applicationId', (done) => {
      request(server)
				.post(testURL)
        .set('Accept', 'application/json')
        .send(noncommercialFactory.create())
				.expect('Content-Type', /json/)
        .expect(/"applicationId":[\d]+/)
        .expect(201, done);
    });

  });

  describe('POST validation tests', () => {

    it('should return a validation error for region', (done) => {
      let data = noncommercialFactory.create({ 'region' : 'midwest' });

      request(server)
        .post(testURL)
        .set('Accept', 'application/json')
        .send(data)
        .expect('Content-Type', /json/)
        .expect(/\{"errors":\["pattern-region"\]\}/)
        .expect(400, done);
    });

    it('should return a required error for region', (done) => {
      let data = noncommercialFactory.create();
      data.region = undefined;

      request(server)
        .post(testURL)
        .set('Accept', 'application/json')
        .send(data)
        .expect('Content-Type', /json/)
        .expect(/\{"errors":\["required-region"\]\}/)
        .expect(400, done);
    });

    it('should return a required error for applicantInfo.dayPhone.areaCode', (done) => {
      let data = noncommercialFactory.create();
      data.applicantInfo.dayPhone.areaCode = undefined;

      request(server)
        .post(testURL)
        .set('Accept', 'application/json')
        .send(data)
        .expect('Content-Type', /json/)
        .expect(/\{"errors":\["required-applicantInfo.dayPhone.areaCode"\]\}/)
        .expect(400, done);
    });

    it('should return a type error for applicantInfo.dayPhone.areaCode', (done) => {
      let data = noncommercialFactory.create({ 'applicantInfo.dayPhone.areaCode' : 555 });

      request(server)
        .post(testURL)
        .set('Accept', 'application/json')
        .send(data)
        .expect('Content-Type', /json/)
        .expect(/"type-applicantInfo.dayPhone.areaCode"/)
        .expect(400, done);
    });

    it('should return a required error for region AND a pattern error for district', (done) => {
      let data = noncommercialFactory.create({ 'district' : '600' });
      data.region = undefined;

      request(server)
        .post(testURL)
        .set('Accept', 'application/json')
        .send(data)
        .expect('Content-Type', /json/)
        .expect(/"required-region"/)
        .expect(/"pattern-district"/)
        .expect(400, done);
    });

    it('should return a required error for evening area code', (done) => {
      let data = noncommercialFactory.create(
        { 'applicantInfo.eveningPhone.prefix' : '555',
          'applicantInfo.eveningPhone.number' : '5555'});

      request(server)
        .post(testURL)
        .set('Accept', 'application/json')
        .send(data)
        .expect('Content-Type', /json/)
        .expect(/"required-applicantInfo.eveningPhone.areaCode"/)
        .expect(400, done);
    });
  });

  it('should return a required error for event name', (done) => {
    let data = noncommercialFactory.create();
    data.eventName = undefined;
    request(server)
      .post(testURL)
      .set('Accept', 'application/json')
      .send(data)
      .expect('Content-Type', /json/)
      .expect(/"required-eventName"/)
      .expect(400, done);
  });

  it('should return a required error for numberParticipants', (done) => {
    let data = noncommercialFactory.create();
    data.noncommercialFields.numberParticipants = undefined;
    request(server)
      .post(testURL)
      .set('Accept', 'application/json')
      .send(data)
      .expect('Content-Type', /json/)
      .expect(/"required-noncommercialFields.numberParticipants"/)
      .expect(400, done);
  });

  it('should return a required error for spectator count', (done) => {
    let data = noncommercialFactory.create();
    data.noncommercialFields.spectators = undefined;
    request(server)
      .post(testURL)
      .set('Accept', 'application/json')
      .send(data)
      .expect('Content-Type', /json/)
      .expect(/"required-noncommercialFields.spectators"/)
      .expect(400, done);
  });

  it('should return a required error for start date', (done) => {
    let data = noncommercialFactory.create();
    data.noncommercialFields.startDateTime = undefined;
    request(server)
      .post(testURL)
      .set('Accept', 'application/json')
      .send(data)
      .expect('Content-Type', /json/)
      .expect(/"required-noncommercialFields.startDateTime"/)
      .expect(400, done);
  });

  it('should return a required error for end date', (done) => {
    let data = noncommercialFactory.create();
    data.noncommercialFields.endDateTime = undefined;
    request(server)
      .post(testURL)
      .set('Accept', 'application/json')
      .send(data)
      .expect('Content-Type', /json/)
      .expect(/"required-noncommercialFields.endDateTime"/)
      .expect(400, done);
  });

  it('should return a pattern error for start date', (done) => {
    let data = noncommercialFactory.create();
    data.noncommercialFields.startDateTime = '2020';
    request(server)
      .post(testURL)
      .set('Accept', 'application/json')
      .send(data)
      .expect('Content-Type', /json/)
      .expect(/"pattern-noncommercialFields.startDateTime"/)
      .expect(400, done);
  });

  it('should return a pattern error for end date', (done) => {
    let data = noncommercialFactory.create();
    data.noncommercialFields.endDateTime = '2020';
    request(server)
      .post(testURL)
      .set('Accept', 'application/json')
      .send(data)
      .expect('Content-Type', /json/)
      .expect(/"pattern-noncommercialFields.endDateTime"/)
      .expect(400, done);
  });

});

describe('GET tests', () => {

  it('should return at least one noncommercial application', (done) => {
    request(server)
      .get(testGetURL)
      .expect('Content-Type', /json/)
      .expect(/"applicationId":[\d]+/)
      .expect(200, done);
  });

  it('should return a 400 error when requesting a with a malformed uuid', (done) => {
    request(server)
      .get(testGetURL + '/malformed-uuid')
      .expect(400, done);
  });

  it('should return a 404 error when requesting a nonexistant application', (done) => {
    request(server)
      .get(testGetURL + '/4dc61d60-a318-462f-8753-a57605303faa')
      .expect(404, done);
  });

  it('should return a 404 error when requesting a nonexistant resource', (done) => {
    request(server)
      .get('/nonexistant-resource')
      .expect(404, done);
  });

});

describe('Persistence tests', () => {

  let intakeControlNumber = undefined;
  let singlePermitHolderPersisted = _.cloneDeep(noncommercialTestData.singlePermitHolder);
  let singlePermitHolderWithSecondaryPermitHolderPersisted = _.cloneDeep(noncommercialTestData.singlePermitHolderWithSecondaryPermitHolder);

  it('should persist an application with a primary permit holder', (done) => {
    request(server)
      .post(testURL)
      .set('Accept', 'application/json')
      .send(noncommercialTestData.singlePermitHolder)
      .expect('Content-Type', /json/)
      .expect(function(res) {
        // record the intake control number so that we can the the application back out
        intakeControlNumber = res.body.appControlNumber;
      })
      .expect(201, done);
  });

  it('should return a persisted application with a primary permit holder', (done) => {
    request(server)
      .get(testGetURL + '/' + intakeControlNumber)
      .expect(function(res) {
        // update the object with values only present after saving to the DB
        singlePermitHolderPersisted.appControlNumber = res.body.appControlNumber;
        singlePermitHolderPersisted.applicationId = res.body.applicationId;
        singlePermitHolderPersisted.createdAt = res.body.createdAt;
        singlePermitHolderPersisted.status = 'Received';
      })
      .expect(200, singlePermitHolderPersisted, done);
  });

  it('should persist an application with a primary permit holder and a secondary permit holder', (done) => {
    request(server)
      .post(testURL)
      .set('Accept', 'application/json')
      .send(noncommercialTestData.singlePermitHolderWithSecondaryPermitHolder)
      .expect('Content-Type', /json/)
      .expect(function(res) {
        // record the intake control number so that we can the the application back out
        intakeControlNumber = res.body.appControlNumber;
      })
      .expect(201, done);
  });

  it('should return a persisted application with a primary permit holder and a secondary permit holder', (done) => {
    request(server)
      .get(testGetURL + '/' + intakeControlNumber)
      .expect(function(res) {
        // update the object with values only present after saving to the DB
        singlePermitHolderWithSecondaryPermitHolderPersisted.appControlNumber = res.body.appControlNumber;
        singlePermitHolderWithSecondaryPermitHolderPersisted.applicationId = res.body.applicationId;
        singlePermitHolderWithSecondaryPermitHolderPersisted.createdAt = res.body.createdAt;
        singlePermitHolderWithSecondaryPermitHolderPersisted.status = 'Received';
      })
      .expect(200, singlePermitHolderWithSecondaryPermitHolderPersisted, done);
  });

});

// TODO: Secondary permit holder with custom address
// TODO: Only an organization address
// TODO: Organization address with unique primary permit holder address
// TODO: Organization address unique primary permit holder address and unique secondary permit holder address
