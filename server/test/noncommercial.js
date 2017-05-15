'use strict';

var request = require('supertest');

var server = require('../app.es6');

var factory = require('unionized');

var noncommercialInput = require('./data/testInputNoncommercial.json');

var testURL = '/permits/applications/special-uses/noncommercial';

var noncommercialFactory = factory.factory(noncommercialInput);

var chai = require('chai');
var expect = chai.expect;

describe('noncommercial tests', () => {

  describe('POST tests', () => {

    it('should return a 200 response and tempControlNumber of 1', (done) => {
      request(server)
				.post(testURL)
        .set('Accept', 'application/json')
        .send(noncommercialFactory.create())
				.expect('Content-Type', /json/)
        .expect(/"tempControlNumber":1/)
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
      let data = noncommercialFactory.create({ 'applicantInfo.dayPhone.areaCode' : 'invalid' });

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

  });

});
