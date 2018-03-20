'use strict';

/**
 * svg utility service for christmas trees
 * @module services/christmas-trees-permit-svg-util
 */

const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const moment = require('moment-timezone');
const fs = require('fs-extra');
const svg2png = require('svg2png');
const zpad = require('zpad');
const markdown = require('markdown').markdown;
const vcapConstants = require('../vcap-constants.es6');
const forestService = require('./forest.service.es6');
const christmasTreesPermitSvgUtil = {};

/**
 * @function addApplicantInfo - Add applicatnt information to the SVG fragment
 * @param {Object} permit
 * @param {Object} fragment
 */
const addApplicantInfo = (permit, frag) => {
  frag.querySelector('#permit-id_1_').textContent = zpad(permit.permitNumber, 8);

  frag.querySelector('#issue-date_1_').textContent = moment
    .tz(permit.createdAt, permit.christmasTreesForest.timezone)
    .format('MMM DD, YYYY')
    .toUpperCase();

  frag.querySelector('#full-name_1_').textContent = `${permit.firstName
    .substring(0, 18)
    .toUpperCase()} ${permit.lastName.substring(0, 18).toUpperCase()}`;

  frag.querySelector('#quantity_1_').textContent = permit.quantity;

  //set additional trees to blank so that user can fill them in
  for (let i = 1; i < permit.quantity; i++) {
    let querySelector = '#additional-tree-' + i + '-' + 1;
    frag.querySelector(querySelector).style = 'display:none';
    querySelector = '#additional-tree-' + i + '-' + 2;
    frag.querySelector(querySelector).style = 'display:none';
  }
};

/**
 * @function addForestSpecificInfo - Add forest specific information to the SVG fragment
 * @param {Object} permit
 * @param {Object} fragment
 */
const addForestSpecificInfo = (permit, frag) => {
  frag.querySelector('#forest-name_1_').textContent = permit.christmasTreesForest.forestNameShort.toUpperCase();
  if (permit.christmasTreesForest.forestNameShort.indexOf(' and ') > 0) {
    frag.querySelector('#national-forest_1_').textContent = 'NATIONAL FORESTS';
  } else {
    frag.querySelector('#national-forest_1_').textContent = 'NATIONAL FOREST';
  }
  frag.querySelector('#permit-year-vertical_1_').textContent = permit.christmasTreesForest.startDate.getFullYear();

  frag.querySelector('#permit-expiration_1_').textContent =
    moment
      .tz(permit.christmasTreesForest.endDate, permit.christmasTreesForest.timezone)
      .format('MMM D, YYYY')
      .toUpperCase() + ' MIDNIGHT';
  if (permit.christmasTreesForest.treeHeight > 0) {
    frag.querySelector('#tree-height_1_').textContent = permit.christmasTreesForest.treeHeight;
  } else {
    frag.querySelector('#tree-height_1_').textContent = 'N/A';
    frag.querySelector('#tree-height-feet_1_').textContent = '';
  }
  if (permit.christmasTreesForest.stumpHeight > 0) {
    frag.querySelector('#stump-height_1_').textContent = permit.christmasTreesForest.stumpHeight;
  } else {
    frag.querySelector('#stump-height_1_').textContent = 'N/A';
    frag.querySelector('#stump-height-inches_1_').textContent = '';
    frag.querySelector('#stump-height-or-less_1_').textContent = '';
  }
  if (permit.christmasTreesForest.stumpDiameter > 0) {
    frag.querySelector('#stump-diameter_1_').textContent = permit.christmasTreesForest.stumpDiameter;
  } else {
    frag.querySelector('#stump-diameter_1_').textContent = 'N/A';
    frag.querySelector('#stump-diameter-inches_1_').textContent = '';
  }
};

/**
 * @function generatePermitSvg - Generate Permit SVG from the permit data object
 * @param {Object} permit
 */
christmasTreesPermitSvgUtil.generatePermitSvg = permit => {
  return new Promise((resolve, reject) => {
    fs.readFile('src/templates/christmas-trees/permit-design.svg', function read(err, svgData) {
      if (err) {
        console.error('problem creating permit svg=', err);
        reject(err);
      }
      try {
        const frag = JSDOM.fragment(svgData.toString('utf8'));
        addApplicantInfo(permit, frag);
        addForestSpecificInfo(permit, frag);
        resolve(frag.firstChild.outerHTML);
      } catch (err) {
        console.error('problem creating permit svg=', err);
        reject(err);
      }
    });
  });
};

/**
 * @function generatePng - Generate Permit PNG from the permit SVG buffer
 * @param {Object} svgBuffer
 */
christmasTreesPermitSvgUtil.generatePng = svgBuffer => {
  return new Promise(resolve => {
    svg2png(svgBuffer, {
      width: 740,
      height: 958
    })
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        console.error(err);
      });
  });
};

/**
 * @function generateRulesHtml - Generate permit rules HTML from permit object
 * @param {Object} createHtmlBody
 * @param {Object} permit
 */
