'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');

const util = require('../../src/services/util.es6');
const localAuth = require('../../src/auth/local.es6');


describe('local auth middleware', () => {
  let req, res;

  beforeEach(() => {
    req = {};
    res = {};
  });

  describe('when production auth is disabled in test', () => {
    beforeEach(() => {
      sinon.stub(util, 'isTestProductionAuthenticationEnabled').returns(false);
    });

    afterEach(() => {
      util.isTestProductionAuthenticationEnabled.restore();
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
      sinon.stub(util, 'isTestProductionAuthenticationEnabled').returns(true);
    });

    afterEach(() => {
      util.isTestProductionAuthenticationEnabled.restore();
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
