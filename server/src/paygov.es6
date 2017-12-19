'use strict';

/**
 * pay.gov utility
 * @module paygov
 */

const request = require('request');
const xml = require('xml');
const xml2jsParse = require('xml2js').parseString;
const vcapConstants = require('./vcap-constants.es6');
const util = require('./util.es6');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const moment = require('moment');
const fs = require('fs-extra');

const paygov = {};

/**
 * Generate XML from the template to use for getting pay.gov transaction token.
 */
paygov.getXmlForToken = (forestAbbr, orgStructureCode, permit) => {
  const tcsAppID = vcapConstants.payGovAppId;

  const url_success = `${vcapConstants.intakeClientBaseUrl}applications/christmas-trees/forests/${forestAbbr}/permits/${
    permit.permitId
  }`;
  const url_cancel = `${vcapConstants.intakeClientBaseUrl}applications/christmas-trees/forests/${forestAbbr}/new`;
  const xmlTemplate = [
    {
      'S:Envelope': [
        {
          _attr: {
            'xmlns:S': 'http://schemas.xmlsoap.org/soap/envelope/'
          }
        },
        {
          'S:Header': []
        },
        {
          'S:Body': [
            {
              'ns2:startOnlineCollection': [
                {
                  _attr: {
                    'xmlns:ns2': 'http://fms.treas.gov/services/tcsonline'
                  }
                },
                {
                  startOnlineCollectionRequest: [
                    {
                      tcs_app_id: tcsAppID
                    },
                    {
                      agency_tracking_id: permit.permitId
                    },
                    {
                      transaction_type: 'Sale'
                    },
                    {
                      transaction_amount: permit.totalCost
                    },
                    {
                      language: 'en'
                    },
                    {
                      url_success: url_success
                    },
                    {
                      url_cancel: url_cancel
                    },
                    {
                      account_holder_name: permit.firstName + ' ' + permit.lastName
                    },
                    {
                      custom_fields: [
                        {
                          custom_field_1: orgStructureCode
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ];

  return xml(xmlTemplate);
};

/**
 * Generate XML from the template to use for completing pay.gov transaction.
 */
paygov.getXmlToCompleteTransaction = paygovToken => {
  const xmlTemplate = [
    {
      'S:Envelope': [
        {
          _attr: {
            'xmlns:S': 'http://schemas.xmlsoap.org/soap/envelope/'
          }
        },
        {
          'S:Header': []
        },
        {
          'S:Body': [
            {
              'ns2:completeOnlineCollection': [
                {
                  _attr: {
                    'xmlns:ns2': 'http://fms.treas.gov/services/tcsonline'
                  }
                },
                {
                  completeOnlineCollectionRequest: [
                    {
                      tcs_app_id: vcapConstants.payGovAppId
                    },
                    {
                      token: paygovToken
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ];
  return xml(xmlTemplate);
};

paygov.generateSvgPermit = permit => {
  return new Promise((resolve, reject) => {
    fs.readFile('src/templates/christmas-trees/permit-design.svg', function read(err, svgData) {
      if (err) {
        reject(err);
      }
      try {
        const frag = JSDOM.fragment(svgData.toString('utf8'));

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
        frag.querySelector('#permit-id').textContent = permit.paygovTrackingId.toUpperCase();
        frag.querySelector('#permit-id-small').textContent = permit.paygovTrackingId.toUpperCase();
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
        frag.querySelector('#issue-date').textContent = moment(permit.createdAt, util.datetimeFormat)
          .format('MMM DD')
          .toUpperCase();

        frag.querySelector('#last-name').textContent = permit.lastName.substring(0, 18).toUpperCase();
        frag.querySelector('#first-name').textContent = permit.firstName.substring(0, 18).toUpperCase();
        resolve(frag.firstChild.outerHTML);
      } catch (err) {
        reject(err);
      }
    });
  });
};

/**
 * pay.gov utility
 * @exports paygov
 */
module.exports = paygov;
