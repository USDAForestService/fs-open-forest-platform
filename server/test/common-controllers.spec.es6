

const assert = require('chai').assert;
const request = require('supertest');
require('./common.es6');

const server = require('./mock-aws.spec.es6');

describe('common controller', () => {
  it('GET all pending permit applications should return a 200 status code and an array', (done) => {
    request(server)
      .get('/permits/applications/special-uses/pending')
      .expect('Content-Type', /json/)
      .expect((res) => {
        assert.isArray(res.body);
      })
      .expect(200, done);
  });

  it('GET all accepted permit applications should return a 200 status code and an array', (done) => {
    request(server)
      .get('/permits/applications/special-uses/accepted')
      .expect('Content-Type', /json/)
      .expect((res) => {
        assert.isArray(res.body);
      })
      .expect(200, done);
  });

  it('GET all rejected permit applications should return a 200 status code and an array', (done) => {
    request(server)
      .get('/permits/applications/special-uses/rejected')
      .expect('Content-Type', /json/)
      .expect((res) => {
        assert.isArray(res.body);
      })
      .expect(200, done);
  });

  it('GET all cancelled permit applications should return a 200 status code and an array', (done) => {
    request(server)
      .get('/permits/applications/special-uses/cancelled')
      .expect('Content-Type', /json/)
      .expect((res) => {
        assert.isArray(res.body);
      })
      .expect(200, done);
  });

  it('GET all expired permit applications should return a 200 status code and an array', (done) => {
    request(server)
      .get('/permits/applications/special-uses/expired')
      .expect('Content-Type', /json/)
      .expect((res) => {
        assert.isArray(res.body);
      })
      .expect(200, done);
  });

  it('GET all permit applications with invalid status should return a 404 status code', (done) => {
    request(server)
      .get('/permits/applications/special-uses/tatertots')
      .expect(404, done);
  });
});
