/* eslint-disable no-unused-expressions */
const chai = require('chai');
const jwt = require('jsonwebtoken');
const sinon = require('sinon');
const request = require('supertest');

const permitSvgService = require('../src/services/christmas-trees-permit-svg-util.es6');
const logger = require('../src/services/logger.es6');
const vcapConstants = require('../src/vcap-constants.es6');

const emailSendStub = require('./common.es6');

const christmasTreePermitApplicationFactory = require('./data/christmas-trees-permit-application-factory.es6');
const christmasTreeForestFactory = require('./data/christmas-trees-forest-factory.es6');
const christmasTreePermitFactory = require('./data/christmas-trees-permit-factory.es6');
const { createForest, createPermit, destroyAll } = require('./data/db-helper.es6');
const server = require('./mock-aws.spec.es6');

const christmasTreeController = require('../src/controllers/christmas-tree/permits.es6');

const { expect } = chai;

describe('christmas tree controller permit tests', () => {
  const DATA = {};

  before(async () => {
    DATA.openForest = await createForest();
    DATA.closedForest = await createForest({
      forestAbbr: 'clsd',
      orgStructureCode: '10-20-99T',
      endDate: new Date('2018-12-24T12:00:00.000Z')
    });
    DATA.initiatedPermit = await createPermit({ status: 'Initiated', forestId: DATA.openForest.id });
    DATA.completedPermit = await createPermit({ status: 'Completed', forestId: DATA.openForest.id });
    DATA.errorPermit = await createPermit({
      status: 'Error',
      forestId: DATA.openForest.id,
      paygovError: JSON.stringify({ errorCode: [], errorMessage: [] })
    });

    DATA.initiatedPermitToken = jwt.sign({ data: DATA.initiatedPermit.permitId }, vcapConstants.PERMIT_SECRET);
    DATA.completedPermitToken = jwt.sign({ data: DATA.completedPermit.permitId }, vcapConstants.PERMIT_SECRET);
    DATA.errorPermitToken = jwt.sign({ data: DATA.errorPermit.permitId }, vcapConstants.PERMIT_SECRET);
  });

  after(async () => {
    await destroyAll();
  });

  describe('.create', () => {
    const postPermit = application => request(server)
      .post('/forests/christmas-trees/permits')
      .send(application);

    let permitApplication;

    beforeEach(() => {
      permitApplication = christmasTreePermitApplicationFactory.create({
        forestId: DATA.openForest.id,
        forestAbbr: DATA.openForest.forestAbbr,
        orgStructureCode: DATA.openForest.orgStructureCode
      });
    });

    it('should return a 400 response with invalid data', (done) => {
      permitApplication.forestId = undefined;

      postPermit(permitApplication)
        .expect('Content-Type', /json/)
        .expect(400, done);
    });

    it('should return 400 response when submitted to get pay.gov token (mock returns error when firstName = "1" and lastName = "1")', (done) => {
      permitApplication.firstName = '1';
      permitApplication.lastName = '1';

      postPermit(permitApplication)
        .expect('Content-Type', /json/)
        .expect(400, done);
    });

    it('should return 500 response when submitted to get pay.gov token (mock returns error when firstName = "1" and lastName = "2")', (done) => {
      permitApplication.firstName = '1';
      permitApplication.lastName = '2';

      postPermit(permitApplication)
        .expect(500, done);
    });

    it('should return a 200 response with valid data', (done) => {
      postPermit(permitApplication)
        .expect('Content-Type', /json/)
        .expect(({ body }) => {
          expect(body.permitId).not.to.be.empty;
          expect(body.token).not.to.be.empty;
          expect(body.tcsAppID).not.to.be.empty;
        })
        .expect(200, done);
    });

    it('should return a 404 response with a closed forest', (done) => {
      const closedApplication = christmasTreePermitApplicationFactory.create({
        forestId: DATA.closedForest.id,
        forestAbbr: DATA.closedForest.forestAbbr,
        orgStructureCode: DATA.closedForest.orgStructureCode
      });

      postPermit(closedApplication)
        .expect(404, done);
    });
  });

  describe('.updatePermitApplication', () => {
    const putPermitApplication = (application, token) => request(server)
      .put(`/forests/christmas-trees/permits?t=${token}`)
      .send(application);

    it('should return a 401 when updating with an invalid token', (done) => {
      const application = { };

      putPermitApplication(application, null)
        .expect(401, done);
    });

    it('should return a 404 when cancelling a permit application with an invalid id', (done) => {
      const application = { permitId: '1111a111-2222-11a1-aaa1-123456789012', status: 'Cancelled' };

      putPermitApplication(application, DATA.completedPermitToken)
        .expect(404, done);
    });

    it('should return 400 for a completed permit', (done) => {
      const application = { permitId: DATA.completedPermit.permitId, status: 'Completed' };

      putPermitApplication(application, DATA.completedPermitToken)
        .expect(400, done);
    });

    it('should return 400 for a permit with errors', (done) => {
      const application = { permitId: DATA.errorPermit.permitId, status: 'Completed' };

      putPermitApplication(application, DATA.errorPermitToken)
        .expect(400, done);
    });

    describe('for an "Initiated" permit', () => {
      let permit;
      let token;

      beforeEach(async () => {
        permit = await createPermit({ status: 'Initiated', forestId: DATA.openForest.id });
        token = jwt.sign({ data: permit.permitId }, vcapConstants.PERMIT_SECRET);
      });

      afterEach(async () => {
        await permit.destroy();
      });

      it('should return a 200 response when completing an "Initiated" permit', (done) => {
        const application = { permitId: permit.permitId, status: 'Completed' };

        putPermitApplication(application, token)
          .expect('Content-Type', /json/)
          .expect(200, done);
      });

      it('should return a 200 response when cancelling an "Initiated" permit', (done) => {
        const application = { permitId: permit.permitId, status: 'Cancelled' };

        putPermitApplication(application, token)
          .expect('Content-Type', /json/)
          .expect(200, done);
      });
    });
  });

  describe('.getOnePermit', () => {
    const getPermit = (permitId, token) => request(server)
      .get(`/forests/christmas-trees/permits/${permitId}?t=${token}`)
      .set('Accept', /json/);

    it('should return a 401 response with an invalid token', (done) => {
      getPermit('1111a111-2222-11a1-aaa1-123456789012', null)
        .expect(401, done);
    });

    it('should return a 404 response with a valid token but an invalid permit', (done) => {
      getPermit('1111a111-2222-11a1-aaa1-123456789012', DATA.initiatedPermitToken)
        .expect(404, done);
    });

    it('should return a 400 response when getting details of an "Error" permit', (done) => {
      getPermit(DATA.errorPermit.permitId, DATA.errorPermitToken)
        .expect(400, done);
    });

    it('should return a 200 response when getting details of "Initiated" permit', (done) => {
      getPermit(DATA.initiatedPermit.permitId, DATA.initiatedPermitToken)
        .expect((res) => {
          expect(res.body.permitId).to.equal(DATA.initiatedPermit.permitId);
        })
        .expect(200, done);
    });

    it('should return a 200 response when getting details of a "Completed" permit', (done) => {
      getPermit(DATA.completedPermit.permitId, DATA.completedPermitToken)
        .expect((res) => {
          expect(res.body.permitId).to.equal(DATA.completedPermit.permitId);
        })
        .expect(200, done);
    });

    it('logs the successful request appropriately', (done) => {
      const loggerSpy = sinon.spy(logger, 'info');
      const logMsg = permit => `CONTROLLER: GET:christmasTreePermits.getOnePermit by ${permit.emailAddress}:PUBLIC for ${permit.permitId} at`;

      getPermit(DATA.completedPermit.permitId, DATA.completedPermitToken)
        .expect((res) => {
          expect(loggerSpy.called).to.be.true;
          expect(loggerSpy.calledWith(sinon.match(logMsg(res.body)))).to.be.true;
        })
        .expect(200, done);
    });
  });

  describe('.printPermit', () => {
    it('should return a 200 response when getting permit printable svg', (done) => {
      request(server)
        .get(`/forests/christmas-trees/permits/${DATA.completedPermit.permitId}/print?permit=true`)
        .expect('Content-Type', /json/)
        .expect((res) => {
          expect(res.body).to.include.all.keys('result');
        })
        .expect(200, done);
    });

    it('GET should return a 200 response when getting permit rules printable html', (done) => {
      request(server)
        .get(`/forests/christmas-trees/permits/${DATA.completedPermit.permitId}/print?rules=true`)
        .expect('Content-Type', /json/)
        .expect((res) => {
          expect(res.body).to.include.all.keys('result');
        })
        .expect(200, done);
    });
  });

  describe('unit tests for xmas tree controller', () => {
    it('should send and email and generate rules', (done) => {
      const permitApplication = christmasTreePermitFactory.create({
        firstName: 'Bonny',
        lastName: 'Clyde',
        forestId: 3,
        orgStructureCode: '11-06-06',
        christmasTreesForest: christmasTreeForestFactory.create({
          forestAbbr: 'mthood'
        })
      });
      const buf = Buffer.from('abc');
      const permitStub = sinon.stub(permitSvgService, 'generatePng').resolves(buf);

      christmasTreeController.generateRulesAndEmail(permitApplication)
        .then((data) => {
          expect(permitStub.called).to.be.true;
          expect(emailSendStub.called).to.be.true;
          expect(emailSendStub.getCall(0).args[4]).to.have.length(6);
          expect(data).to.equal();
          done();

          permitStub.restore();
        });
    });
  });
});
