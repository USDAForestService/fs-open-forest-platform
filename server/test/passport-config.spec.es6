'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');

const passportConfig = require('../src/auth/passport-config.es6');
const util = require('../src/services/util.es6');
const vcapConstants = require('../src/vcap-constants.es6');

describe('getPassportUser', () => {
  it('should send a test user if running local or in CI', () => {
    const utilstub = sinon.stub(util, 'isLocalOrCI').returns(true);
    const send = sinon.spy();
    const user = {
      email: 'awesome@sauce.com',
      role: 'user'
    };
    passportConfig.getPassportUser(
      {
        user
      },
      {
        send
      }
    );
    expect(send.callCount).to.equal(1);
    expect(send.calledWith(user)).to.be.false;
    expect(send.firstCall.args[0])
      .to.be.an('object')
      .and.have.property('email');
    utilstub.restore();
  });

  it('should send the req.user', () => {
    const utilstub = sinon.stub(util, 'isLocalOrCI').returns(false);
    const send = sinon.spy();
    const user = {
      email: 'awesome@sauce.com',
      role: 'user'
    };
    passportConfig.getPassportUser(
      {
        user
      },
      {
        send
      }
    );
    expect(send.callCount).to.equal(1);
    expect(send.calledWith(user)).to.be.true;
    utilstub.restore();
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
    expect(redirect.calledWith(vcapConstants.INTAKE_CLIENT_BASE_URL)).to.be.true;
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
