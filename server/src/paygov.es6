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

/**
 * pay.gov utility
 * @exports paygov
 */
module.exports = paygov;
