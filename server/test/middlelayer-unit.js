'use strict';

var expect = require('chai').expect;
var noncommercial = require('../noncommercial.es6');
var nock = require('nock');
var noncommercialModelData = require('./data/noncommercial-model-test-data.es6');
var vcapConstants = require('../vcap-constants.es6');

describe('middle layer unit tests', () => {
  it('should fail middle layer auth', done => {
    nock(vcapConstants.middleLayerBaseUrl).post('/auth').reply(500, { status: 'authfail' });

    var success = () => {
      done();
    };

    var failure = error => {
      expect(error).to.not.be.null;
      expect(error.body, 'error.body should exist').to.not.be.undefined;
      expect(error.body.status, 'error.body.status should exist').to.not.be.undefined;
      expect(error.body.status).to.equal('authfail');
      done();
    };

    noncommercial
      .acceptApplication(noncommercialModelData.noncommercialModelPerson.create())
      .then(success)
      .catch(failure);
  });

  it('should pass middle layer auth, but fail mock middle layer send', done => {
    nock(vcapConstants.middleLayerBaseUrl).post('/auth').reply(200, { token: 'auth-token' });

    nock(vcapConstants.middleLayerBaseUrl)
      .post('/permits/applications/special-uses/noncommercial/')
      .reply(500, { status: 'fail-suds' });

    var success = () => {
      done();
    };

    var failure = error => {
      expect(error).to.not.be.null;
      expect(error.body, 'error.body should exist').to.not.be.undefined;
      expect(error.body.status, 'error.body.status should exist').to.not.be.undefined;
      expect(error.body.status).to.equal('fail-suds');
      done();
    };

    noncommercial
      .acceptApplication(noncommercialModelData.noncommercialModelPerson.create())
      .then(success)
      .catch(failure);
  });

  it('should pass middle layer auth, and pass middle layer send', done => {
    nock(vcapConstants.middleLayerBaseUrl).post('/auth').reply(200, { token: 'auth-token' });

    nock(vcapConstants.middleLayerBaseUrl)
      .post('/permits/applications/special-uses/noncommercial/')
      .reply(200, { status: 'success' });

    var success = response => {
      expect(response).to.not.be.null;
      expect(response.status, 'response.status should exist').to.not.be.undefined;
      expect(response.status).to.equal('success');
      done();
    };

    var failure = () => {
      done();
    };

    noncommercial
      .acceptApplication(noncommercialModelData.noncommercialModelPerson.create())
      .then(success)
      .catch(failure);
  });
});
