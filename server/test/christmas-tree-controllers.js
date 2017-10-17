'use strict';

const request = require('supertest');

const server = require('./mock-aws-app.es6');

describe('christmas tree controller tests', () => {
  describe('get forest info', () => {
    it('should return a 200 response', done => {
      request(server)
        .get('/forests/123/regulations')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });
});