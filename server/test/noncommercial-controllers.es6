'use strict';

const nock = require('nock');
const request = require('supertest');

const noncommercialPermitApplicationFactory = require('./data/noncommercial-factory.es6');
const server = require('./mock-aws-app.es6');
const vcapConstants = require('../src/vcap-constants.es6');

const noncommercialUrl = '/permits/applications/special-uses/noncommercial';

let intakeControlNumber;

describe('noncommercial controller', () => {
  it('should return a 201 response and a db generated applicationId', done => {
    request(server)
      .post(noncommercialUrl)
      .set('Accept', 'application/json')
      .send(noncommercialPermitApplicationFactory.create())
      .expect('Content-Type', /json/)
      .expect(/"applicationId":[\d]+/)
      .expect(res => {
        intakeControlNumber = res.body.appControlNumber;
      })
      .expect(201, done);
  });

  it('should not allow sql injection (little Bobby Tables) to succeed and drop a table. If it succeeds, subsequent tests will fail.', done => {
    let data = noncommercialPermitApplicationFactory.create();
    data.applicantInfo.primaryFirstName = 'Robert"); DROP TABLE noncommercialApplications; --';
    request(server)
      .post(noncommercialUrl)
      .set('Accept', 'application/json')
      .send(data)
      .expect('Content-Type', /json/)
      .expect(201, done);
  });

  it('should return a 400 response and an error array when the permit application is invalid', done => {
    let data = noncommercialPermitApplicationFactory.create();
    data.applicantInfo.primaryFirstName = undefined;
    request(server)
      .post(noncommercialUrl)
      .set('Accept', 'application/json')
      .send(data)
      .expect('Content-Type', /json/)
      .expect({ errors: ['required-applicantInfo.primaryFirstName'] })
      .expect(400, done);
  });

  it('should return a 400 response and an error array when the permit application is invalid', done => {
    let data = noncommercialPermitApplicationFactory.create();
    data.applicantInfo.primaryFirstName = undefined;
    request(server)
      .post(noncommercialUrl)
      .set('Accept', 'application/json')
      .send(data)
      .expect('Content-Type', /json/)
      .expect({ errors: ['required-applicantInfo.primaryFirstName'] })
      .expect(400, done);
  });

  it('should return a 200 response and a db generated applicationId', done => {
    request(server)
      .get(noncommercialUrl + '/' + intakeControlNumber)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(/"applicationId":[\d]+/)
      .expect(200, done);
  });

  it('should return a 404 response when the control number is invalid', done => {
    request(server)
      .get(noncommercialUrl + '/' + 'ab69a474-aaaa-aaaa-aaaa-e9de93d92c10')
      .set('Accept', 'application/json')
      .expect(404, done);
  });

  it('should return a 400 response when the control number is invalid', done => {
    request(server)
      .get(noncommercialUrl + '/' + 'invalidControlNumber')
      .set('Accept', 'application/json')
      .expect(400, done);
  });

  it('updates a noncommercial app successfully with other than accept status', done => {
    nock(vcapConstants.middleLayerBaseUrl)
      .post('/auth')
      .reply(200, { token: 'auth-token' });
    nock(vcapConstants.middleLayerBaseUrl)
      .post('/permits/applications/special-uses/noncommercial/')
      .reply(200, { controlNumber: 'success' });
    request(server)
      .put(noncommercialUrl + '/806d3550-309d-46ea-b12a-f021f7b3d447')
      .set('Accept', 'application/json')
      .send(noncommercialPermitApplicationFactory.create({ status: 'Submitted' }))
      .expect('Content-Type', /json/)
      .expect(/"applicationId":[\d]+/)
      .expect(200, done);
  });

  it('app not found on update', done => {
    nock.cleanAll();
    nock('http://localhost:8080')
      .post('/auth')
      .reply(200, { token: 'auth-token' });
    nock('http://localhost:8080')
      .post('/permits/applications/special-uses/noncommercial/')
      .reply(200, { controlNumber: 'success' });
    request(server)
      .put(noncommercialUrl + '/806d3550-309d-46ea-b12a-f021f7b3d448')
      .set('Accept', 'application/json')
      .send(noncommercialPermitApplicationFactory.create())
      .expect(404, done);
  });

  it('updates a noncommercial app with accept status but fails middle layer', done => {
    nock.cleanAll();
    nock(vcapConstants.middleLayerBaseUrl)
      .post('/auth')
      .reply(201, { token: 'auth-token' });
    nock(vcapConstants.middleLayerBaseUrl)
      .post('/permits/applications/special-uses/noncommercial/')
      .reply(500, { status: 'fail' });
    request(server)
      .put(noncommercialUrl + '/806d3550-309d-46ea-b12a-f021f7b3d447')
      .set('Accept', 'application/json')
      .send(noncommercialPermitApplicationFactory.create({ status: 'Accepted' }))
      .expect(500, done);
  });

  it('updates a noncommercial app successfully with accept status', done => {
    nock.cleanAll();
    nock(vcapConstants.middleLayerBaseUrl)
      .post('/auth')
      .reply(200, { token: 'auth-token' });
    nock(vcapConstants.middleLayerBaseUrl)
      .post('/permits/applications/special-uses/noncommercial/')
      .reply(200, { controlNumber: 'success' });
    request(server)
      .put(noncommercialUrl + '/806d3550-309d-46ea-b12a-f021f7b3d447')
      .set('Accept', 'application/json')
      .send(noncommercialPermitApplicationFactory.create({ status: 'Accepted' }))
      .expect('Content-Type', /json/)
      .expect(/"applicationId":[\d]+/)
      .expect(200, done);
  });
});
