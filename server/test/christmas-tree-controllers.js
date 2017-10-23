'use strict';

const request = require('supertest');

const server = require('./mock-aws-app.es6');

const chai = require('chai');
const expect = chai.expect;

describe('christmas tree controller tests', () => {
  describe('get forest info', () => {
    it('should return a 200 response', done => {
      request(server)
        .get('/forests/1/regulations')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });

    it('should include a field for species', done => {
      request(server)
        .get('/forests/1/regulations')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(function(res){
          expect(typeof res.body.forest.species).to.not.equal('undefined');
        })
        .expect(200, done);
    });

    it('should include a field for notes about the species', done => {
      request(server)
        .get('/forests/1/regulations')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(function(res){
          expect(typeof res.body.forest.species[0].notes).to.not.equal('undefined');
        })
        .expect(200, done);
    });

    it('should include a field for locations', done => {
      request(server)
        .get('/forests/1/regulations')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(function(res){
          expect(typeof res.body.forest.locations).to.not.equal('undefined');
        })
        .expect(200, done);
    });



    it('should return a 404 response when providing forest ID that does not exist.', done => {
      request(server)
        .get('/forests/-1205/regulations')
        .set('Accept', 'application/json')
        .expect(404, done);
    });
  });
});