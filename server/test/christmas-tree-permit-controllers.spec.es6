/* eslint-disable no-unused-expressions */
const chai = require('chai');
const jwt = require('jsonwebtoken');
const sinon = require('sinon');
const request = require('supertest');

const logger = require('../src/services/logger.es6');
const vcapConstants = require('../src/vcap-constants.es6');

const christmasTreePermitApplicationFactory = require('./data/christmas-trees-permit-application-factory.es6');
const { createForest, createPermit, destroyAll } = require('./data/db-helper.es6');
const server = require('./mock-aws.spec.es6');

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
        forestId: DATA.openForest.id
      });
    });

    it('should return a 400 response with an unknown forest id', (done) => {
      permitApplication.forestId = null;

      postPermit(permitApplication)
        .expect(400, done);
    });

    it('should return 500 response when triggering an unknown app id error with pay.gov', (done) => {
      permitApplication.firstName = 'unknown';

      postPermit(permitApplication)
        .expect(500, done);
    });

    it('should return 500 response when triggering an agency tracking id error with pay.gov', (done) => {
      permitApplication.firstName = 'duplicate';

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

    it('should return a 400 response with a closed forest', (done) => {
      const closedApplication = christmasTreePermitApplicationFactory.create({
        forestId: DATA.closedForest.id
      });

      postPermit(closedApplication)
        .expect(400, done);
    });

    it('should ignore treeCost, totalCost', (done) => {
      permitApplication.treeCost = 1000;
      permitApplication.totalCost = 1000;

      postPermit(permitApplication)
        .expect(200)
        .then(({ body: { permitId } }) => {
          const token = jwt.sign({ data: permitId }, vcapConstants.PERMIT_SECRET);
          request(server)
            .get(`/forests/christmas-trees/permits/${permitId}?t=${token}`)
            .set('Accept', /json/)
            .expect(200)
            .expect(({ body }) => {
              expect(Number(body.totalCost)).to.equal(parseFloat(DATA.openForest.treeCost) * permitApplication.quantity);
            })
            .end(done);
        });
    });
  });

  describe('.updatePermitApplication', () => {
    const putPermitApplication = (application, token) => request(server)
      .put(`/forests/christmas-trees/permits?t=${token}`)
      .send(application);

    it('should return a 401 when updating with an invalid token', (done) => {
      const application = {};

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
  });

});
