'use strict';

/**
 * pay.gov utility
 * @module services/paygov
 */
const jwt = require('jsonwebtoken');
const xml = require('xml');
const vcapConstants = require('../vcap-constants.es6');

const paygov = {};

/**
 * @function createSuccessUrl - create success url for paygov request
 * @param {string} forestAbbr - forest abbreviation
 * @param {string} permitId - permit id
 * @return {string} - jwt signed token
 */
paygov.createToken = (permitId) => {
  const claims = {
    issuer: 'trees-permit-api',
    subject: 'christmas tree permit orders',
    audience: 'fs-trees-permit-api-users'
  };
  return jwt.sign(
    {
      data: permitId
    },
    vcapConstants.PERMIT_SECRET,
    claims
  );
};

/**
 * @function createSuccessUrl - create success url for paygov request
 * @param {string} forestAbbr - forest abbreviation
 * @param {string} permitId - permit id
 * @param {Boolean} cancel - whether to include the cancel query
 * @return {string} - success URL for payGov
 */
paygov.returnUrl = (forestAbbr, permitId, cancel) => {
  let cancelQuery = '';
  if (cancel) {
    cancelQuery = 'cancel=true&';
  }
  return new Promise((resolve, reject) =>{
    paygov.createToken(permitId)
      .then(token => {
        resolve(`${
          vcapConstants.INTAKE_CLIENT_BASE_URL
        }/christmas-trees/forests/${forestAbbr}/applications/permits/${permitId}?${cancelQuery}t=${token}`
        );
      })
      .catch(error => reject(error));
  });

};

/**
 * @function getXmlForToken - Generate XML from the template to use for getting pay.gov transaction token.
 * @param {string} forestAbbr - forest abbreviation
 * @param {string} possFinancialId - forest's financial id
 * @param {Object} permit - permit object from database
 * @return {string} - XML for payGov startOnlineCollection request
 */
paygov.getXmlForToken = (forestAbbr, possFinancialId, permit) => {
  const tcsAppID = vcapConstants.PAY_GOV_APP_ID;
  return new Promise((resolve, reject) => {
    Promise.all([
      paygov.returnUrl(forestAbbr, permit.permitId, false),
      paygov.returnUrl(forestAbbr, permit.permitId, true)
    ])
      .then((returnUrls) => {
        const xmlTemplate = [
          {
            'soap:Envelope': [
              {
                _attr: {
                  'xmlns:soap': 'http://schemas.xmlsoap.org/soap/envelope/'
                }
              },
              {
                'soap:Body': [
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
                            agency_tracking_id: permit.permitNumber
                          },
                          {
                            transaction_type: 'Sale'
                          },
                          {
                            transaction_amount: permit.totalCost
                          },
                          {
                            language: 'EN'
                          },
                          {
                            url_success: returnUrls[0]
                          },
                          {
                            url_cancel: returnUrls[1]
                          },
                          {
                            account_holder_name: permit.firstName + ' ' + permit.lastName
                          },
                          {
                            custom_fields: [
                              {
                                custom_field_1: possFinancialId
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
        resolve(xml(xmlTemplate));
      })
      .catch(error => reject(error));
  });
};

/**
 * @function getXmlToCompleteTransaction - Generate XML from the template to use for completing pay.gov transaction.
 * @param {string} paygovToken - payGov token
 * @return {string} - XML for payGov completeOnlineCollection request
 */
paygov.getXmlToCompleteTransaction = paygovToken => {
  const xmlTemplate = [
    {
      'soap:Envelope': [
        {
          _attr: {
            'xmlns:soap': 'http://schemas.xmlsoap.org/soap/envelope/'
          }
        },
        {
          'soap:Header': []
        },
        {
          'soap:Body': [
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
                      tcs_app_id: vcapConstants.PAY_GOV_APP_ID
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
 * @function getToken - Get token out of the paygov response XML
 * @param {Object} result - payGov result for startOnlineCollection
 * @return {string} - paygov token
 */
paygov.getToken = result => {
  const startOnlineCollectionResponse =
    result['S:Envelope']['S:Body'][0]['ns2:startOnlineCollectionResponse'][0]['startOnlineCollectionResponse'][0];
  return new Promise((resolve, reject) => {
    if (startOnlineCollectionResponse) {
      resolve(startOnlineCollectionResponse.token[0]);
    }
    reject(new Error ('no token'));
  });

  
};

/**
 * @function getResponseError - Get error out of the paygov response XML
 * @param {string} requestType - type of paygov request: startOnlineCollection/completeOnlineCollection
 * @param {Object} result - response error object
 */
paygov.getResponseError = (requestType, result) => {
  // let resultMesssage = { faultcode: '9999', faultstring: requestType };
  let responseError = { errorCode: '9999', errorMessage: requestType};
  return new Promise((resolve, reject) => {
    let faultMesssage = result['soapenv:Envelope']['soapenv:Body'][0]['soapenv:Fault'][0];
    if (faultMesssage) {
      responseError.errorCode = faultMesssage.errorCode;
      responseError.errorMessage = faultMesssage.faultMesssage;
      if (faultMesssage && faultMesssage['detail'][0]['TCSServiceFault'][0]) {
        responseError.faultcode = faultMesssage['detail'][0]['TCSServiceFault'][0].return_code;
        responseError.faultstring = faultMesssage['detail'][0]['TCSServiceFault'][0].return_detail;
      }
      resolve(responseError);
    }
    reject(responseError);
  });
};

/**
 * @function getTrackingId - Get paygov tracking id out of the paygov response XML
 * @param {Object} result - result from paygov request for completeOnlineCollection
 * @return {string} - paygov tracking id 
 */
paygov.getTrackingId = result => {
  const completeOnlineCollectionResponse =
    result['S:Envelope']['S:Body'][0]['ns2:completeOnlineCollectionResponse'][0]['completeOnlineCollectionResponse'][0];
  return new Promise((resolve, reject) => {
    if (completeOnlineCollectionResponse) {
      resolve(completeOnlineCollectionResponse.paygov_tracking_id[0]);
    }
    reject(new Error('Collection not completed'));
  });
    
};

module.exports = paygov;
