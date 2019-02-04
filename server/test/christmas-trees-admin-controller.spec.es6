const chai = require('chai');
// const jwt = require('jsonwebtoken');
const moment = require('moment');
const request = require('supertest');

const treesDb = require('../src/models/trees-db.es6');
// const vcapConstants = require('../src/vcap-constants.es6');

// const christmasTreePermitApplicationFactory = require('./data/christmas-trees-permit-application-factory.es6');
const christmasTreePermitFactory = require('./data/christmas-trees-permit-factory.es6');
const server = require('./mock-aws.spec.es6');

require('./common.es6');

const { expect } = chai;

const today = moment(new Date()).format('YYYY-MM-DD');
// let permitId;

describe('christmas tree admin controller', () => {
  // let submittedPermit;
  let completedPermit;

  before(async () => {
    const factory = christmasTreePermitFactory.create({});
    completedPermit = await treesDb.christmasTreesPermits.create(factory);
  });
  // permit.create(christmasTreePermitApplicationFactory.create({
  //   forestId: 3, // mt hood
  //   orgStructureCode: '11-06-06',
  //   expDate: new Date('2020-12-24T12:00:00.000Z')
  // })).then((p) => { submittedPermit = p; })
  // ]));

  describe('.getPermitSummaryReport', () => {
    it('GET should return a 200 response for the given admin report parameters forest, start and end date', (done) => {
      request(server)
        .get(`/admin/christmas-trees/permits/summary?forestId=1&startDate=${today}&endDate=${today}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect((res) => {
          expect(res.body).to.include.all.keys('sumOfTrees', 'sumOfCost', 'numberOfPermits', 'permits');
        })
        .expect(200, done);
    });
  });

  describe.only('.getPermitReport', () => {
    const getPermit = permitId => request(server)
      .get(`/admin/christmas-trees/permits/${permitId}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);

    it('GET permit details back by the admin', (done) => {
      getPermit(completedPermit.permitNumber)
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
      const unknownPermitId = 123;
      getPermit(unknownPermitId)
        .expect((res) => {
          expect(res.body.errors[0].message).to.equal(`Permit number ${unknownPermitId} was not found.`);
        })
        .expect(400, done);
    });
  });

  describe('.updateForestDetails', () => {
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
  });


  // it('POST new permit to use in admin reports', (done) => {
  //   const permitApplication = christmasTreePermitApplicationFactory.create();
  //   permitApplication.forestId = 3;
  //   permitApplication.forestAbbr = 'mthood';
  //   permitApplication.orgStructureCode = '11-06-06';
  //   request(server)
  //     .post('/forests/christmas-trees/permits')
  //     .send(permitApplication)
  //     .expect('Content-Type', /json/)
  //     .expect((res) => {
  //       submittedPermit = res.body;
  //     })
  //     .expect(200, done);
  // });

  // it('PUT permit to complete transaction', (done) => {
  //   const completeApplication = {
  //     permitId: submittedPermit.permitId,
  //     status: 'Completed'
  //   };
  //   const token = jwt.sign(
  //     {
  //       data: permitId
  //     },
  //     vcapConstants.PERMIT_SECRET
  //   );
  //   request(server)
  //     .put(`/forests/christmas-trees/permits?t=${token}`)
  //     .send(completeApplication)
  //     .expect('Content-Type', /json/)
  //     .expect((permitRes) => {
  //       completedPermit = permitRes.body;
  //     })
  //     .expect(200, done);
  // });
});
