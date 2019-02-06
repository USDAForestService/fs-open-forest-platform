const request = require('supertest');
const chai = require('chai');
const server = require('./mock-aws.spec.es6');

const { createForest, destroyAll } = require('./data/db-helper.es6');

const { expect } = chai;

describe('christmas tree controller forest tests', () => {
  let forest;

  before(async () => {
    forest = await createForest();
  });

  after(async () => {
    await destroyAll();
  });

  describe('get forests', () => {
    const getForests = () => request(server)
      .get('/forests')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);

    it('should return a 200 response', (done) => {
      getForests()
        .expect(200, done);
    });
    it('should return 1 forest', (done) => {
      getForests()
        .expect((res) => {
          expect(res.body.length).to.equal(1);
        })
        .expect(200, done);
    });
    it('should include name and ID for a forest', (done) => {
      getForests()
        .expect((res) => {
          expect(res.body[0]).to.include.all.keys('id', 'forestName', 'description', 'forestAbbr');
        })
        .expect(200, done);
    });
  });

  describe('get forest info', () => {
    const getForestInfo = forestAbbr => request(server)
      .get(`/forests/${forestAbbr}`)
      .set('Accept', 'application/json');

    it('should return a 200 response', (done) => {
      getForestInfo(forest.forestAbbr)
        .expect('Content-Type', /json/)
        .expect(200, done);
    });

    it('should include fields for species and locations', (done) => {
      getForestInfo(forest.forestAbbr)
        .expect('Content-Type', /json/)
        .expect(({ body }) => {
          expect(body).to.include.all.keys('startDate', 'endDate', 'treeCost', 'timezone');
        })
        .expect(200, done);
    });

    it('should include cutting areas as a json object', (done) => {
      getForestInfo(forest.forestAbbr)
        .expect('Content-Type', /json/)
        .expect(({ body }) => {
          expect(body).to.include.all.keys('cuttingAreas');
          expect(body.cuttingAreas !== null && typeof body.cuttingAreas === 'object');
        })
        .expect(200, done);
    });

    it('should return a 404 response when providing forest ID that does not exist.', (done) => {
      getForestInfo('-1205')
        .expect(404, done);
    });
  });
});
