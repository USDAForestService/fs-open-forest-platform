'use strict';

var request = require('supertest');

var server = require('../app.es6');

var factory = require('unionized');

var noncommercialInput = require('./data/testInputNoncommercial.json');

var testURL = '/permits/applications/special-uses/noncommercial';

var noncommercialFactory = factory.factory(noncommercialInput);

describe('noncommercial tests', () => {

  describe('POST tests', () => {

    it('should return a 200 response and tempControlNumber of 1', (done) => {
      request(server)
				.post(testURL)
        .set('Accept', 'application/json')
        .send(noncommercialFactory.create())
				.expect('Content-Type', /json/)
        .expect((res) => {
          expect(res.body.tempControlNumber).toBe(1);
  			})
  			.expect(200, done);
    });

  });

});
