const { assert } = require('chai');
const request = require('supertest');
require('./common.es6');
const { loginPublic } = require('./data/auth-helper.es6');
const server = require('./mock-aws.spec.es6');

describe('common controller', () => {
  const getPermitsUrl = type => `/permits/applications/special-uses/${type}`;

  describe('when not authenticated as an public user', () => {
    it('returns 401', (done) => {
      request(server).get(getPermitsUrl())
        .expect(401, done);
    });
  });

  describe('when authenticated as an public user', () => {
    const agent = request.agent(server);

    before(loginPublic(agent));

    it('GET all pending permit applications should return a 200 status code and an array', (done) => {
      agent
        .get(getPermitsUrl('pending'))
        .expect('Content-Type', /json/)
        .expect((res) => {
          assert.isArray(res.body);
        })
        .expect(200, done);
    });

    it('GET all accepted permit applications should return a 200 status code and an array', (done) => {
      agent
        .get(getPermitsUrl('accepted'))
        .expect('Content-Type', /json/)
        .expect((res) => {
          assert.isArray(res.body);
        })
        .expect(200, done);
    });

    it('GET all rejected permit applications should return a 200 status code and an array', (done) => {
      agent
        .get(getPermitsUrl('rejected'))
        .expect('Content-Type', /json/)
        .expect((res) => {
          assert.isArray(res.body);
        })
        .expect(200, done);
    });

    it('GET all cancelled permit applications should return a 200 status code and an array', (done) => {
      agent
        .get(getPermitsUrl('cancelled'))
        .expect('Content-Type', /json/)
        .expect((res) => {
          assert.isArray(res.body);
        })
        .expect(200, done);
    });

    it('GET all expired permit applications should return a 200 status code and an array', (done) => {
      agent
        .get(getPermitsUrl('expired'))
        .expect('Content-Type', /json/)
        .expect((res) => {
          assert.isArray(res.body);
        })
        .expect(200, done);
    });

    it('GET all permit applications with invalid status should return a 404 status code', (done) => {
      agent
        .get(getPermitsUrl('tatertots'))
        .expect(404, done);
    });
  });
});
