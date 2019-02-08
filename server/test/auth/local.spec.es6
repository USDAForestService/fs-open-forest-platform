/* eslint-disable no-unused-expressions */

const chai = require('chai');
const sinon = require('sinon');

const expect = chai.expect;

const util = require('../../src/services/util.es6');
const localAuth = require('../../src/auth/local.es6');


describe('local auth middleware', () => {
  let req; let
    res;

  beforeEach(() => {
    req = {};
    res = {};
  });

  describe('when production auth is disabled in test', () => {
    beforeEach(() => {
      sinon.stub(util, 'isTestAuthenticationEnabled').returns(false);
    });

    afterEach(() => {
      util.isTestAuthenticationEnabled.restore();
    });

    it('sets the test user', (done) => {
      localAuth(req, res, (err) => {
        expect(err).to.be.undefined;
        expect(req).to.have.property('user');
        expect(req.user).to.have.property('email', 'test@test.com');
        done();
      });
    });
  });

  describe('when production auth is enbled in test', () => {
    beforeEach(() => {
      sinon.stub(util, 'isTestAuthenticationEnabled').returns(true);
    });

    afterEach(() => {
      util.isTestAuthenticationEnabled.restore();
    });

    it('does not set the user', (done) => {
      localAuth(req, res, (err) => {
        expect(err).to.be.undefined;
        expect(req).not.to.have.property('user');
        done();
      });
    });
  });
});
