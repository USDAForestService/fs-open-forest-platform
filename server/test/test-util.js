'use strict';

const AWS = require('mock-aws');
const expect = require('chai').expect;
const request = require('request');
const sinon = require('sinon');
const tempOutfitterTestData = require('./data/temp-outfitter-test-data.es6');
const util = require('../util.es6');

describe('util tests', () => {
  describe('getContentType', () => {
    it('should return the correct content-type', () => {
      const types = {
        pdf: 'application/pdf',
        rtf: 'application/rtf',
        doc: 'application/msword',
        docx: 'application/msword',
        xls: 'application/vnd.ms-excel',
        xlsx: 'application/vnd.ms-excel'
      };
      for (let ext in types) {
        expect(util.getContentType(ext)).to.equal(types[ext]);
      }
    });
  });

  describe('prepareCerts', () => {
    after(() => {
      AWS.mock('S3', 'getObject', function(params, cb) {
        cb(null, tempOutfitterTestData.mockS3Get);
      });
    });

    it('should prepare the certificates', done => {
      util.prepareCerts().then(certs => {
        expect(certs).to.be.an('array');
        done();
      });
    });

    it('should get rejected if s3 errors', done => {
      let s3err = new Error('kaboom!');
      AWS.mock('S3', 'getObject', function(params, cb) {
        cb(s3err);
      });
      util
        .prepareCerts()
        .then(() => {
          done('should not reach this');
        })
        .catch(err => {
          expect(err).to.equal(s3err);
          done();
        });
    });
  });

  describe('middleLayerAuth', () => {
    let postStub;
    before(() => (postStub = sinon.stub(request, 'post')));
    after(() => postStub.restore());
    it('should successfully post an auth the middle layer', done => {
      let token = 'token';
      postStub.callsFake((opts, cb) => cb(null, { statusCode: 200 }, { token }));
      util.middleLayerAuth().then(_token => {
        expect(_token).to.equal(token);
        done();
      });
    });
    it('should post an auth the middle layer and fail gracefully on error', done => {
      let err = 'kaboom';
      postStub.callsFake((opts, cb) => cb(err));
      util.middleLayerAuth().catch(_err => {
        expect(_err).to.equal(err);
        done();
      });
    });
    it('should post an auth the middle layer and fail gracefully if statusCode is not 200', done => {
      let res = { statusCode: 400 };
      postStub.callsFake((opts, cb) => cb(null, res));
      util.middleLayerAuth().catch(_res => {
        expect(_res).to.equal(res);
        done();
      });
    });
  });

  describe('getAllOpenApplications', () => {
    it('should get all open applications', done => {
      let json = function() {
        done();
      };
      let status = function(status) {
        expect(status).to.equal(200);
        return { json };
      };
      util.getAllOpenApplications(null, { status });
    });
  });

  describe('collate errors tests', () => {
    it('should push an error string with a prefix onto the error array for enum error', () => {
      let result = {
        errors: [
          {
            name: 'enum',
            property: 'instance.testfield'
          }
        ]
      };

      let errorArr = [];

      util.collateErrors(result, errorArr, 'prefixtest.');

      expect(errorArr).to.have.lengthOf(1);
      expect(errorArr[0]).to.equal('enum-prefixtest.testfield');
    });

    it('should push an error string without a prefix onto the error array for enum error', () => {
      let result = {
        errors: [
          {
            name: 'enum',
            property: 'instance.testfield'
          }
        ]
      };

      let errorArr = [];

      util.collateErrors(result, errorArr);

      expect(errorArr).to.have.lengthOf(1);
      expect(errorArr[0]).to.equal('enum-testfield');
    });

    it('should push an error string without a prefix onto the error array for required error not just instance', () => {
      let result = {
        errors: [
          {
            name: 'required',
            property: 'instance.testObj',
            argument: 'testField'
          }
        ]
      };

      let errorArr = [];

      util.collateErrors(result, errorArr);

      expect(errorArr).to.have.lengthOf(1);
      expect(errorArr[0]).to.equal('required-testObj.testField');
    });

    it('should push an error string without a prefix onto the error array for required error just instance', () => {
      let result = {
        errors: [
          {
            name: 'required',
            property: 'instance',
            argument: 'testField'
          }
        ]
      };

      let errorArr = [];

      util.collateErrors(result, errorArr);

      expect(errorArr).to.have.lengthOf(1);
      expect(errorArr[0]).to.equal('required-testField');
    });

    it('should push an error string with a prefix onto the error array for required error just instance', () => {
      let result = {
        errors: [
          {
            name: 'required',
            property: 'instance',
            argument: 'testField'
          }
        ]
      };

      let errorArr = [];

      util.collateErrors(result, errorArr, 'prefixtest.');

      expect(errorArr).to.have.lengthOf(1);
      expect(errorArr[0]).to.equal('required-prefixtest.testField');
    });
  });
});
