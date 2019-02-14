const chai = require('chai');
const jwt = require('jsonwebtoken');
const request = require('supertest');
const moment = require('moment-timezone');
const uuid = require('uuid/v4');
const zpad = require('zpad');

const vcapConstants = require('../src/vcap-constants.es6');
require('./common.es6');
const christmasTreePermitApplicationFactory = require('./data/christmas-trees-permit-application-factory.es6');
const { bulkDeletePermits, bulkInsertPermits, createForest } = require('./data/db-helper.es6');
const server = require('./mock-aws.spec.es6');

const { expect } = chai;

let permitId;
const today = moment(new Date()).format('YYYY-MM-DD');

describe('christmas tree admin controller tests', () => {
  it('GET should return a 200 response for the given admin report parameters forest, start and end date', (done) => {
    request(server)
      .get(`/admin/christmas-trees/permits/1/${today}/${today}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body).to.include.all.keys('sumOfTrees', 'sumOfCost', 'numberOfPermits', 'permits');
      })
      .expect(200, done);
  });
  let submittedPermit;
  let completedPermit;
  it('POST new permit to use in admin reports', (done) => {
    const permitApplication = christmasTreePermitApplicationFactory.create();
    permitApplication.forestId = 3;
    permitApplication.forestAbbr = 'mthood';
    permitApplication.orgStructureCode = '11-06-06';
    request(server)
      .post('/forests/christmas-trees/permits')
      .send(permitApplication)
      .expect('Content-Type', /json/)
      .expect((res) => {
        submittedPermit = res.body;
      })
      .expect(200, done);
  });
  it('PUT permit to complete transaction', (done) => {
    const completeApplication = {
      permitId: submittedPermit.permitId,
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
      .expect((permitRes) => {
        completedPermit = permitRes.body;
      })
      .expect(200, done);
  });
  it('GET permit details back by the admin', (done) => {
    request(server)
      .get(`/admin/christmas-trees/permits/${completedPermit.permitNumber}`)
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body.permits[0]).to.include.all.keys(
          'permitNumber',
          'issueDate',
          'quantity',
          'totalCost',
          'expireDate'
        );
      })
      .expect(200, done);
  });
  it('GET permit details back should get 400 for invalid permit number', (done) => {
    request(server)
      .get('/admin/christmas-trees/permits/123')
      .set('Accept', 'application/json')
      .expect((res) => {
        expect(res.body.errors[0].message).to.equal('Permit number 123 was not found.');
      })
      .expect(400, done);
  });

  it('PUT forest should return 200 when updating forest season dates', (done) => {
    const forestSeasonDates = {
      startDate: '2020-10-01',
      endDate: '2020-12-24'
    };
    request(server)
      .put('/admin/christmas-trees/forests/1')
      .send(forestSeasonDates)
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('PUT forest should return 403 when updating forest season dates that user do not have permission', (done) => {
    const forestSeasonDates = {
      startDate: '2020-10-01',
      endDate: '2020-12-24'
    };
    request(server)
      .put('/admin/christmas-trees/forests/2')
      .send(forestSeasonDates)
      .expect('Content-Type', /json/)
      .expect(403, done);
  });

  it('PUT forest should return 200 when updating district season dates', (done) => {
    const districtDates = {
      cuttingAreas:
        '{ "ELKCREEK": {"startDate": "2018-12-02 15:30:00Z", "endDate": "2018-12-09 21:30:00Z"},'
        + '"REDFEATHERLAKES": {"startDate": "2018-12-02 15:30:00Z", "endDate": "2018-12-10 21:30:00Z"},'
        + '"SULPHUR": {"startDate": "2018-11-01 12:00:00Z", "endDate": "2019-01-06 21:30:00Z"},'
        + '"CANYONLAKES": {"startDate": "2018-11-27 15:30:00Z", "endDate": "2018-12-10 21:30:00Z"} }'
    };
    request(server)
      .put('/admin/christmas-trees/forests/1')
      .send(districtDates)
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('PUT forest should return 400 with an invalid forest id with season dates', (done) => {
    const forestSeasonDates = {
      startDate: '2020-10-01',
      endDate: '2020-12-24'
    };
    request(server)
      .put('/admin/christmas-trees/forests/5')
      .send(forestSeasonDates)
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body.errors[0].message).to.equal('Forest 5 was not found.');
      })
      .expect(400, done);
  });

  describe.only('.getPermitSummaryReport', () => {
    const buildRawPermit = (forest, updated, params) => ({
      forest_id: forest.id,
      created: moment().format(),
      updated: moment.tz(updated, forest.timezone).format(),
      org_structure_code: forest.orgStructureCode,
      first_name: 'Smokey',
      last_name: 'Bear',
      email_address: 'a@a.c',
      tree_cost: '5.00',
      quantity: 1,
      total_cost: '5.00',
      status: 'Completed',
      ...params
    });

    let forest;
    const timezone = 'America/Denver';
    const startDate = '2017-11-01';
    const endDate = '2017-11-02';
    const tooEarly = { permit_id: uuid(), permit_number: zpad(991, 8) };
    const tooLate = { permit_id: uuid(), permit_number: zpad(992, 8) };
    const justRight = { permit_id: uuid(), permit_number: zpad(993, 8) };
    const justRight2 = { permit_id: uuid(), permit_number: zpad(994, 8) };

    before(async () => {
      forest = await createForest({
        id: 10,
        forestAbbr: 'foo',
        orgStructureCode: '99-99-99F',
        startDate: '2018-11-19T07:00:00Z',
        endDate: '2025-11-19T07:00:00Z',
        timezone
      });

      await bulkInsertPermits([
        buildRawPermit(forest, '2017-10-31 11:59:59', tooEarly),
        buildRawPermit(forest, '2017-11-03 00:00:00', tooLate),
        buildRawPermit(forest, '2017-11-01 00:00:01', justRight),
        buildRawPermit(forest, '2017-11-02 23:59:59', justRight2)
      ]);
    });

    after(async () => {
      await Promise.all([
        forest.destroy(),
        bulkDeletePermits([tooEarly, tooLate, justRight, justRight2].map(d => d.permit_id))
      ]);
    });

    it('returns the correct permits', (done) => {
      request(server)
        .get(`/admin/christmas-trees/permits/${forest.id}/${startDate}/${endDate}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(({ body }) => {
          expect(body.numberOfPermits).to.eq(2);
          const permitNumbers = body.permits.map(permit => permit.permitNumber);
          expect(permitNumbers).to.include(justRight.permit_number);
          expect(permitNumbers).to.include(justRight2.permit_number);
          expect(permitNumbers).not.to.include(tooEarly.permit_number);
          expect(permitNumbers).not.to.include(tooLate.permit_number);
        })
        .expect(200, done);
    });
  });
});
