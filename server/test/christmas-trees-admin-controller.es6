'use strict';

const jwt = require('jsonwebtoken');
const vcapConstants = require('../src/vcap-constants.es6');
require('./common.es6');

const request = require('supertest');
const moment = require('moment');

const treesDb = require('../src/models/trees-db.es6');
const { christmasTreesForests, christmasTreesPermits } = treesDb;

const christmasTreePermitApplicationFactory = require('./data/christmas-trees-permit-application-factory.es6');
const christmasTreesForestFactory = require('./data/christmas-trees-forest-factory.es6');
const server = require('./mock-aws.spec.es6');

const chai = require('chai');
const expect = chai.expect;
let permitId;

describe('christmas tree admin controller tests', () => {
  describe('given a forest in New York timezone', () => {
    let forest;
    let timezone = 'America/New_York';
    beforeEach(() => {
      forest = christmasTreesForests.build(christmasTreesForestFactory.create({
        id: 7,
        timezone,
      }));

      return forest.save();
    });

    afterEach(() => {
      return forest.destroy();
    });

    describe('given a Completed permit at 2018-02-01 00:01', () => {
      let permit;
      beforeEach(() => {
        permit = christmasTreesPermits.build(christmasTreePermitApplicationFactory.create({
          forestId: forest.id,
          christmasTreesForest: forest,
          updatedAt: new Date(moment.tz('2018-02-01 00:01:00', timezone)),
          status: 'Completed',
        }));

        return permit.save();
      });

      afterEach(() => {
        return permit.destroy();
      });

      describe('given report for 2018-02-01', () => {
        let startDate = '2018-02-01';
        let endDate = startDate;

        it('GET should return the permit', () => {
          return request(server)
            .get(`/admin/christmas-trees/permits/${forest.id}/${startDate}/${endDate}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function(res) {
              expect(res.body).to.include.all.keys('sumOfTrees', 'sumOfCost', 'numberOfPermits', 'permits');
              const { permits } = res.body;
              expect(permits).to.have.length(1);

              // We do a match here because the permitNumber is formatted
              // as 000001 while it's an integer in the model.
              expect(permits[0].permitNumber).to.match(new RegExp(`^0+${permit.permitNumber}$`));
            })
            .expect(200);
        });
      });

      describe('given report for 2018-01-31', () => {
        let startDate = '2018-01-31';
        let endDate = startDate;

        it('GET should return 200', () => {
          return request(server)
            .get(`/admin/christmas-trees/permits/${forest.id}/${startDate}/${endDate}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function(res) {
              expect(res.body).to.include.all.keys('sumOfTrees', 'sumOfCost', 'numberOfPermits', 'permits');
              const { permits } = res.body;
              expect(permits).to.have.length(0);
            })
            .expect(200);
        });
      });

      describe('given report for 2018-01-31 to 2018-02-01', () => {
        let startDate = '2018-01-31';
        let endDate = '2018-02-01';

        it('GET should return the permit', () => {
          return request(server)
            .get(`/admin/christmas-trees/permits/${forest.id}/${startDate}/${endDate}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function(res) {
              expect(res.body).to.include.all.keys('sumOfTrees', 'sumOfCost', 'numberOfPermits', 'permits');
              const { permits } = res.body;
              expect(permits).to.have.length(1);

              // We do a match here because the permitNumber is formatted
              // as 000001 while it's an integer in the model.
              expect(permits[0].permitNumber).to.match(new RegExp(`^0+${permit.permitNumber}$`));
            })
            .expect(200);
        });
      });
    });

    describe('given a Completed permit at 2018-02-01 11:59', () => {
      let permit;
      beforeEach(() => {
        permit = christmasTreesPermits.build(christmasTreePermitApplicationFactory.create({
          forestId: forest.id,
          christmasTreesForest: forest,
          updatedAt: new Date(moment.tz('2018-02-01 11:59:59', timezone)),
          status: 'Completed',
        }));

        return permit.save();
      });

      afterEach(() => {
        return permit.destroy();
      });

      describe('given report for 2018-02-01', () => {
        let startDate = '2018-02-01';
        let endDate = startDate;

        it('GET should return the permit', () => {
          return request(server)
            .get(`/admin/christmas-trees/permits/${forest.id}/${startDate}/${endDate}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function(res) {
              expect(res.body).to.include.all.keys('sumOfTrees', 'sumOfCost', 'numberOfPermits', 'permits');
              const { permits } = res.body;
              expect(permits).to.have.length(1);

              // We do a match here because the permitNumber is formatted
              // as 000001 while it's an integer in the model.
              expect(permits[0].permitNumber).to.match(new RegExp(`^0+${permit.permitNumber}$`));
            })
            .expect(200);
        });
      });

      describe('given report for 2018-01-31', () => {
        let startDate = '2018-01-31';
        let endDate = startDate;

        it('GET should return 200', () => {
          return request(server)
            .get(`/admin/christmas-trees/permits/${forest.id}/${startDate}/${endDate}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function(res) {
              expect(res.body).to.include.all.keys('sumOfTrees', 'sumOfCost', 'numberOfPermits', 'permits');
              const { permits } = res.body;
              expect(permits).to.have.length(0);
            })
            .expect(200);
        });
      });

      describe('given report for 2018-01-31 to 2018-02-01', () => {
        let startDate = '2018-01-31';
        let endDate = '2018-02-01';

        it('GET should return the permit', () => {
          return request(server)
            .get(`/admin/christmas-trees/permits/${forest.id}/${startDate}/${endDate}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function(res) {
              expect(res.body).to.include.all.keys('sumOfTrees', 'sumOfCost', 'numberOfPermits', 'permits');
              const { permits } = res.body;
              expect(permits).to.have.length(1);

              // We do a match here because the permitNumber is formatted
              // as 000001 while it's an integer in the model.
              expect(permits[0].permitNumber).to.match(new RegExp(`^0+${permit.permitNumber}$`));
            })
            .expect(200);
        });
      });
    });

    describe('given non-Completed permits dated 2018-02-01 00:01', () => {
      let permits;
      beforeEach(() => {
        // Just some arbitrary statuses
        permits = ['Hold', 'Accepted', 'Cancelled'].map(status =>
          christmasTreesPermits.build(christmasTreePermitApplicationFactory.create({
            forestId: forest.id,
            christmasTreesForest: forest,
            updatedAt: new Date(moment.tz('2018-02-01 00:01:00', timezone)),
            status,
          })));

        return Promise.all(permits.map(permit => permit.save()));
      });

      afterEach(() => {
        return Promise.all(permits.map(permit => permit.destroy()));
      });

      describe('given report for 2018-02-01', () => {
        let startDate = '2018-02-01';
        let endDate = startDate;

        it('GET should return 200', () => {
          return request(server)
            .get(`/admin/christmas-trees/permits/${forest.id}/${startDate}/${endDate}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function(res) {
              expect(res.body).to.include.all.keys('sumOfTrees', 'sumOfCost', 'numberOfPermits', 'permits');
              const { permits } = res.body;
              expect(permits).to.have.length(0);
            })
            .expect(200);
        });
      });
    });
  });

  let submittedPermit, completedPermit;
  it('POST new permit to use in admin reports', done => {
    const permitApplication = christmasTreePermitApplicationFactory.create();
    permitApplication.forestId = 3;
    permitApplication.forestAbbr = 'mthood';
    permitApplication.orgStructureCode = '11-06-06';
    request(server)
      .post('/forests/christmas-trees/permits')
      .send(permitApplication)
      .expect('Content-Type', /json/)
      .expect(res => {
        submittedPermit = res.body;
      })
      .expect(200, done);
  });
  it('PUT permit to complete transaction', done => {
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
      .expect(permitRes => {
        completedPermit = permitRes.body;
      })
      .expect(200, done);
  });
  it('GET permit details back by the admin', done => {
    request(server)
      .get(`/admin/christmas-trees/permits/${completedPermit.permitNumber}`)
      .expect('Content-Type', /json/)
      .expect(function(res) {
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
  it('GET permit details back should get 400 for invalid permit number', done => {
    request(server)
      .get('/admin/christmas-trees/permits/123')
      .set('Accept', 'application/json')
      .expect(function(res) {
        expect(res.body.errors[0].message).to.equal('Permit number 123 was not found.');
      })
      .expect(400, done);
  });

  it('PUT forest should return 200 when updating forest season dates', done => {
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

  it('PUT forest should return 403 when updating forest season dates that user do not have permission', done => {
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

  it('PUT forest should return 200 when updating district season dates', done => {
    const districtDates = {
      cuttingAreas:
        '{ "ELKCREEK": {"startDate": "2018-12-02 15:30:00Z", "endDate": "2018-12-09 21:30:00Z"},' +
        '"REDFEATHERLAKES": {"startDate": "2018-12-02 15:30:00Z", "endDate": "2018-12-10 21:30:00Z"},' +
        '"SULPHUR": {"startDate": "2018-11-01 12:00:00Z", "endDate": "2019-01-06 21:30:00Z"},' +
        '"CANYONLAKES": {"startDate": "2018-11-27 15:30:00Z", "endDate": "2018-12-10 21:30:00Z"} }'
    };
    request(server)
      .put('/admin/christmas-trees/forests/1')
      .send(districtDates)
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('PUT forest should return 400 with an invalid forest id with season dates', done => {
    const forestSeasonDates = {
      startDate: '2020-10-01',
      endDate: '2020-12-24'
    };
    request(server)
      .put('/admin/christmas-trees/forests/5')
      .send(forestSeasonDates)
      .expect('Content-Type', /json/)
      .expect(function(res) {
        expect(res.body.errors[0].message).to.equal('Forest 5 was not found.');
      })
      .expect(400, done);
  });
});
