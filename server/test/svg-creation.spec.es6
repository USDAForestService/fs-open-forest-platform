'use strict';

const chai = require('chai');
const expect = chai.expect;

const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const permitSvgService = require('../src/create-svg.es6');
const christmasTreesPermitFactory = require('./data/christmas-trees-permit-factory.es6');

describe('svg creation tests', () => {
  describe('no stump height', () => {
    let frag;
    before(done => {
      const permit = christmasTreesPermitFactory.create({'christmasTreesForest.stumpHeight': 0});
      permitSvgService.generatePermitSvg(permit)
        .then(svg => {
          frag = JSDOM.fragment(svg.toString('utf8'));
          done();
        });
    });
    it('should set stump-height to N/A', () => {
      expect(frag.querySelector('#stump-height_1_').textContent).to.equal('N/A');
    });
    it('should set stump-height-inches to blank', () => {
      expect(frag.querySelector('#stump-height-inches_1_').textContent).to.equal('');
    });
    it('should set stump-height-or-less to blank', () => {
      expect(frag.querySelector('#stump-height-or-less_1_').textContent).to.equal('');
    });
  });
  describe('no stump diameter', () => {
    let frag;
    before(done => {
      const permit = christmasTreesPermitFactory.create({'christmasTreesForest.stumpDiameter': 0});
      permitSvgService.generatePermitSvg(permit)
        .then(svg => {
          frag = JSDOM.fragment(svg.toString('utf8'));
          done();
        });
    });
    it('should set stump-diameter_1_ to N/A', () => {
      expect(frag.querySelector('#stump-diameter_1_').textContent).to.equal('N/A');
    });
    it('should set stump-diamer-inches_1_ to blank', () => {
      expect(frag.querySelector('#stump-diameter-inches_1_').textContent).to.equal('');
    });
  });

  describe('no tree height', () => {
    let frag;
    before(done => {
      const permit = christmasTreesPermitFactory.create({'christmasTreesForest.treeHeight': 0});
      permitSvgService.generatePermitSvg(permit)
        .then(svg => {
          frag = JSDOM.fragment(svg.toString('utf8'));
          done();
        });
    });
    it('should set tree-height_1_ to N/A', () => {
      expect(frag.querySelector('#tree-height_1_').textContent).to.equal('N/A');
    });
    it('should set tree-height-inches_1_ to blank', () => {
      expect(frag.querySelector('#tree-height-feet_1_').textContent).to.equal('');
    });
  });
  describe('multiple forests', () => {
    let frag;
    before(done => {
      const permit = christmasTreesPermitFactory.create({'christmasTreesForest.forestNameShort':'Name and Name'});
      permitSvgService.generatePermitSvg(permit)
        .then(svg => {
          frag = JSDOM.fragment(svg.toString('utf8'));
          done();
        });
    });
    it('should set #national-forest_1_ to NATIONAL FORESTS', () => {
      expect(frag.querySelector('#national-forest_1_').textContent).to.equal('NATIONAL FORESTS');
    });
  });
  describe('single forest', () => {
    let frag;
    before(done => {
      const permit = christmasTreesPermitFactory.create();
      permitSvgService.generatePermitSvg(permit)
        .then(svg => {
          frag = JSDOM.fragment(svg.toString('utf8'));
          done();
        });
    });
    it('should set #national-forest_1_ to NATIONAL FOREST', () => {
      expect(frag.querySelector('#national-forest_1_').textContent).to.equal('NATIONAL FOREST');
    });
  });
});
