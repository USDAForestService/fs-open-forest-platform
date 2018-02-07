'use strict';

const assert = require('chai').assert;
const expect = require('chai').expect;
const nock = require('nock');
const request = require('supertest');
const sinon = require('sinon');

const ApplicationFile = require('../src/models/application-files.es6');
const server = require('./mock-aws.spec.es6');
const tempOutfitterPermitApplicationFactory = require('./data/tempoutfitter-permit-application-factory.es6');
const vcapConstants = require('../src/vcap-constants.es6');
const util = require('../src/util.es6');
const tempOutfitter = require('../src/controllers/temp-outfitter.es6');

const fileUploadUrl = '/permits/applications/special-uses/temp-outfitter/file';
const tempoutfitterUrl = '/permits/applications/special-uses/temp-outfitter';

const invalidIntakeControlNumber = 'ab69a474-aaaa-aaaa-aaaa-e9de93d92c10';
let intakeControlNumber;
let applicationId;

describe('tempoutfitter controllers', () => {
  it('POST should return a 201 status code and an intakeControlNumber', done => {
    const permitApplication = tempOutfitterPermitApplicationFactory.create();
    request(server)
      .post(tempoutfitterUrl)
      .send(permitApplication)
      .expect('Content-Type', /json/)
      .expect(/"applicationId":[\d]+/)
      .expect(res => {
        intakeControlNumber = res.body.appControlNumber;
        applicationId = res.body.applicationId;
      })
      .expect(201, done);
  });

  it('POST should return a 400 status code and an error when the region is missing', done => {
    const permitApplication = tempOutfitterPermitApplicationFactory.create();
    permitApplication.region = undefined;
    request(server)
      .post(tempoutfitterUrl)
      .send(permitApplication)
      .expect('Content-Type', /json/)
      .expect(res => {
        assert.lengthOf(res.body.errors, 1);
        assert.equal(res.body.errors[0].message, 'tempOutfitterApplications.region cannot be null');
      })
      .expect(400, done);
  });

  it('POST should return a 400 status code and an error when the region is too long', done => {
    const permitApplication = tempOutfitterPermitApplicationFactory.create();
    permitApplication.region = '123';
    request(server)
      .post(tempoutfitterUrl)
      .send(permitApplication)
      .expect('Content-Type', /json/)
      .expect(res => {
        assert.lengthOf(res.body.errors, 1);
        assert.equal(res.body.errors[0].message, 'region must be 2 characters in length');
      })
      .expect(400, done);
  });

  it('POST should return a 400 status code and an error when the region is too short', done => {
    const permitApplication = tempOutfitterPermitApplicationFactory.create();
    permitApplication.region = '1';
    request(server)
      .post(tempoutfitterUrl)
      .send(permitApplication)
      .expect('Content-Type', /json/)
      .expect(res => {
        assert.lengthOf(res.body.errors, 1);
        assert.equal(res.body.errors[0].message, 'region must be 2 characters in length');
      })
      .expect(400, done);
  });

  it('POST should return a 400 status code and 9 errors when the activity description fields are all over 400 characters', done => {
    const permitApplication = tempOutfitterPermitApplicationFactory.create();
    permitApplication.tempOutfitterFields.activityDescriptionFields.audienceDescription = util.getRandomString(401);
    permitApplication.tempOutfitterFields.activityDescriptionFields.descriptionOfCleanupAndRestoration = util.getRandomString(
      401
    );
    permitApplication.tempOutfitterFields.activityDescriptionFields.listOfGovernmentFacilities = util.getRandomString(
      401
    );
    permitApplication.tempOutfitterFields.activityDescriptionFields.listOfTemporaryImprovements = util.getRandomString(
      401
    );
    permitApplication.tempOutfitterFields.activityDescriptionFields.locationDescription = util.getRandomString(401);
    permitApplication.tempOutfitterFields.activityDescriptionFields.servicesProvided = util.getRandomString(401);
    permitApplication.tempOutfitterFields.activityDescriptionFields.statementOfAssignedSite = util.getRandomString(401);
    permitApplication.tempOutfitterFields.activityDescriptionFields.statementOfMotorizedEquipment = util.getRandomString(
      401
    );
    permitApplication.tempOutfitterFields.activityDescriptionFields.statementOfTransportationOfLivestock = util.getRandomString(
      401
    );
    request(server)
      .post(tempoutfitterUrl)
      .send(tempOutfitterPermitApplicationFactory.create(permitApplication))
      .expect(res => {
        assert.lengthOf(res.body.errors, 9);
      })
      .expect(400, done);
  });

  it('GET should return a 200 status code with a valid intakeControlNumber', done => {
    request(server)
      .get(`${tempoutfitterUrl}/${intakeControlNumber}`)
      .expect('Content-Type', /json/)
      .expect(/"applicationId":[\d]+/)
      .expect(200, done);
  });

  it('GET should return a 404 status code when the intakeControlNumber is not found', done => {
    request(server)
      .get(`${tempoutfitterUrl}/${invalidIntakeControlNumber}`)
      .expect(404, done);
  });

  it('GET should return a 500 status code when the intakeControlNumber is malformed', done => {
    request(server)
      .get(tempoutfitterUrl + '/' + 'imalformedControlNumber')
      .expect(500, done);
  });

  it('PUT should return a 200 status code when the status is Submitted', done => {
    request(server)
      .put(`${tempoutfitterUrl}/${intakeControlNumber}`)
      .send(
        tempOutfitterPermitApplicationFactory.create({
          status: 'Submitted'
        })
      )
      .expect('Content-Type', /json/)
      .expect(/"applicationId":[\d]+/)
      .expect(200, done);
  }).timeout(3000);

  it('PUT should return a 200 status code when the status is Cancelled', done => {
    request(server)
      .put(`${tempoutfitterUrl}/${intakeControlNumber}`)
      .send(
        tempOutfitterPermitApplicationFactory.create({
          status: 'Cancelled'
        })
      )
      .expect('Content-Type', /json/)
      .expect(/"applicationId":[\d]+/)
      .expect(200, done);
  }).timeout(3000);

  it('PUT should return a 200 status code when the status is Hold', done => {
    request(server)
      .put(`${tempoutfitterUrl}/${intakeControlNumber}`)
      .send(
        tempOutfitterPermitApplicationFactory.create({
          status: 'Hold',
          applicantMessage: 'Hold it, buddy.'
        })
      )
      .expect('Content-Type', /json/)
      .expect(/"applicationId":[\d]+/)
      .expect(200, done);
  }).timeout(3000);

  it('PUT should return a 200 status code when the status is Review', done => {
    request(server)
      .put(`${tempoutfitterUrl}/${intakeControlNumber}`)
      .send(
        tempOutfitterPermitApplicationFactory.create({
          status: 'Review'
        })
      )
      .expect('Content-Type', /json/)
      .expect(/"applicationId":[\d]+/)
      .expect(200, done);
  }).timeout(3000);

  it('PUT should return a 400 status code when the status is Bananas', done => {
    request(server)
      .put(`${tempoutfitterUrl}/${intakeControlNumber}`)
      .send(
        tempOutfitterPermitApplicationFactory.create({
          status: 'Bananas'
        })
      )
      .expect('Content-Type', /json/)
      .expect(res => {
        assert.lengthOf(res.body.errors, 1);
        assert.equal(res.body.errors[0].message, 'status is invalid');
      })
      .expect(400, done);
  });

  it('PUT should return a 200 status code when status is Accepted and a successful middle layer POST', done => {
    nock.cleanAll();
    nock(vcapConstants.middleLayerBaseUrl)
      .post('/auth')
      .reply(200, {
        token: 'auth-token'
      });
    nock(vcapConstants.middleLayerBaseUrl)
      .post('/permits/applications/special-uses/commercial/temp-outfitters/')
      .reply(200, {
        controlNumber: '1999'
      });
    request(server)
      .put(`${tempoutfitterUrl}/${intakeControlNumber}`)
      .send(
        tempOutfitterPermitApplicationFactory.create({
          status: 'Accepted'
        })
      )
      .expect('Content-Type', /json/)
      .expect(/"applicationId":[\d]+/)
      .expect(200, done);
  }).timeout(3000);
});

