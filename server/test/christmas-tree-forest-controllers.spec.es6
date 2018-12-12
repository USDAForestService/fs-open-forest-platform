'use strict';

const request = require('supertest');
const server = require('./mock-aws.spec.es6');
const chai = require('chai');
const expect = chai.expect;

describe('christmas tree controller permit tests', () => {
  describe('get forests', () => {
    it('should return a 200 response', done => {
      request(server)
        .get('/forests')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
    it('should return more than 0 forests', done => {
      request(server)
        .get('/forests')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(function(res) {
          expect(res.body.length).to.not.equal(0);
        })
        .expect(200, done);
    });
    it('should include name and ID for a forest', done => {
      request(server)
        .get('/forests')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(function(res) {
          expect(res.body[0]).to.include.all.keys('id', 'forestName', 'description', 'forestAbbr');
        })
        .expect(200, done);
    });
  });

  describe('get forest info', () => {
    it('should return a 200 response', done => {
      request(server)
        .get('/forests/arp')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });

    it('should include fields for species and locations', done => {
      request(server)
        .get('/forests/arp')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(function(res) {
          expect(res.body).to.include.all.keys('startDate', 'endDate', 'treeCost', 'timezone');
        })
        .expect(200, done);
    });

    it('should include cutting areas as a json object', done => {
      request(server)
        .get('/forests/arp')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(function(res) {
          expect(res.body).to.include.all.keys('cuttingAreas');
          expect(res.body.cuttingAreas !== null && typeof res.body.cuttingAreas === 'object');
        })
        .expect(200, done);
    });

    it('should return a 404 response when providing forest ID that does not exist.', done => {
      request(server)
        .get('/forests/-1205')
        .set('Accept', 'application/json')
        .expect(404, done);
    });
  });
});