'use strict';

const chai = require('chai');
const sinon = require('sinon');

const middleware = require('../src/services/middleware.es6');
const util = require('../src/services/util.es6');
const vcapConstants = require('../src/vcap-constants.es6');

chai.use(require('sinon-chai'));
const expect = chai.expect;

describe('middleware', () => {
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

  describe('given production environment', () => {
    beforeEach(() => {
      sinon.stub(util, 'isProduction').returns(true);
    });

    afterEach(() => {
      util.isProduction.restore();
    });

    it('should have CORS headers set', (done) => {
      const req = {};
      const res = {
        set: sinon.spy()
      };

      middleware.setCorsHeaders(req, res, () => {
        expect(res.set).to.have.been.calledWith('Cache-Control', 'no-cache');
        expect(res.set).to.have.been.calledWith('Access-Control-Allow-Origin', vcapConstants.INTAKE_CLIENT_BASE_URL);
        done();
      });
    });
  });

  describe('checkPermissions', () => {
    let res;
    beforeEach(() => {
      res = {
        status: sinon.stub().returnsThis(),
        send: sinon.spy()
      };
    });

    describe('without a user', () => {
      let req;

      beforeEach(() => {
        req = {};
      });

      it('should call status with 401', () => {
        const next = sinon.spy();
        middleware.checkPermissions(req, res, next);
        expect(next).not.to.have.been.called;
        expect(res.status).to.have.been.calledWith(401);
        expect(res.send).to.have.been.called;
      });
    });

    describe('given a user', () => {
      let req;

      beforeEach(() => {
        req = {
          user: {
            email: 'test@example.com'
          }
        };
      });

      it('should pass user auth and call next', () => {
        const next = sinon.spy();
        middleware.checkPermissions(req, res, next);
        expect(next).to.have.been.called;
        expect(res.status).not.to.have.been.called;
      });
    });
  });

  describe('checkAdminPermissions', () => {
    let res;
    beforeEach(() => {
      res = {
        status: sinon.stub().returnsThis(),
        send: sinon.spy()
      };
    });

    describe('given no user', () => {
      let req;

      beforeEach(() => {
        req = {};
      });

      it('should return 403 status', () => {
        const next = sinon.spy();
        middleware.checkAdminPermissions(req, res, next);
        expect(next).not.to.have.been.called;
        expect(res.status).to.have.been.calledWith(403);
      });
    });

    describe('given a non-admin user', () => {
      let req;

      beforeEach(() => {
        req = {
          user: {
            role: 'foo',
            email: '123@example.com'
          }
        };
      });

      it('should send status 403', () => {
        const next = sinon.spy();
        middleware.checkAdminPermissions(req, res, next);
        expect(next).not.to.have.been.called;
        expect(res.status).to.be.calledWith(403);
        expect(res.send).to.have.been.called;
      });
    });

    describe('given an admin user', () => {
      let req;

      beforeEach(() => {
        sinon.stub(util, 'getUserRole').returns('admin');

        req = {
          user: {
            adminUsername: 'administrator',
            role: 'foo',
            email: '123@example.com'
          }
        };
      });

      afterEach(() => {
        util.getUserRole.restore();
      });

      it('should pass admin auth', () => {
        const next = sinon.spy();
        middleware.checkAdminPermissions(req, res, next);
        expect(next).to.have.been.calledWith();
        expect(util.getUserRole).to.have.been.calledWith(req.user.adminUsername);
        expect(res.status).not.to.have.been.called;
        expect(res.send).not.to.have.been.called;
      });
    });
  });
});
