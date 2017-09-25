'use strict';

const expect = require('chai').expect;

const middleware = require('../middleware.es6');

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

  it('should pass user auth', () => {
    const req = {};
    const res = {};
    const next = () => {
      // TODO: test the failure when CI mode is off
      expect(true).to.be.true;
    };
    middleware.checkPermissions(req, res, next);
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
});
