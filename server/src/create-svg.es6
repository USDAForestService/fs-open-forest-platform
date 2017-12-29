const util = require('./util.es6');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const moment = require('moment');
const fs = require('fs-extra');
const sharp = require('sharp');

const createPermit = {};

const addRules = (permit, frag) => {
  let treeHeightStumpDiameter = '';
  if (permit.christmasTreesForest.treeHeight > 0 && permit.christmasTreesForest.stumpDiameter > 0) {
    treeHeightStumpDiameter += `TREE HEIGHT MUST BE ${permit.christmasTreesForest.treeHeight} FEET OR LESS`;
    treeHeightStumpDiameter += ` WITH DIAMETER ${
      permit.christmasTreesForest.stumpDiameter
    } INCHES OR LESS AT THE STUMP`;
  } else if (permit.christmasTreesForest.treeHeight > 0) {
    treeHeightStumpDiameter += `TREE HEIGHT MUST BE ${permit.christmasTreesForest.treeHeight} FEET OR LESS`;
  } else if (permit.christmasTreesForest.stumpDiameter > 0) {
    treeHeightStumpDiameter += `TREE DIAMETER MUST BE ${
      permit.christmasTreesForest.stumpDiameter
    } INCHES OR LESS AT THE STUMP`;
  }
  frag.querySelector('#tree-height-stump-diameter').textContent = treeHeightStumpDiameter;
  if (permit.christmasTreesForest.stumpHeight > 0) {
    frag.querySelector('#stump-height').textContent = `YOU MUST LEAVE A STUMP OF ${
      permit.christmasTreesForest.stumpHeight
    } INCHES OR LESS`;
  }
};

const addApplicantInfo = (permit, frag) => {
  frag.querySelector('#permit-id').textContent = permit.paygovTrackingId.toUpperCase();
  frag.querySelector('#permit-id-small').textContent = permit.paygovTrackingId.toUpperCase();

  frag.querySelector('#issue-date').textContent = moment(permit.createdAt, util.datetimeFormat)
    .format('MMM DD')
    .toUpperCase();

  frag.querySelector('#last-name').textContent = permit.lastName.substring(0, 18).toUpperCase();
  frag.querySelector('#first-name').textContent = permit.firstName.substring(0, 18).toUpperCase();
};
const addForestSpecificInfo = (permit, frag) => {
  frag.querySelector('#forest-name').textContent = permit.christmasTreesForest.forestName.toUpperCase();
  if (permit.forestId === 1) {
    frag.querySelector('#national-forest').textContent = 'NATIONAL FORESTS';
  }

  frag.querySelector('#permit-year-vertical').textContent = permit.christmasTreesForest.startDate.getFullYear();

  frag.querySelector(
    '#permit-harvest-expiration'
  ).textContent = `THIS PERMIT EXPIRES AT MIDNIGHT OF THE HARVEST DATE FILLED IN BELOW OR ${moment(
    permit.christmasTreesForest.endDate,
    util.datetimeFormat
  )
    .format('MMM D, YYYY h:mm A')
    .toUpperCase()}`;
  frag.querySelector('#permit-expiration').textContent = moment(
    permit.christmasTreesForest.endDate,
    util.datetimeFormat
  )
    .format('MMM D, YYYY h:mm A')
    .toUpperCase();
};

createPermit.generateSvgPermit = permit => {
  return new Promise((resolve, reject) => {
    fs.readFile('src/templates/christmas-trees/permit-design.svg', function read(err, svgData) {
      if (err) {
        reject(err);
      }
      try {
        const frag = JSDOM.fragment(svgData.toString('utf8'));
        addRules(permit, frag);
        addApplicantInfo(permit, frag);
        addForestSpecificInfo(permit, frag);

        //  console.log('FRAG', frag.firstChild.outerHTML);

        // sharp(Buffer.from(frag, 'utf8'))
        sharp('src/templates/christmas-trees/permit-design.svg')
          .resize(958, 740)
          .toBuffer()
          .then(data => {
            console.log('SUCCESS', data);
            resolve({
              svgBuffer: frag.firstChild.outerHTML,
              pngBuffer: data
            });
          })
          .catch(err => {
            console.log('ERROR', err);
          });
      } catch (err) {
        reject(err);
      }
    });
  });
};

module.exports = createPermit;
