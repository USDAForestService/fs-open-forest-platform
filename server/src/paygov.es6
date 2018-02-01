'use strict';

/**
 * pay.gov utility
 * @module paygov
 */
const jwt = require('jsonwebtoken');
const xml = require('xml');
const vcapConstants = require('./vcap-constants.es6');

const paygov = {};

/**
 * create success url
 */
paygov.createSuccessUrl = (forestAbbr, permitId) => {
  const claims = {
    issuer: 'trees-permit-api',
    subject: 'christmas tree permit orders',
    audience: 'fs-trees-permit-api-users'
  };
  const token = jwt.sign(
    {
      data: permitId
    },
    vcapConstants.permitSecret,
    claims
  );
  return `${vcapConstants.intakeClientBaseUrl}/christmas-trees/forests/${forestAbbr}/applications/permits/${permitId}`;
};

/**
 * Generate XML from the template to use for getting pay.gov transaction token.
 */
paygov.getXmlForToken = (forestAbbr, orgStructureCode, permit) => {
  const tcsAppID = vcapConstants.payGovAppId;
  let url_success = '';
  try {
    url_success = paygov.createSuccessUrl(forestAbbr, permit.permitId);
  } catch (e) {
    console.error('problem creating success url for permit ' + permit.id, e);
  }

  const url_cancel = `${vcapConstants.intakeClientBaseUrl}/christmas-trees/forests/${forestAbbr}/applications/${
    permit.permitId
  }`;

  const xmlTemplate = [
    {
      'soapenv:Envelope': [
        {
          _attr: {
            'xmlns:soapenv': 'http://schemas.xmlsoap.org/soap/envelope/'
          }
        },
        {
          'soapenv:Header': []
        },
        {
          'soapenv:Body': [
            {
              startOnlineCollection: [
                {
                  _attr: {
                    xmlns: 'http://fms.treas.gov/services/tcsonline'
                  }
                },
                {
                  startOnlineCollectionRequest: [
                    {
                      tcs_app_id: tcsAppID
                    },
                    {
                      agency_tracking_id: permit.permitId.substring(0, 20)
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
      'soapenv:Envelope': [
        {
          _attr: {
            'xmlns:soapenv': 'http://schemas.xmlsoap.org/soap/envelope/'
          }
        },
        {
          'soapenv:Header': []
        },
        {
          'soapenv:Body': [
            {
              completeOnlineCollection: [
                {
                  _attr: {
                    xmlns: 'http://fms.treas.gov/services/tcsonline'
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

paygov.getToken = result => {
  const startOnlineCollectionResponse =
    result['soapenv:Envelope']['soapenv:Body'][0]['startOnlineCollectionResponse'][0][
      'startOnlineCollectionResponse'
    ][0];
  return startOnlineCollectionResponse.token[0];
};

paygov.getResponseError = result => {
  const faultMesssage =
    result['soapenv:Envelope']['soapenv:Body'][0]['soapenv:Fault'][0]['detail'][0]['TCSServiceFault'][0];
  return {
    errorCode: faultMesssage.return_code,
    errorMessage: faultMesssage.return_detail
  };
};

paygov.getTrackingId = result => {
  const completeOnlineCollectionResponse =
    result['soapenv:Envelope']['soapenv:Body'][0]['completeOnlineCollectionResponse'][0][
      'completeOnlineCollectionResponse'
    ][0];
  return completeOnlineCollectionResponse.paygov_tracking_id[0];
};
/**
 * pay.gov utility
 * @exports paygov
 */
module.exports = paygov;
