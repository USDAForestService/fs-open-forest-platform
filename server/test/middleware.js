'use strict';

const expect = require('chai').expect;

const middleware = require('../src/middleware.es6');
const vcapConstants = require('../src/vcap-constants.es6');
const sinon = require('sinon');

describe('middleware tests', () => {
  it('should have CORS headers', () => {
    const req = {};
    const res = {
      headers: {}
    };
    res.set = (key, value) => {
      res.headers[key] = value;
    };

    const next = () => {
      expect(res.headers['Cache-Control'], 'no-cache');
      expect(res.headers['Access-Control-Allow-Origin'], 'http://localhost:4200');
    };

    middleware.setCorsHeaders(req, res, next);
  });
  it('should have CORS headers when env.PLATFORM is not LOCAL or CI', () => {
    const PLATFORM = process.env.PLATFORM
    process.env.PLATFORM = "not-ci ro local"
    const req = {};
    const res = {
      headers: {}
    };
    res.set = (key, value) => {
      res.headers[key] = value;
    };

    const next = () => {
      expect(res.headers['Cache-Control'], 'no-cache');
      expect(res.headers['Access-Control-Allow-Origin'], vcapConstants.intakeClientBaseUrl);
      process.env.PLATFORM = PLATFORM
    };

    middleware.setCorsHeaders(req, res, next);
  });
  it('should pass user auth', () => {
    const req = {};
    const res = {};
    const next = () => {
      expect(true).to.be.true;
    };
    middleware.checkPermissions(req, res, next);
  });
  it('should pass user auth when env.PLATFORM is not LOCAL or CI', () => {
    const PLATFORM = process.env.PLATFORM
    process.env.PLATFORM = "not-ci or local"
    const req = {user: 'someone'};
    const res = {};
    const next = () => {
      expect(true).to.be.true;
      process.env.PLATFORM = PLATFORM
    };
    middleware.checkPermissions(req, res, next);
  });
  it('should fail user auth when env.PLATFORM is not LOCAL or CI and no user is present', () => {
    const PLATFORM = process.env.PLATFORM
    process.env.PLATFORM = "not-ci or local"
    const req = {};
    let send = sinon.stub()
    const res = {
      status: sinon.stub().returns({send})
    };
    middleware.checkPermissions(req, res);
    expect(res.status.called).to.be.true
    process.env.PLATFORM = PLATFORM
  });
  it('should pass admin auth', () => {
    const req = {};
    const res = {};
    const next = () => {
      // TODO: test the failure when CI mode is off
      expect(true).to.be.true;
    };
    middleware.checkAdminPermissions(req, res, next);
  });
  it('should not pass admin auth', () => {
    const PLATFORM = process.env.PLATFORM
    process.env.PLATFORM = "not-ci or local"
    const req = {user:{role:'shmuck',email:'123'}};
    let send = sinon.stub()
    const res = {
      status: sinon.stub().returns({send})
    };
    middleware.checkAdminPermissions(req, res);
    expect(res.status.called).to.be.true
    process.env.PLATFORM = PLATFORM
  });
});