describe('tempoutfitter controllers revisions', () => {
  it('GET should return a 200 status code, a status of Accepted, a middle layer control number, and a revision history', done => {
    request(server)
      .get(`${tempoutfitterUrl}/${intakeControlNumber}`)
      .expect('Content-Type', /json/)
      .expect(res => {
        assert.equal(res.body.controlNumber, '1999');
        assert.equal(res.body.status, 'Accepted');
        assert.equal(res.body.revisions.length, 5);
        assert.equal(res.body.revisions[0].status, 'Submitted');
        assert.equal(res.body.revisions[1].status, 'Cancelled');
        assert.equal(res.body.revisions[2].status, 'Hold');
        assert.equal(res.body.revisions[3].status, 'Review');
        assert.equal(res.body.revisions[4].status, 'Accepted');
      })
      .expect(200, done);
  }).timeout(5000);
  it('DELETE should return a 404 status code', done => {
    request(server)
      .delete(`${tempoutfitterUrl}/${intakeControlNumber}`)
      .expect(404, done);
  });
});

describe('getApplicationFileNames', () => {
  let fakeIntakeControlNumber = 'potato';
  let app = {
    fakeIntakeControlNumber
  };
  let findAll;
  beforeEach(() => {
    findAll = sinon.stub(ApplicationFile, 'findAll').resolves(app);
  });
  afterEach(() => {
    findAll.restore();
  });
  it('GET /:appId/files should return all application file names', done => {
    request(server)
      .get(`${tempoutfitterUrl}/${fakeIntakeControlNumber}/files`)
      .expect(200, (err, res) => {
        expect(res.body.appId).to.equal(app.appId);
        done();
      });
  });
  it('GET /:appId/files should return a 404 not found if the application can not be found', done => {
    findAll.restore();
    findAll = sinon.stub(ApplicationFile, 'findAll').resolves();
    request(server)
      .get(`${tempoutfitterUrl}/${fakeIntakeControlNumber}/files`)
      .expect(404, done);
  });
  it('GET /:appId/files should return a 500 if an error occurs', done => {
    let error = 'No way, no how';
    findAll.restore();
    findAll = sinon.stub(ApplicationFile, 'findAll').rejects(new Error(error));
    request(server)
      .get(`${tempoutfitterUrl}/${fakeIntakeControlNumber}/files`)
      .expect(500, done);
  });
});

