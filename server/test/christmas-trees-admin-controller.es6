/* eslint-disable no-unused-expressions */
const chai = require('chai');
const moment = require('moment');
const request = require('supertest');
const uuid = require('uuid');
const zpad = require('zpad');
const util = require('../src/services/util.es6');

const {
  bulkDeletePermits,
  bulkInsertPermits,
  createForest,
  createPermit,
  destroyAll
} = require('./data/db-helper.es6');
const server = require('./mock-aws.spec.es6');

require('./common.es6');

const { expect } = chai;

describe('christmas tree admin controller', () => {
  let authorizedForest;
  let authorizedPermit;
  let authorizedForest2;
  let authorizedPermit2;
  let unauthorizedForest;
  let unauthorizedPermit;

  before(async () => {
    const authorizedForestAbbrevs = util.getAdminForests('TEST_USER');

    authorizedForest = await createForest({
      forestAbbr: authorizedForestAbbrevs[0]
    });
    authorizedPermit = await createPermit({
      status: 'Completed',
      forestId: authorizedForest.id
    });

    authorizedForest2 = await createForest({
      forestAbbr: authorizedForestAbbrevs[1]
    });
    authorizedPermit2 = await createPermit({
      status: 'Completed',
      forestId: authorizedForest2.id
    });

    unauthorizedForest = await createForest({
      forestName: 'Foo National Forest',
      description: 'Foooooooo, WA',
      forestAbbr: 'foo',
      forestNameShort: 'Foo',
      timezone: 'America/Los_Angeles'
    });
    unauthorizedPermit = await createPermit({
      status: 'Completed',
      forestId: unauthorizedForest.id
    });
  });

  after(async () => {
    await destroyAll();
  });

  describe('.getPermitSummaryReport', () => {
    const today = moment(new Date()).subtract(5, 'days').format('YYYY-MM-DD');
    const tomorrow = moment(new Date()).add(5, 'days').format('YYYY-MM-DD');

    const getPermitSummaryReport = (forestId, startDate, endDate) => request(server)
      .get(`/admin/christmas-trees/permits/${forestId}/${startDate}/${endDate}`)
      .set('Accept', 'application/json');

    describe('for a single forest', () => {
      it('returns a 404 when the forest id does not exist', (done) => {
        const forestId = 123;
        getPermitSummaryReport(forestId, today, tomorrow)
          .expect(404, done);
      });

      // TODO - replaces the above when other changes are merged
      // it('returns a report with no permits when the forest id does not exist', (done) => {
      //   const forestId = 123;
      //   getPermitSummaryReport(forestId, today, tomorrow)
      //     .expect('Content-Type', /json/)
      //     .expect(({ body }) => {
      //       expect(body.numberOfPermits).to.equal(0);
      //       expect(body.permits).to.be.empty;
      //     })
      //     .expect(200, done);
      // });

      it('returns a 200 when the user is not authorized to view the forest ', (done) => {
        const forestId = unauthorizedForest.id;
        getPermitSummaryReport(forestId, today, tomorrow)
          .expect(200, done);
      });

      // TODO - replaces the above when other changes are merged
      // it('returns a report with no premits when the user is not authorized to view the forest ', (done) => {
      //   const forestId = unauthorizedForest.id;
      //   getPermitSummaryReport(forestId, today, tomorrow)
      //     .expect('Content-Type', /json/)
      //     .expect(({ body }) => {
      //       expect(body.numberOfPermits).to.equal(0);
      //       expect(body.permits).to.be.empty;
      //     })
      //     .expect(200, done);
      // });

      describe('with multiple permits', () => {
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
        const startDate = '2018-11-01';
        const endDate = '2018-11-02';
        const tooEarly = { permit_id: uuid(), permit_number: zpad(991, 8) };
        const tooLate = { permit_id: uuid(), permit_number: zpad(992, 8) };
        const justRight = { permit_id: uuid(), permit_number: zpad(993, 8) };
        const justRight2 = { permit_id: uuid(), permit_number: zpad(994, 8) };

        before(async () => {
          forest = await createForest({
            forestAbbr: 'foo',
            orgStructureCode: '99-99-99F',
            startDate: '2018-10-19T07:00:00Z',
            endDate: '2025-11-19T07:00:00Z',
            timezone
          });

          await bulkInsertPermits([
            buildRawPermit(forest, '2018-10-31 11:59:59', tooEarly),
            buildRawPermit(forest, '2018-11-03 00:00:00', tooLate),
            buildRawPermit(forest, '2018-11-01 00:00:01', justRight),
            buildRawPermit(forest, '2018-11-02 23:59:59', justRight2)
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
  });

  describe('.getPermitReport', () => {
    const getPermitReport = permitId => request(server)
      .get(`/admin/christmas-trees/permits/${permitId}`)
      .set('Accept', 'application/json');

    // TODO - Should this return a 400, 404, or just an empty report?
    it('returns 400 with an appropriate error message when the permit id does not exist', (done) => {
      const permitId = 123;
      getPermitReport(permitId)
        .expect('Content-Type', /json/)
        .expect((res) => {
          expect(res.body.errors[0].message).to.equal(`Permit number ${permitId} was not found.`);
        })
        .expect(400, done);
    });

    // TODO - Should this return a 404 with a better error message, or just an empty report?
    it('returns 404 with an appropriate error message when the user is not authorized to view the permit id ', (done) => {
      const permitId = unauthorizedPermit.id;
      getPermitReport(permitId)
        .expect((res) => {
          expect(res.error.message).to.equal('cannot GET /admin/christmas-trees/permits/undefined (404)');
        })
        .expect(404, done);
    });

    it('returns a permit report with appropriate data when the permit exists and the user is authorized', (done) => {
      getPermitReport(authorizedPermit.permitNumber)
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

  describe('.updateForestDetails', () => {
    const putForestDetails = (forestId, params) => request(server)
      .put(`/admin/christmas-trees/forests/${forestId}`)
      .send(params)
      .expect('Content-Type', /json/);

    it('PUT forest should return 200 when updating forest season dates', (done) => {
      const forestSeasonDates = { startDate: '2020-10-01', endDate: '2020-12-24' };

      putForestDetails(authorizedForest.id, forestSeasonDates)
        .expect(200, done);
    });

    it('PUT forest should return 403 when updating forest season dates that user do not have permission', (done) => {
      const forestSeasonDates = { startDate: '2020-10-01', endDate: '2020-12-24' };

      putForestDetails(unauthorizedForest.id, forestSeasonDates)
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

      putForestDetails(authorizedForest.id, districtDates)
        .expect(200, done);
    });

    it('PUT forest should return 400 with an invalid forest id with season dates', (done) => {
      const unknownForestId = 123;
      const forestSeasonDates = { startDate: '2020-10-01', endDate: '2020-12-24' };

      putForestDetails(unknownForestId, forestSeasonDates)
        .expect(({ body }) => {
          expect(body.errors[0].message).to.equal(`Forest ${unknownForestId} was not found.`);
        })
        .expect(400, done);
    });
  });
});
