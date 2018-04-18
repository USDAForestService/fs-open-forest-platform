'use strict';

const expect = require('chai').expect;
const eAuth = require('../src/auth/usda-eauth.es6');
const sinon = require('sinon');
const util = require('../src/services/util.es6');

describe('Usda eauth', () => {
  it('should populate blank user admin user object', () => {
    const profile = {};
    const userObject = eAuth.setUserObject(profile);
    expect(userObject.adminUsername).to.equal('');
    expect(userObject.email).to.equal('');
    expect(userObject.role).to.equal('user');
    expect(userObject.forests.length).to.equal(0);
  });

  it('should populate user admin user object that only has first and last name and no email', () => {
    const profile = {
      usdafirstname: 'first',
      usdalastname: 'last'
    };
    const userObject = eAuth.setUserObject(profile);
    expect(userObject.adminUsername).to.equal('');
    expect(userObject.email).to.equal('');
    expect(userObject.role).to.equal('user');
    expect(userObject.forests.length).to.equal(0);
  });

  describe('admin user with forests', () => {
    let userRoleStub;
    let forestsStub;
    beforeEach(() => {
      userRoleStub = sinon.stub(util, "getUserRole");
      forestsStub = sinon.stub(util, "getAdminForests");
      userRoleStub.returns('admin');
      forestsStub.returns(['arp', 'mthood']);
    });

    afterEach(() => {
      userRoleStub.restore();
      forestsStub.restore();
    });

    it(
      'with first and last name and no email', () => {
        const profile = {
          usdafirstname: 'test',
          usdalastname: 'user'
        };
        const userObject = eAuth.setUserObject(profile);
        expect(userObject.adminUsername).to.equal('TEST_USER');
        expect(userObject.email).to.equal('');
        expect(userObject.role).to.equal('admin');
        expect(userObject.forests.length).to.equal(2);
      });

    it(
      'with firstname, lastname, and email', () => {
        const profile = {
          usdafirstname: 'test',
          usdalastname: 'user',
          usdaemail: 'test@test.com'
        };
        const userObject = eAuth.setUserObject(profile);
        expect(userObject.adminUsername).to.equal('TEST_USER');
        expect(userObject.email).to.equal('test@test.com');
        expect(userObject.role).to.equal('admin');
        expect(userObject.forests.length).to.equal(2);
      });

    it(
      'with fancy firstname, lastname, and email', () => {
        const profile = {
          usdafirstname: 'billy bob',
          usdalastname: 'test-test test',
          usdaemail: 'test@test.com'
        };
        const userObject = eAuth.setUserObject(profile);
        expect(userObject.adminUsername).to.equal('BILLY_BOB_TEST-TEST_TEST');
        expect(userObject.email).to.equal('test@test.com');
        expect(userObject.role).to.equal('admin');
        expect(userObject.forests.length).to.equal(2);
      });

  });
});
