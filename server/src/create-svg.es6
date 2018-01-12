const util = require('./util.es6');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const moment = require('moment');
const fs = require('fs-extra');
const svg2png = require('svg2png');

const createPermit = {};

const addApplicantInfo = (permit, frag) => {
  frag.querySelector('#permit-id').textContent = permit.paygovTrackingId.toUpperCase();

  frag.querySelector('#issue-date').textContent = moment(permit.createdAt, util.datetimeFormat)
    .format('MMM DD')
    .toUpperCase();

  frag.querySelector('#full-name').textContent = `${permit.firstName
    .substring(0, 18)
    .toUpperCase()} ${permit.lastName.substring(0, 18).toUpperCase()}`;

  frag.querySelector('#quantity').textContent = permit.quantity;

  //set additional trees to blank so that user can fill them in
  for (i = 1; i < permit.quantity; i++) {
    querySelector = '#additional-tree-' + i;
    frag.querySelector(querySelector).style = 'display:none';
  }

};

const addForestSpecificInfo = (permit, frag) => {
  frag.querySelector('#forest-name').textContent = permit.christmasTreesForest.forestName.toUpperCase();
  if (permit.christmasTreesForest.forestName.indexOf(' and ') > 0) {
    frag.querySelector('#national-forest').textContent = 'NATIONAL FORESTS';
  } else {
    frag.querySelector('#national-forest').textContent = 'NATIONAL FOREST';
  }

  frag.querySelector('#permit-year-vertical').textContent = permit.christmasTreesForest.startDate.getFullYear();

  frag.querySelector('#permit-expiration').textContent = moment(
    permit.christmasTreesForest.endDate,
    util.datetimeFormat
  )
    .format('MMM D, YYYY h:mm A')
    .toUpperCase();
  if (permit.christmasTreesForest.treeHeight > 0) {
    frag.querySelector('#tree-height').textContent = permit.christmasTreesForest.treeHeight;
  } else {
    frag.querySelector('#tree-height').textContent = 'N/A';
    frag.querySelector('#tree-height-feet').textContent = '';
  }
  if (permit.christmasTreesForest.stumpHeight > 0) {
    frag.querySelector('#stump-height').textContent = permit.christmasTreesForest.stumpHeight;
  } else {
    frag.querySelector('#stump-height').textContent = 'N/A';
    frag.querySelector('#stump-height-inches').textContent = '';
    frag.querySelector('#stump-height-or-less').textContent = '';
  }
  if (permit.christmasTreesForest.stumpDiameter > 0) {
    frag.querySelector('#stump-diameter').textContent = permit.christmasTreesForest.stumpDiameter;
  } else {
    frag.querySelector('#stump-diameter').textContent = 'N/A';
    frag.querySelector('#stump-diameter-inches').textContent = '';
  }
};

createPermit.generatePermitSvg = permit => {
  return new Promise((resolve, reject) => {
    fs.readFile('src/templates/christmas-trees/permit-design.svg', function read(err, svgData) {
      if (err) {
        reject(err);
      }
      try {
        const frag = JSDOM.fragment(svgData.toString('utf8'));
        addApplicantInfo(permit, frag);
        addForestSpecificInfo(permit, frag);
        resolve(frag.firstChild.outerHTML);
      } catch (err) {
        reject(err);
      }
    });
  });
};

createPermit.generatePermitPng = svgBuffer => {
  return new Promise((resolve, reject) => {
    svg2png(svgBuffer, {
      width: 740,
      height: 958
    })
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        console.error('ERROR', err);
      });
  });
};

module.exports = createPermit;
