'use strict';

const jwt = require('jsonwebtoken');
const vcapConstants = require('../src/vcap-constants.es6');

const request = require('supertest');
const emailSendStub = require('./common.es6');
const sinon = require('sinon');
const permitSvgService = require('../src/services/christmas-trees-permit-svg-util.es6');
const logger = require('../src/services/logger.es6');

const christmasTreePermitApplicationFactory = require('./data/christmas-trees-permit-application-factory.es6');
const christmasTreePermitFactory = require('./data/christmas-trees-permit-factory.es6');
const server = require('./mock-aws.spec.es6');

const christmasTreeController = require('../src/controllers/christmas-tree/permits.es6');

const chai = require('chai');
const expect = chai.expect;
let permitId;
let invalidPermitId = '1111a111-2222-11a1-aaa1-123456789012';
let paygovToken;
let tcsAppID;

describe('christmas tree controller permit tests', () => {
  describe.only('submit permit application mthood national forest', () => {
    it('POST should return a 200 response when submitted to get pay.gov token', done => {
      const permitApplication = christmasTreePermitApplicationFactory.create();
      permitApplication.forestId = 3;
      permitApplication.forestAbbr = 'mthood';
      permitApplication.orgStructureCode = '11-06-06';
      request(server)
        .post('/forests/christmas-trees/permits')
        .send(permitApplication)
        .expect('Content-Type', /json/)
        .expect(res => {
          permitId = res.body.permitId;
        })
        .expect(200, done);
    });
    it('PUT should return a 200 response when completing permit transaction with pay.gov', done => {
      const completeApplication = {
        permitId: permitId,
        status: 'Completed'
      };
      const token = jwt.sign(
        {
          data: permitId
        },
        vcapConstants.PERMIT_SECRET
      );

      request(server)
        .put(`/forests/christmas-trees/permits?t=${token}`)
        .send(completeApplication)
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
    it('GET should return a 200 response when requesting for already completed permit', done => {
      const token = jwt.sign(
        {
          data: permitId
        },
        vcapConstants.PERMIT_SECRET
      );

      const loggerSpy = sinon.spy(logger, 'info');
      request(server)
        .get(`/forests/christmas-trees/permits/${permitId}?t=${token}`)
        .set('Accept', /json/)
        .expect(res => {
          expect(res.body.firstName).to.equal('fName');
          expect(loggerSpy.called).to.be.true;
          const loggingStatement = `CONTROLLER: GET:christmasTreePermits.getOnePermit \
by ${res.body.emailAddress}:PUBLIC for ${res.body.permitId} at`;
          expect(loggerSpy.calledWith(sinon.match(loggingStatement))).to.be.true;
        })
        .expect(200, done);
    });
    it('GET should return a 404 response when requesting an invalid permit', done => {
      request(server)
        .get(`/forests/christmas-trees/permits/${invalidPermitId}`)
        .set('Accept', 'application/json')
        .expect(404, done);
    });
    it('POST should return a 400 response when submitted with invalid data', done => {
      const permitApplication = christmasTreePermitApplicationFactory.create();
      permitApplication.forestId = undefined;
      request(server)
        .post('/forests/christmas-trees/permits')
        .send(permitApplication)
        .expect('Content-Type', /json/)
        .expect(400, done);
    });
    it('POST should return 400 response when submitted to get pay.gov token \
    (mock returns error when firstName = "1" and lastName = "1")', done => {
      const permitApplication = christmasTreePermitApplicationFactory.create();
      permitApplication.firstName = '1';
      permitApplication.lastName = '1';
      permitApplication.forestId = 3;
      permitApplication.forestAbbr = 'mthood';
      permitApplication.orgStructureCode = '11-06-06';
      request(server)
        .post('/forests/christmas-trees/permits')
        .send(permitApplication)
        .expect('Content-Type', /json/)
        .expect(res => {
          permitId = res.body.errors[0].permit.permitId;
        })
        .expect(400, done);
    });
    it('PUT should return a 400 response when completing permit that has transaction errors within pay.gov', done => {
      const completeApplication = {
        permitId: permitId,
        status: 'Completed'
      };
      const token = jwt.sign(
        {
          data: permitId
        },
        vcapConstants.PERMIT_SECRET
      );
      request(server)
        .put(`/forests/christmas-trees/permits?t=${token}`)
        .send(completeApplication)
        .expect('Content-Type', /json/)
        .expect(400, done);
    });
    it('POST should return 500 response when submitted to get pay.gov token\
     (mock returns error when firstName = "1" and lastName = "2")', done => {
      const permitApplication = christmasTreePermitApplicationFactory.create();
      permitApplication.firstName = '1';
      permitApplication.lastName = '2';
      permitApplication.forestId = 3;
      permitApplication.forestAbbr = 'mthood';
      permitApplication.orgStructureCode = '11-06-06';
      request(server)
        .post('/forests/christmas-trees/permits')
        .send(permitApplication)
        .expect(500, done);
    });
    it('POST should return a 200 response when submitted to get pay.gov token', done => {
      const permitApplication = christmasTreePermitApplicationFactory.create();
      permitApplication.forestId = 3;
      permitApplication.forestAbbr = 'mthood';
      permitApplication.orgStructureCode = '11-06-06';
      request(server)
        .post('/forests/christmas-trees/permits')
        .send(permitApplication)
        .expect('Content-Type', /json/)
        .expect(res => {
          permitId = res.body.permitId;
          paygovToken = res.body.token;
        })
        .expect(200, done);
    });
    it('POST should return a 200 response when submitted to mock pay.gov with invalid credit card', done => {
      const processTransaction = {
        token: paygovToken,
        cc: '0000000000000000'
      };
      request(server)
        .post('/mock-pay-gov-process')
        .send(processTransaction)
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
    it('POST should return a 200 response when submitted to mock pay.gov\
     with invalid credit card with error code in last 4 digits', done => {
      const processTransaction = { token: paygovToken, cc: '0000000000001234' };
      request(server)
        .post('/mock-pay-gov-process')
        .send(processTransaction)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          expect(res.body.errorCode).to.equal('1234');
        })
        .expect(200, done);
    });
  });

  describe('submit permit application mthood national forest pay.gov errors', () => {
    it('POST should return a 200 response when submitted to get pay.gov token', done => {
      const permitApplication = christmasTreePermitApplicationFactory.create();
      permitApplication.forestId = 3;
      permitApplication.forestAbbr = 'mthood';
      permitApplication.orgStructureCode = '11-06-06';
      request(server)
        .post('/forests/christmas-trees/permits')
        .send(permitApplication)
        .expect('Content-Type', /json/)
        .expect(res => {
          permitId = res.body.permitId;
        })
        .expect(200, done);
    });

    it('GET should return a 200 response when getting details of "initiated" permit', done => {
      const token = jwt.sign(
        {
          data: permitId
        },
        vcapConstants.PERMIT_SECRET
      );
      request(server)
        .get(`/forests/christmas-trees/permits/${permitId}?t=${token}`)
        .set('Accept', 'application/json')
        .expect(200, done);
    });

    it('PUT should return a 200 response when completing permit transaction with pay.gov', done => {
      const completeApplication = {
        permitId: permitId,
        status: 'Completed'
      };
      const token = jwt.sign(
        {
          data: permitId
        },
        vcapConstants.PERMIT_SECRET
      );
      request(server)
        .put(`/forests/christmas-trees/permits?t=${token}`)
        .send(completeApplication)
        .expect('Content-Type', /json/)
        .expect(200, done);
    });

    it('GET should return a 404 response when getting details of "completed" permit', done => {
      request(server)
        .get(`/forests/christmas-trees/permits/${permitId}/details`)
        .expect(404, done);
    });

    it('GET should return a 404 response when getting details of an invalid permit', done => {
      request(server)
        .get(`/forests/christmas-trees/permits/${invalidPermitId}/details`)
        .expect(404, done);
    });
  });

  describe('submit permit application for open forest', () => {
    it('POST should return a 200 response when submitted to get pay.gov token', done => {
      const permitApplication = christmasTreePermitApplicationFactory.create();
      permitApplication.forestId = 3;
      permitApplication.forestAbbr = 'mthood';
      permitApplication.orgStructureCode = '11-06-06';
      request(server)
        .post('/forests/christmas-trees/permits')
        .send(permitApplication)
        .expect(200, done);
    });
  });

  describe('submit permit application for closed forest', () => {
    it('POST should return a 404 response when submitted to get pay.gov token', done => {
      const permitApplication = christmasTreePermitApplicationFactory.create();
      permitApplication.forestId = 4;
      permitApplication.forestAbbr = 'shoshone';
      permitApplication.orgStructureCode = '11-02-02';
      request(server)
        .post('/forests/christmas-trees/permits')
        .send(permitApplication)
        .expect(404, done);
    });
  });

  describe('submit permit application already cancelled on pay.gov', () => {
    it('POST should return a 200 response when submitted to get pay.gov token', done => {
      const permitApplication = christmasTreePermitApplicationFactory.create();
      permitApplication.forestId = 3;
      permitApplication.forestAbbr = 'mthood';
      permitApplication.orgStructureCode = '11-06-06';
      request(server)
        .post('/forests/christmas-trees/permits')
        .send(permitApplication)
        .expect('Content-Type', /json/)
        .expect(res => {
          permitId = res.body.permitId;
        })
        .expect(200, done);
    });
    it('PUT should return a 200 response when completing permit transaction with pay.gov', done => {
      const completeApplication = {
        permitId: permitId,
        status: 'Completed'
      };
      const token = jwt.sign(
        {
          data: permitId
        },
        vcapConstants.PERMIT_SECRET
      );
      request(server)
        .put(`/forests/christmas-trees/permits?t=${token}`)
        .send(completeApplication)
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
    it('POST should return a 404 response when submitted to cancel already completed permit application', done => {
      const cancelApplication = {
        permitId: permitId
      };
      request(server)
        .post('/forests/christmas-trees/permits/cancel')
        .send(cancelApplication)
        .expect(404, done);
    });
  });

  describe('cancelling permit application', () => {
    it('POST should return a 200 response when submitted to get pay.gov token', done => {
      const permitApplication = christmasTreePermitApplicationFactory.create();
      permitApplication.forestId = 3;
      permitApplication.forestAbbr = 'mthood';
      permitApplication.orgStructureCode = '11-06-06';
      request(server)
        .post('/forests/christmas-trees/permits')
        .send(permitApplication)
        .expect('Content-Type', /json/)
        .expect(res => {
          permitId = res.body.permitId;
        })
        .expect(200, done);
    });
    it('POST should return a 200 response when submitted to cancel existing permit application', done => {
      const cancelApplication = {
        permitId: permitId,
        status: 'Cancelled'
      };
      const token = jwt.sign(
        {
          data: permitId
        },
        vcapConstants.PERMIT_SECRET
      );
      request(server)
        .put(`/forests/christmas-trees/permits?t=${token}`)
        .send(cancelApplication)
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
    it('POST should return a 404 response when submitted to cancel an invalid permit application', done => {
      const cancelApplication = {
        permitId: invalidPermitId,
        status: 'Cancelled'
      };
      request(server)
        .put('/forests/christmas-trees/permits')
        .send(cancelApplication)
        .expect(404, done);
    });
  });

  describe('permit application redirect to mock paygov', () => {
    it('POST should return a 200 response when submitted to get pay.gov token', done => {
      const permitApplication = christmasTreePermitApplicationFactory.create();
      permitApplication.forestId = 3;
      permitApplication.forestAbbr = 'mthood';
      permitApplication.orgStructureCode = '11-06-06';
      request(server)
        .post('/forests/christmas-trees/permits')
        .send(permitApplication)
        .expect('Content-Type', /json/)
        .expect(res => {
          permitId = res.body.permitId;
          paygovToken = res.body.token;
          tcsAppID = res.body.tcsAppID;
        })
        .expect(200, done);
    });
    it('GET should return a 200 response when requested to open mock pay.gov', done => {
      request(server)
        .get(`/mock-pay-gov?token=${paygovToken}&tcsAppID=${tcsAppID}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
    it('GET should return a 200 response when requested to open mock pay.gov with token and tcsAppID', done => {
      request(server)
        .get(`/mock-pay-gov?token=${paygovToken}&tcsAppID=${tcsAppID}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
    it('GET should return a 404 response when requested to open mock pay.gov with invalid token and tcsAppID', done => {
      request(server)
        .get(`/mock-pay-gov?token=${invalidPermitId}&tcsAppID=${tcsAppID}`)
        .set('Accept', 'application/json')
        .expect(404, done);
    });
  });

  describe('print permit and rules after application submission', () => {
    it('POST should return a 200 response when submitted to get pay.gov token', done => {
      const permitApplication = christmasTreePermitApplicationFactory.create();
      permitApplication.forestId = 3;
      permitApplication.forestAbbr = 'mthood';
      permitApplication.orgStructureCode = '11-06-06';
      request(server)
        .post('/forests/christmas-trees/permits')
        .send(permitApplication)
        .expect('Content-Type', /json/)
        .expect(res => {
          permitId = res.body.permitId;
        })
        .expect(200, done);
    });
    it('PUT should return a 200 response when completing permit transaction with pay.gov', done => {
      const completeApplication = {
        permitId: permitId,
        status: 'Completed'
      };
      const token = jwt.sign(
        {
          data: permitId
        },
        vcapConstants.PERMIT_SECRET
      );
      request(server)
        .put(`/forests/christmas-trees/permits?t=${token}`)
        .send(completeApplication)
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
    it('GET should return a 200 response when getting permit printable svg', done => {
      request(server)
        .get(`/forests/christmas-trees/permits/${permitId}/print?permit=true`)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          expect(res.body).to.include.all.keys('result');
        })
        .expect(200, done);
    });
    it('GET should return a 200 response when getting permit rules printable html', done => {
      request(server)
        .get(`/forests/christmas-trees/permits/${permitId}/print?rules=true`)
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
        forestAbbr: 'mthood',
        orgStructureCode: '11-06-06'
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
