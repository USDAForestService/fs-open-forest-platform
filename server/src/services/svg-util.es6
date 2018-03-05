'use strict';

const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const moment = require('moment-timezone');
const fs = require('fs-extra');
const svg2png = require('svg2png');
const zpad = require('zpad');
const markdown = require('markdown').markdown;

const util = require('./util.es6');
const vcapConstants = require('../vcap-constants.es6');

const svgUtil = {};

const addApplicantInfo = (permit, frag) => {
  frag.querySelector('#permit-id_1_').textContent = zpad(permit.permitNumber, 8);

  frag.querySelector('#issue-date_1_').textContent = moment(permit.createdAt, util.datetimeFormat)
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

svgUtil.generatePermitSvg = permit => {
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

svgUtil.generatePng = svgBuffer => {
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

svgUtil.generateRulesHtml = (createHtmlBody, permit) => {
  return new Promise(resolve => {
    svgUtil.getRulesMarkdown(permit.christmasTreesForest.forestAbbr).then(rulesMarkdown => {
      console.log('result of rulesMarkdown!');
      let rulesHtml = markdown.toHTML(rulesMarkdown);
      console.log('result of rulesHtml!');
      svgUtil.processRulesText(rulesHtml, permit).then(rules => {
        console.log('result of processRulesText');
        resolve(svgUtil.createRulesHtmlPage(createHtmlBody, rules, permit.christmasTreesForest));
      });
    });
  });
};

svgUtil.getRulesMarkdown = forestAbbr => {
  return new Promise((resolve, reject) => {
    fs.readFile('frontend-assets/content/common/permit-rules.md', function read(err, permitRules) {
      if (err) {
        console.error('problem reading permit-rules markdown=', err);
        reject(err);
      }
      fs.readFile('frontend-assets/content/' + forestAbbr + '/rules-to-know/rules.md', function read(err, forestRules) {
        if (err) {
          console.error('problem reading rules markdown=', err);
          reject(err);
        }
        resolve(`${permitRules}\n${forestRules}`);
      });
    });
  });
};

svgUtil.createRulesHtmlPage = (htmlBody, rules, forest) => {
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
    vcapConstants.intakeClientBaseUrl +
    '/assets/img/usfslogo.svg" width="50" style="vertical-align: middle;padding-right: 1rem;">' +
    forest.forestName.toUpperCase() +
    '</h2><br/>';
  console.log('rulesHtml after usfslogo');
  rulesHtml +=
    'Christmas trees may be taken from the ' +
    forest.forestName +
    ' under the below rules and conditions. Failure to follow these rules and conditions may result in a fine<br/><br/>';
  var regex = new RegExp('"/assets/', 'g');
  rules = rules.replace(regex, '"' + vcapConstants.intakeClientBaseUrl + '/assets/');

  console.log('rulesHtml after assets');
  rules = rules.replace(
    'alt="rules icon"',
    'alt="rules icon" style="width: 50px; vertical-align: middle; padding-right: 1rem;"'
  );
  console.log('createRulesHtmlPage rules!');
  rulesHtml += rules + '</div>';
  if (htmlBody) {
    rulesHtml += '</body></html>';
  }
  console.log('createRulesHtmlPage rulesHtml');
  return rulesHtml;
};

svgUtil.processRulesText = (rulesHtml, permit) => {
  console.log('inside processRulesText');
  return new Promise(resolve => {
    let forest = permit.christmasTreesForest.dataValues;
    let rules = rulesHtml;
    for (var key in forest) {
      console.log('inside processRulesText key=', key);
      if (forest.hasOwnProperty(key)) {
        let textToReplace = '{{' + key + '}}';
        rules = rules.replace(textToReplace, forest[key]);
        if (key === 'cuttingAreas' && Object.keys(forest.cuttingAreas).length > 0) {
          rules = svgUtil.parseCuttingAreaDates(rules, forest);
        }
      }
    }
    resolve(rules);
  });
};

svgUtil.parseCuttingAreaDates = (rulesText, forest) => {
  console.log('inside parseCuttingAreaDates');
  let cuttingAreaKeys = ['elkCreek', 'redFeatherLakes', 'sulphur', 'canyonLakes'];
  for (const key of cuttingAreaKeys) {
    const areaKey = key.toUpperCase();
    const cuttingAreas = JSON.parse(forest.cuttingAreas);
    if (cuttingAreas[areaKey] && cuttingAreas[areaKey].startDate) {
      rulesText = rulesText.replace(
        '{{' + key + 'Date}}',
        svgUtil.formatCuttingAreaDate(forest.timezone, cuttingAreas[areaKey].startDate, cuttingAreas[areaKey].endDate)
      );
    }
  }
  return rulesText;
};

svgUtil.formatCuttingAreaDate = (forestTimezone, startDate, endDate) => {
  console.log('inside formatCuttingAreaDate');
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

module.exports = svgUtil;