describe(`POST ${fileUploadUrl} accepts a file`, () => {
  it('should accept a guide-document file and return 201 created', done => {
    request(server)
      .post(fileUploadUrl)
      .type('multipart/form-data')
      .field('applicationId', applicationId)
      .field('documentType', 'guide-document')
      .set('Accept', 'text/html')
      .attach('file', './test/data/test.docx')
      .expect('Content-Type', /json/)
      .expect(/"applicationId":"[\d]+"/)
      .expect(res => {
        res.body.fileId;
      })
      .expect(201, err => {
        expect(err).to.be.null;
        done(err);
      });
  });

  it('should accept a good-standing-evidence file and return 201 created', done => {
    request(server)
      .post(fileUploadUrl)
      .type('multipart/form-data')
      .field('applicationId', applicationId)
      .field('documentType', 'good-standing-evidence')
      .set('Accept', 'text/html')
      .attach('file', './test/data/test.docx')
      .expect('Content-Type', /json/)
      .expect(/"applicationId":"[\d]+"/)
      .expect(201, err => {
        expect(err).to.be.null;
        done(err);
      });
  });

  it('should accept a acknowledgement-of-risk-form file and return 201 created', done => {
    request(server)
      .post(fileUploadUrl)
      .type('multipart/form-data')
      .field('applicationId', applicationId)
      .field('documentType', 'acknowledgement-of-risk-form')
      .set('Accept', 'text/html')
      .attach('file', './test/data/test.docx')
      .expect('Content-Type', /json/)
      .expect(/"applicationId":"[\d]+"/)
      .expect(201, err => {
        expect(err).to.be.null;
        done(err);
      });
  });

  it('should accept a insurance-certificate file and return 201 created', done => {
    request(server)
      .post(fileUploadUrl)
      .type('multipart/form-data')
      .field('applicationId', applicationId)
      .field('documentType', 'insurance-certificate')
      .set('Accept', 'text/html')
      .attach('file', './test/data/test.docx')
      .expect('Content-Type', /json/)
      .expect(/"applicationId":"[\d]+"/)
      .expect(201, err => {
        expect(err).to.be.null;
        done(err);
      });
  });

  it('should accept a operating-plan file and return 201 created', done => {
    request(server)
      .post(fileUploadUrl)
      .type('multipart/form-data')
      .field('applicationId', applicationId)
      .field('documentType', 'operating-plan')
      .set('Accept', 'text/html')
      .attach('file', './test/data/test.docx')
      .expect('Content-Type', /json/)
      .expect(/"applicationId":"[\d]+"/)
      .expect(201, err => {
        expect(err).to.be.null;
        done(err);
      });
  });
  it('should return a 500 error and an error message if an error occurs', done => {
    let error = 'nope';
    sinon.stub(ApplicationFile, 'create').rejects(new Error(error));
    request(server)
      .post(fileUploadUrl)
      .type('multipart/form-data')
      .field('applicationId', applicationId)
      .field('documentType', 'guide-document')
      .set('Accept', 'text/html')
      .attach('file', './test/data/test.docx')
      .expect(500, done);
  });
});

describe('file downloads', () => {
  it('GET should return a 200 status code and an array', done => {
    request(server)
      .get(`/permits/applications/special-uses/temp-outfitter/${applicationId}/files`)
      .expect(200, done);
  });
});

describe('unit tests for tempoutfitter ', () => {
  it('Existing "Hold" application should be create "Review" status', () => {
    const model = {
      status: 'Hold',
      authEmail: 'test@email.com'
    };
    const user = {
      role: 'user',
      email: 'test@email.com'
    };
    const submittedApplication = tempOutfitterPermitApplicationFactory.create();
    submittedApplication.status = 'Hold';

    tempOutfitter.updateApplicationModel(model, submittedApplication, user);
    expect(model.status).to.equal('Review');
  });
  it('Existing "Review" application should keep "Review" status', () => {
    const model = {
      authEmail: 'test@email.com'
    };
    const user = {
      role: 'user',
      email: 'test@email.com'
    };
    const submittedApplication = tempOutfitterPermitApplicationFactory.create();
    submittedApplication.status = 'Review';

    tempOutfitter.updateApplicationModel(model, submittedApplication, user);
    expect(model.status).to.equal('Review');
  });
});
