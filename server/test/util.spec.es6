'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');

const util = require('../src/services/util.es6');

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

    it('should return admin role', () => {
      expect(util.getUserRole('TEST_USER')).to.equal('admin');
    });

    it('should return user role', () => {
      expect(util.getUserRole('notest@test.com')).to.equal('user');
    });

    it('should get admin forests', () => {
      expect(util.getAdminForests('TEST_USER')[0]).to.equal('arp');
    });
  });
});
