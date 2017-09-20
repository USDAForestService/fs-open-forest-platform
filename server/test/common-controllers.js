'use strict';

const expect = require('chai').expect;

const commonControllers = require('../src/controllers/common.es6');

describe('common controller tests', () => {
  describe('getAllOpenApplications', () => {
    it('should get all open applications', done => {
      let json = function() {
        done();
      };
      let status = function(status) {
        expect(status).to.equal(200);
        return { json };
      };
      commonControllers.getAllOpenApplications(null, { status });
    });
  });
});
