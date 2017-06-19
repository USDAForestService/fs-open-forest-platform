'use strict';

var expect = require('chai').expect;

var noncommercialModelData = require('./data/noncommercial-model-test-data.es6');

var sendAcceptedNoncommercialApplicationToMiddleLayer = require('../middlelayer-interaction.es6');

var nock = require('nock');
var sinon = require('sinon');

describe('middle layer unit tests', () => {

  it('should fail middle layer auth', () => {

    let failingAuth = nock('http://localhost:8080')
                      .post('/auth')
                      .reply(500, { status: 'fail' });

    var success = sinon.spy();
    var failure = sinon.spy();

    sendAcceptedNoncommercialApplicationToMiddleLayer(noncommercialModelData.noncommercialModelPerson.create(),
      success,
      failure);

    expect(success.callCount).to.equal(0);
    expect(failure.callCount).to.equal(1);

  });

  // it('should pass middle layer auth, but fail mock middle layer send', () => {
  //
  //   app.post('/auth', mockAuthSuccess);
  //   app.post('/permits/applications/special-uses/noncommercial/', mockMiddleLayerFail);
  //   let server = app.listen(8080);
  //
  //   let status = undefined;
  //   let token = undefined;
  //
  //   sendAcceptedNoncommercialApplicationToMiddleLayer(noncommercialModelData.noncommercialModelPerson.create(),
  //     (response) => {
  //       expect(response).to.not.be.undefined;
  //     },
  //     (error) => {
  //       status = error.status;
  //       token = error.token;
  //     });
  //
  //   server.close();
  //
  //   expect(status).to.equal('fail-middle-layer');
  //   expect(token).to.equal('token');
  // });

});