christmasTreesPermitSvgUtil.generateRulesHtml = (createHtmlBody, permit) => {
  return new Promise((resolve, reject) => {
    try {
      let rulesMarkdown = christmasTreesPermitSvgUtil.getRulesMarkdown(permit.christmasTreesForest.forestAbbr);
      if (rulesMarkdown) {
        let rulesHtml = markdown.toHTML(rulesMarkdown);
        rulesHtml = christmasTreesPermitSvgUtil.processRulesText(rulesHtml, permit);
        resolve(
          christmasTreesPermitSvgUtil.createRulesHtmlPage(createHtmlBody, rulesHtml, permit.christmasTreesForest)
        );
      } else {
        reject('problem reading rules markdown files', permit.permitId);
      }
    } catch (err) {
      console.error('problen creating rules html for permit ' + permit.permitId, err);
      reject(err);
    }
  });
};

/**
 * @function getRulesMarkdown - Get the rules markdown files for the given forest
 * @param {string} forestAbbr
 */
christmasTreesPermitSvgUtil.getRulesMarkdown = forestAbbr => {
  let permitRules = fs.readFileSync('frontend-assets/content/common/permit-rules.md');
  let forestRules = fs.readFileSync('frontend-assets/content/' + forestAbbr + '/rules-to-know/rules.md');
  if (permitRules && forestRules) {
    return `${permitRules}\n${forestRules}`;
  } else {
    return null;
  }
};

/**
 * @function createRulesHtmlPage - Generate HTML wrapper aroung the permit rules HTML content
 * @param {string} htmlBody
 * @param {string} rules
 * @param {string} forest
 */
christmasTreesPermitSvgUtil.createRulesHtmlPage = (htmlBody, rules, forest) => {
  let rulesHtml = '';
  if (htmlBody) {
    rulesHtml = '<html><body style="font-family:Arial; margin:20px;">';
  }
  rulesHtml +=
    '<div>' +
    '<h1 style="background-color:#000; text-align:center; padding:8px;">' +
    '<span style="color:#FFF; font-size: 36px;">CHRISTMAS TREE CUTTING RULES</span></h1>';

  rulesHtml +=
    '<h2><img alt="US Forest Service" class="fs-logo" role="img" src="' +
    vcapConstants.INTAKE_CLIENT_BASE_URL +
    '/assets/img/usfslogo.svg" width="50" style="vertical-align: middle;padding-right: 1rem;">' +
    forest.forestName.toUpperCase() +
    '</h2><br/>';
  rulesHtml +=
    'Christmas trees may be taken from the ' +
    forest.forestName +
    ' under the below rules and conditions. Failure to follow these rules and conditions may result in a fine<br/><br/>';
  var regex = new RegExp('"/assets/', 'g');
  rules = rules.replace(regex, '"' + vcapConstants.INTAKE_CLIENT_BASE_URL + '/assets/');

  rules = rules.replace(
    'alt="rules icon"',
    'alt="rules icon" style="width: 50px; vertical-align: middle; padding-right: 1rem;"'
  );
  rulesHtml += rules + '</div>';
  if (htmlBody) {
    rulesHtml += '</body></html>';
  }
  return rulesHtml;
};

/**
 * @function processRulesText - Parse and update rules HTML with forest specific keys
 * @param {string} rulesHtml
 * @param {Object} permit
 */
christmasTreesPermitSvgUtil.processRulesText = (rulesHtml, permit) => {
  let forest = permit.christmasTreesForest.dataValues;
  for (var key in forest) {
    if (forest.hasOwnProperty(key)) {
      let textToReplace = '{{' + key + '}}';
      rulesHtml = rulesHtml.replace(textToReplace, forest[key]);
      if (key === 'cuttingAreas' && Object.keys(forest.cuttingAreas).length > 0) {
        rulesHtml = christmasTreesPermitSvgUtil.parseCuttingAreaDates(rulesHtml, forest);
      }
    }
  }

  return rulesHtml;
};

/**
 * @function parseCuttingAreaDates - Parse and update rules HTML with forest cutting area keys
 * @param {string} rulesHtml
 * @param {string} forest
 */
christmasTreesPermitSvgUtil.parseCuttingAreaDates = (rulesText, forest) => {
  let cuttingAreaKeys = ['elkCreek', 'redFeatherLakes', 'sulphur', 'canyonLakes'];
  for (const key of cuttingAreaKeys) {
    const areaKey = key.toUpperCase();
    const cuttingAreas = forestService.parseCuttingAreas(forest.cuttingAreas);
    if (cuttingAreas && cuttingAreas[areaKey] && cuttingAreas[areaKey].startDate) {
      rulesText = rulesText.replace(
        '{{' + key + 'Date}}',
        christmasTreesPermitSvgUtil.formatCuttingAreaDate(
          forest.timezone,
          cuttingAreas[areaKey].startDate,
          cuttingAreas[areaKey].endDate
        )
      );
    }
  }
  return rulesText;
};

/**
 * @function formatCuttingAreaDate - Format cutting area start and end dates in the rules HTML
 * @param {string} forestTimezone
 * @param {string} startDate
 * @param {string} endDate
 */
christmasTreesPermitSvgUtil.formatCuttingAreaDate = (forestTimezone, startDate, endDate) => {
  const start = moment(startDate).tz(forestTimezone);
  const end = moment(endDate).tz(forestTimezone);
  let startFormat = 'MMM. D -';
  let endFormat = ' D, YYYY';

  if (start.month() !== end.month()) {
    endFormat = ' MMM. D, YYYY';
  }
  if (start.year() !== end.year()) {
    startFormat = 'MMM. D, YYYY - ';
  }
  return start.format(startFormat) + end.format(endFormat);
};

module.exports = christmasTreesPermitSvgUtil;
