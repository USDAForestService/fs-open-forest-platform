'use strict';

const AWS = require('mock-aws');
const expect = require('chai').expect;
const sinon = require('sinon');

const mockS3 = require('./data/mock-s3.es6');
const util = require('../src/util.es6');

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
        cb(null, mockS3);
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
    before(() => (postStub = sinon.stub(util, 'request')));
    after(() => postStub.restore());
    it('should successfully post an auth the middle layer', done => {
      let token = 'token';
      postStub.resolves(token);
      util.middleLayerAuth().then(_token => {
        expect(_token).to.equal(token);
        done();
      });
    });
    it('should post an auth the middle layer and fail gracefully on error', done => {
      let err = new Error('kaboom');
      postStub.rejects(err);
      util.middleLayerAuth().catch(_err => {
        expect(_err).to.equal(err);
        done();
      });
    });
    it('should post an auth the middle layer and fail gracefully if statusCode is not 200', done => {
      let res = {
        statusCode: 400
      };
      postStub.rejects(res);
      util.middleLayerAuth().catch(_res => {
        expect(_res).to.equal(res);
        done();
      });
    });
  });
});
