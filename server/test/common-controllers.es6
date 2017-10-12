'use strict';

const request = require('supertest');

const server = require('./mock-aws-app.es6');

describe('common controller tests', () => {
  describe('get pending', () => {
    it('should return a 200 response', done => {
      request(server)
        .get('/permits/applications/pending')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });
  describe('get accepted', () => {
    it('should return a 200 response', done => {
      request(server)
        .get('/permits/applications/accepted')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });
  describe('get rejected', () => {
    it('should return a 200 response', done => {
      request(server)
        .get('/permits/applications/rejected')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });
  describe('get cancelled', () => {
    it('should return a 200 response', done => {
      request(server)
        .get('/permits/applications/cancelled')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });
  describe('get expired', () => {
    it('should return a 200 response', done => {
      request(server)
        .get('/permits/applications/expired')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });
  describe('get invalid status', () => {
    it('should return a 404 response', done => {
      request(server)
        .get('/permits/applications/allofthem')
        .expect(404, done);
    });
  });
});
