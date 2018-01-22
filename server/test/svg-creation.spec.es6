'use strict';

const chai = require('chai');
const expect = chai.expect;

const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const permitSvgService = require('../src/create-svg.es6');
const permit = {'permitId':'8f843ab9-6a97-42f9-9e6f-c08c7fb3e6db','forestId':3,'orgStructureCode':'11-06-06','firstName':'1','lastName':'4','emailAddress':'a@a.c','treeCost':'5.00','quantity':1,'totalCost':'5.00','status':'Completed','createdAt':new Date('2018-01-19T17:15:51.435Z'),'updatedAt':new Date('2018-01-19T17:15:59.077Z'),'paygovToken':'de29d79e-aeb0-49ec-9276-b8b5c6d820e2','paygovTrackingId':'C81BBB6BED','permitExpireDate':new Date('2018-12-24T12:00:00.000Z'),'paygovError':null,'christmasTreesForest':{'id':3,'forestName':'Mt. Hood National Forest','description':'Mt. Hood | Oregon | Portland, OR','forestAbbr':'mthood','forestUrl':'https://www.fs.usda.gov/main/mthood','treeHeight':12,'stumpHeight':6,'stumpDiameter':6,'startDate':new Date('2018-11-01T12:00:00.000Z'),'endDate':new Date('2018-12-24T12:00:00.000Z'),'orgStructureCode':'11-06-06','treeCost':'5.00','maxNumTrees':5,'allowAdditionalHeight':null,'createdAt':new Date('2018-01-19T17:13:03.471Z'),'updatedAt':new Date('2018-01-19T17:13:03.471Z'),'forestNameShort':'Mt. Hood'}};

describe.only('svg creation tests', () => {
  describe('no stump height', () => {
    let frag;
    before(done => {
      permit.christmasTreesForest.stumpHeight = 0;
      permitSvgService.generatePermitSvg(permit)
        .then(svg => {
          frag = JSDOM.fragment(svg.toString('utf8'));
          done();
        });
    });
    it('should set stump-height to N/A', () => {
      expect(frag.querySelector('#stump-height').textContent).to.equal('N/A');
    });
    it('should set stump-height-inches to blank', () => {
      expect(frag.querySelector('#stump-height-inches').textContent).to.equal('');
    });
    it('should set stump-height-or-less to blank', () => {
      expect(frag.querySelector('#stump-height-or-less').textContent).to.equal('');
    });
  });
});
