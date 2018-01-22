'use strict';

const assert = require('chai').assert;
const request = require('supertest');

const server = require('./mock-aws.spec.es6');

describe('common controller', () => {
  it('GET all pending permit applications should return a 200 status code and an array', done => {
    request(server)
      .get('/permits/applications/pending')
      .expect('Content-Type', /json/)
      .expect(res => {
        assert.isArray(res.body);
      })
      .expect(200, done);
  });

  it('GET all accepted permit applications should return a 200 status code and an array', done => {
    request(server)
      .get('/permits/applications/accepted')
      .expect('Content-Type', /json/)
      .expect(res => {
        assert.isArray(res.body);
      })
      .expect(200, done);
  });

  it('GET all rejected permit applications should return a 200 status code and an array', done => {
    request(server)
      .get('/permits/applications/rejected')
      .expect('Content-Type', /json/)
      .expect(res => {
        assert.isArray(res.body);
      })
      .expect(200, done);
  });

  it('GET all cancelled permit applications should return a 200 status code and an array', done => {
    request(server)
      .get('/permits/applications/cancelled')
      .expect('Content-Type', /json/)
      .expect(res => {
        assert.isArray(res.body);
      })
      .expect(200, done);
  });

  it('GET all expired permit applications should return a 200 status code and an array', done => {
    request(server)
      .get('/permits/applications/expired')
      .expect('Content-Type', /json/)
      .expect(res => {
        assert.isArray(res.body);
      })
      .expect(200, done);
  });

  it('GET all permit applications with invalid status should return a 404 status code', done => {
    request(server)
      .get('/permits/applications/tatertots')
      .expect(404, done);
  });
});
