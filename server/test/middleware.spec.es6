/* eslint-disable no-unused-expressions */
const chai = require('chai');
const jwt = require('jsonwebtoken');
const sinon = require('sinon');

const middleware = require('../src/services/middleware.es6');
const util = require('../src/services/util.es6');
const server = require('./mock-aws.spec.es6');
const vcapConstants = require('../src/vcap-constants.es6');

chai.use(require('sinon-chai'));

const { expect } = chai;

const testGetURL = '/forests';

describe.only('middleware', () => {
  it('should provide a status code to use for successful OPTIONS requests', done => {
    request(server)
      .options(testGetURL)
      .set('origin', 'http://localhost:4200')
      .expect(200, done);
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
            email: 'test@example.com',
            role: 'user'
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
            role: 'user',
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
        req = {
          user: {
            adminUsername: 'administrator',
            role: 'admin',
            email: '123@example.com'
          }
        };
      });

      it('should pass admin auth', () => {
        const next = sinon.spy();
        middleware.checkAdminPermissions(req, res, next);
        expect(next).to.have.been.calledWith();
        expect(res.status).not.to.have.been.called;
        expect(res.send).not.to.have.been.called;
      });
    });
  });

  describe('checkToken', () => {
    let res;
    beforeEach(() => {
      res = {
        status: sinon.stub().returnsThis(),
        send: sinon.spy()
      };
    });

    describe('with an invalid token', () => {
      let req;

      beforeEach(() => {
        req = {};
      });

      it('should call status with 401', () => {
        const next = sinon.spy();
        middleware.checkToken(req, res, next);
        expect(next).not.to.have.been.called;
        expect(res.status).to.have.been.calledWith(401);
        expect(res.send).to.have.been.called;
      });
    });

    describe('with a valid token', () => {
      let req;

      beforeEach(() => {
        req = {
          query: {
            t: jwt.sign({ data: 1 }, vcapConstants.PERMIT_SECRET)
          }
        };
      });

      it('should pass user auth and call next', () => {
        const next = sinon.spy();
        middleware.checkToken(req, res, next);
        expect(next).to.have.been.called;
        expect(res.status).not.to.have.been.called;
      });
    });
  });
});
