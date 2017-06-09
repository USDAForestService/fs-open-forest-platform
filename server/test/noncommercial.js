'use strict';

var factory = require('unionized');
var noncommercialInput = require('./data/testInputNoncommercial.json');
var noncommercialFactory = factory.factory(noncommercialInput);
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

});

describe('GET tests', () => {
  it('should return at least one noncommercial application', (done) => {
    request(server)
      .get(testGetURL)
      .expect('Content-Type', /json/)
      .expect(/"applicationId":[\d]+/)
      .expect(200, done);
  });
});

// });
