'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');

const passportConfig = require('../src/auth/passport-config.es6');
const vcapConstants = require('../src/vcap-constants.es6');


describe('getPassportUser', () => {
  let res;
  let next;

  beforeEach(() => {
    res = {
      send: sinon.spy()
    };

    next = sinon.spy();
  });

  describe('given no authenticated user', () => {
    let req;

    beforeEach(() => {
      req = {};

      passportConfig.getPassportUser(req, res, next);
    });

    it('calls send with no user', () => {
      expect(res.send).to.be.calledWith(undefined);
    });

    it('does not call next', () => {
      expect(next).not.to.have.been.called;
    });
  });

  describe('given a user', () => {
    let req;

    beforeEach(() => {
      req = {
        user: {
          email: 'awesome@sauce.com',
          role: 'user'
        }
      };

      passportConfig.getPassportUser(req, res, next);
    });

    it('does not call next', () => {
      expect(next).not.to.be.called;
    });

    it('calls send with the user', () => {
      expect(res.send).to.be.calledWith(req.user);
    });
  });
});

describe('logout', () => {
  it('should call req.logout and redirect to home for users who dont have the user role', () => {
    const redirect = sinon.spy();
    const logout = sinon.spy();
    const user = {
      email: 'awesome@sauce.com',
      role: 'admin'
    };
    passportConfig.logout(
      {
        user,
        logout
      },
      {
        redirect
      }
    );
    expect(redirect.callCount).to.equal(1);
    expect(logout.callCount).to.equal(1);
    expect(redirect.calledWith(`${vcapConstants.INTAKE_CLIENT_BASE_URL}/mbs`)).to.be.true;
  });
  it('should redirect to login.gov end session enpoint for users who have the user role', () => {
    const redirect = sinon.spy();
    const logout = sinon.spy();
    const user = {
      email: 'awesome@sauce.com',
      role: 'user',
      token: '1234'
    };
    passportConfig.logout(
      {
        user,
        logout
      },
      {
        redirect
      }
    );
    expect(redirect.callCount).to.equal(1);
    expect(redirect.calledWith(vcapConstants.INTAKE_CLIENT_BASE_URL)).to.be.false;
  }).timeout(6000);
});
