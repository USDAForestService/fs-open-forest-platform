'use strict';

const expect = require('chai').expect;
const nock = require('nock');

const noncommercial = require('../src/controllers/noncommercial.es6');
const noncommercialModelData = require('./data/noncommercial-model-test-data.es6');
const vcapConstants = require('../src/vcap-constants.es6');

describe('middle layer unit tests', () => {
  it('should fail middle layer auth', done => {
    nock(vcapConstants.middleLayerBaseUrl)
      .post('/auth')
      .reply(500, { status: 'authfail' });

    const success = () => {
      done();
    };

    const failure = response => {
      expect(response.error).to.not.be.null;
      expect(response.error.status, 'response.error.status should exist').to.not.be.undefined;
      expect(response.error.status).to.equal('authfail');
      done();
    };

    noncommercial
      .acceptApplication(noncommercialModelData.noncommercialModelPerson.create())
      .then(success)
      .catch(failure);
  });

  it('should pass middle layer auth, but fail mock middle layer send', done => {
    nock(vcapConstants.middleLayerBaseUrl)
      .post('/auth')
      .reply(200, { token: 'auth-token' });

    nock(vcapConstants.middleLayerBaseUrl)
      .post('/permits/applications/special-uses/noncommercial/')
      .reply(500, { status: 'fail-suds' });

    const success = () => {
      done();
    };

    const failure = response => {
      expect(response).to.not.be.null;
      expect(response.error, 'response.error should exist').to.not.be.undefined;
      expect(response.error.status, 'response.error.status should exist').to.not.be.undefined;
      expect(response.error.status).to.equal('fail-suds');
      done();
    };

    noncommercial
      .acceptApplication(noncommercialModelData.noncommercialModelPerson.create())
      .then(success)
      .catch(failure);
  });

  it('should pass middle layer auth, and pass middle layer send', done => {
    nock(vcapConstants.middleLayerBaseUrl)
      .post('/auth')
      .reply(200, { token: 'auth-token' });

    nock(vcapConstants.middleLayerBaseUrl)
      .post('/permits/applications/special-uses/noncommercial/')
      .reply(200, { status: 'success' });

    const success = response => {
      expect(response).to.not.be.null;
      expect(response.status, 'response.status should exist').to.not.be.undefined;
      expect(response.status).to.equal('success');
      done();
    };

    const failure = () => {
      done();
    };

    noncommercial
      .acceptApplication(noncommercialModelData.noncommercialModelPerson.create())
      .then(success)
      .catch(failure);
  });
});
