/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const moment = require('moment');
const request = require('supertest');
const util = require('../src/services/util.es6');
require('./common.es6');
const { loginAdmin } = require('./data/auth-helper.es6');
const {
  bulkInsertPermits,
  createForest,
  createPermit,
  destroyAll
} = require('./data/db-helper.es6');
const server = require('./mock-aws.spec.es6');

describe('christmas tree admin controller', () => {
  let authorizedForest;
  let authorizedPermit;
  let authorizedForest2;
  let unauthorizedForest;
  let unauthorizedPermit;
  let _tooEarly;
  let _tooLate;
  let justRight;
  let justRight2;
  let justRight3;

  before(async () => {
    const authorizedForestAbbrevs = util.getAdminForests('TEST_USER');

    [authorizedForest, authorizedForest2, unauthorizedForest] = await Promise.all([
      createForest({ forestAbbr: authorizedForestAbbrevs[0], timezone: 'America/Denver' }),
      createForest({ forestAbbr: authorizedForestAbbrevs[1], timezone: 'America/Los_Angeles' }),
      createForest({
        forestName: 'Foo National Forest',
        description: 'Foooooooo, WA',
        forestAbbr: 'foo',
        forestNameShort: 'Foo'
      })
    ]);

    [authorizedPermit, unauthorizedPermit] = await Promise.all([
      createPermit({ status: 'Completed', forestId: authorizedForest.id }),
      createPermit({ status: 'Completed', forestId: unauthorizedForest.id })
    ]);

    // Necessary to specify the `updated` datetime
    [_tooEarly, _tooLate, justRight, justRight2, justRight3] = await bulkInsertPermits([...[
      '2018-10-31 11:59:59',
      '2018-11-03 00:00:00',
      '2018-11-01 00:00:01',
      '2018-11-02 23:59:59'
    ].map(updated => ({
      forestId: authorizedForest.id,
      created: moment().format(),
      updated: moment.tz(updated, authorizedForest.timezone).format()
    })),
    {
      forestId: authorizedForest2.id,
      created: moment().format(),
      updated: moment.tz('2018-11-01 00:00:01', authorizedForest2.timezone).format()
    }]);

    // Necessary to specify the `updated` datetime
    await bulkInsertPermits([
      '2018-10-31 11:59:59',
      '2018-11-03 00:00:00',
      '2018-11-01 00:00:01',
      '2018-11-02 23:59:59'
    ].map(updated => ({
      forestId: unauthorizedForest.id,
      created: moment().format(),
      updated: moment.tz(updated, unauthorizedForest.timezone).format()
    })));
  });

  after(async () => {
    await destroyAll();
  });

  describe('.getPermitSummaryReport', () => {
    const reportStartDate = '2018-11-01';
    const reportEndDate = '2018-11-02';

    const getPermitSummaryReportUrl = (forestId, startDate, endDate) => `/admin/christmas-trees/permits/summary?forestId=${forestId}&startDate=${startDate}&endDate=${endDate}`;

    describe('when not authenticated as an admin', () => {
      it('returns 403', (done) => {
        request(server).get(getPermitSummaryReportUrl())
          .expect(403, done);
      });
    });

    describe('when authenticated as an admin', () => {
      const agent = request.agent(server);

      before(loginAdmin(agent));

      describe('for a single forest', () => {
        it('returns a report with no permits when the forest id does not exist', (done) => {
          const forestId = -1009;
          agent.get(getPermitSummaryReportUrl(forestId, reportStartDate, reportEndDate))
            .expect('Content-Type', /json/)
            .expect(({ body }) => {
              expect(body.numberOfPermits).to.equal(0);
              expect(body.permits).to.be.empty;
            })
            .expect(200, done);
        });

        it('returns a report with no permits when the user is not authorized to view the forest ', (done) => {
          const forestId = unauthorizedForest.id;
          agent.get(getPermitSummaryReportUrl(forestId, reportStartDate, reportEndDate))
            .expect('Content-Type', /json/)
            .expect(({ body }) => {
              expect(body.numberOfPermits).to.equal(0);
              expect(body.permits).to.be.empty;
            })
            .expect(200, done);
        });

        it('returns a report containing only permits for authorized forest, start and end date', (done) => {
          const forestId = authorizedForest.id;
          agent.get(getPermitSummaryReportUrl(forestId, reportStartDate, reportEndDate))
            .expect('Content-Type', /json/)
            .expect(({ body }) => {
              expect(body.numberOfPermits).to.eq(2);
              const permitNumbers = body.permits.map(permit => permit.permitNumber);
              expect(permitNumbers).to.include(String(justRight.permit_number));
              expect(permitNumbers).to.include(String(justRight2.permit_number));
            })
            .expect(200, done);
        });
      });

      describe('for ALL forests', () => {
        const forestId = 'ALL';

        it('includes only permits that which the user is authorized to see', (done) => {
          agent.get(getPermitSummaryReportUrl(forestId, reportStartDate, reportEndDate))
            .expect('Content-Type', /json/)
            .expect(({ body }) => {
              expect(body.numberOfPermits).to.equal(3);
              const permitNumbers = body.permits.map(permit => permit.permitNumber);
              expect(permitNumbers).to.include(String(justRight.permit_number));
              expect(permitNumbers).to.include(String(justRight2.permit_number));
              expect(permitNumbers).to.include(String(justRight3.permit_number));
            })
            .expect(200, done);
        });
      });
    });
  });

  describe('.getPermitReport', () => {
    const getPermitReportUrl = permitNumber => `/admin/christmas-trees/permits/${permitNumber}`;

    describe('when not authenticated as an admin', () => {
      it('returns 403', (done) => {
        request(server).get(getPermitReportUrl())
          .expect(403, done);
      });
    });

    describe('when authenticated as an admin', () => {
      const agent = request.agent(server);

      before(loginAdmin(agent));

      // TODO - Should this return a 400, 404, or just an empty report?
      it('returns 400 with an appropriate error message when the permit number does not exist', (done) => {
        const permitNumber = -123;
        agent.get(getPermitReportUrl(permitNumber))
          .expect('Content-Type', /json/)
          .expect((res) => {
            expect(res.body.errors[0].message).to.equal(`Permit number ${permitNumber} was not found.`);
          })
          .expect(400, done);
      });

      // TODO - Should this return a 404 with a better error message, or just an empty report?
      it('returns 404 with an appropriate error message when the user is not authorized to view the permit id ', (done) => {
        const permitNumber = unauthorizedPermit.id;
        agent.get(getPermitReportUrl(permitNumber))
          .expect((res) => {
            expect(res.error.message).to.equal('cannot GET /admin/christmas-trees/permits/undefined (404)');
          })
          .expect(404, done);
      });

      it('returns a permit report with appropriate data when the permit exists and the user is authorized', (done) => {
        agent.get(getPermitReportUrl(authorizedPermit.permitNumber))
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
    });
  });

  describe('.updateForestDetails', () => {
    const updateForestDetailsUrl = forestId => `/admin/christmas-trees/forests/${forestId}`;

    describe('when not authenticated as an admin', () => {
      it('returns 403', (done) => {
        request(server).get(updateForestDetailsUrl())
          .expect(403, done);
      });
    });

    describe('when authenticated as an admin', () => {
      const agent = request.agent(server);

      before(loginAdmin(agent));

      it('PUT forest should return 200 when updating forest season dates', (done) => {
        const forestSeasonDates = { startDate: '2020-10-01', endDate: '2020-12-24' };

        agent.put(updateForestDetailsUrl(authorizedForest.id))
          .send(forestSeasonDates)
          .expect('Content-Type', /json/)
          .expect(200, done);
      });

      it('PUT forest should return 403 when updating forest season dates that user do not have permission', (done) => {
        const forestSeasonDates = { startDate: '2020-10-01', endDate: '2020-12-24' };

        agent.put(updateForestDetailsUrl(unauthorizedForest.id))
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

        agent.put(updateForestDetailsUrl(authorizedForest.id))
          .send(districtDates)
          .expect('Content-Type', /json/)
          .expect(200, done);
      });

      it('PUT forest should return 400 with an invalid forest id with season dates', (done) => {
        const unknownForestId = 123;
        const forestSeasonDates = { startDate: '2020-10-01', endDate: '2020-12-24' };

        agent.put(updateForestDetailsUrl(unknownForestId))
          .send(forestSeasonDates)
          .expect('Content-Type', /json/)
          .expect(({ body }) => {
            expect(body.errors[0].message).to.equal(`Forest ${unknownForestId} was not found.`);
          })
          .expect(400, done);
      });
    });
  });
});
