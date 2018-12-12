'use strict';

/**
 * pay.gov utility
 * @module services/paygov
 */
const jwt = require('jsonwebtoken');
const xml = require('xml');

const vcapConstants = require('../vcap-constants.es6');
const util = require('./util.es6');
const paygovTemplates = require('./paygovTemplates.es6');
const paygov = {};

/**
 * @function createToken - create token for paygov request
 * @param {string} forestAbbr - forest abbreviation
 * @param {string} permitId - permit id
 * @return {Promise} - Promise that resolves to a jwt signed token
 */
paygov.createToken = (permitId) => {
  const claims = {
    issuer: 'trees-permit-api',
    subject: 'christmas tree permit orders',
    audience: 'fs-trees-permit-api-users'
  };
  
  const token = jwt.sign(
    {
      data: permitId
    },
    vcapConstants.PERMIT_SECRET,
    claims
  );
  return token;
};

/**
 * @function returnUrl - create return url for paygov request
 * @param {String} token - jwt token for url validation
 * @param {string} forestAbbr - forest abbreviation
 * @param {string} permitId - permit id
 * @param {Boolean} isCancelUrl - whether to include the cancel query
 * @return {Promise} - Promise that resolves to a success URL for payGov
 */
paygov.returnUrl = (token, forestAbbr, permitId, isCancelUrl) => {
  let cancelQuery = '';
  let completeRoute = '/permits';
  if (isCancelUrl) {
    cancelQuery = 'cancel=true&';
    completeRoute = '';
  }
  return `${
    vcapConstants.INTAKE_CLIENT_BASE_URL
  }/christmas-trees/forests/${forestAbbr}/applications${completeRoute}/${permitId}?${cancelQuery}t=${token}`;

};

/**
 * @function getXmlStartCollection - Generate XML from the template to use for getting pay.gov transaction token.
 * @param {string} forestAbbr - forest abbreviation
 * @param {string} possFinancialId - forest's financial id
 * @param {Object} permit - permit object from database
 * @return {Promise} - Promise that resolves to XML for payGov startOnlineCollection request
 */
paygov.getXmlStartCollection = (forestAbbr, possFinancialId, permit) => {
  const tcsAppID = vcapConstants.PAY_GOV_APP_ID;
  const token = paygov.createToken(permit.permitId);
    
  const startCollectionXML = JSON.parse(JSON.stringify(paygovTemplates.startCollection));
  startCollectionXML[0]['soap:Envelope'][1]['soap:Body'][0]['ns2:startOnlineCollection'][1]
    .startOnlineCollectionRequest = [
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
        url_success: paygov.returnUrl(token, forestAbbr, permit.permitId, false)
      },
      {
        url_cancel: paygov.returnUrl(token, forestAbbr, permit.permitId, true)
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
    ];
  return xml(startCollectionXML);
};

/**
 * @function getXmlToCompleteTransaction - Generate XML from the template to use for completing pay.gov transaction.
 * @param {string} paygovToken - payGov token
 * @return {string} - XML for payGov completeOnlineCollection request
 */
paygov.getXmlToCompleteTransaction = paygovToken => {
  const xmlTemplate = JSON.parse(JSON.stringify(paygovTemplates.completeTransaction));
  const requestDetails = [
    {
      tcs_app_id: vcapConstants.PAY_GOV_APP_ID
    },
    {
      token: paygovToken
    }
  ];
  xmlTemplate[0]['soap:Envelope'][2]['soap:Body'][0]['ns2:completeOnlineCollection'][1]
    .completeOnlineCollectionRequest = requestDetails;
  return xml(xmlTemplate);
};

/**
 * @function getToken - Get token out of the paygov response XML
 * @param {Object} result - payGov result for startOnlineCollection
 * @return {string} - paygov token
 */
paygov.getToken = result => {
  return new Promise((resolve, reject) => {
    const startOnlineCollectionResponse =
      result['S:Envelope']['S:Body'][0]['ns2:startOnlineCollectionResponse'][0]['startOnlineCollectionResponse'][0];
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
  let responseError = { errorCode: '9999', errorMessage: requestType};
  return new Promise((resolve, reject) => {
    let faultMessage = result['soapenv:Envelope']['soapenv:Body'][0]['soapenv:Fault'][0];
    if (faultMessage) {
      responseError.errorCode = faultMessage.errorCode;
      responseError.errorMessage = faultMessage.faultMessage;
      if (faultMessage['detail'][0]['TCSServiceFault'][0]) {
        responseError.errorCode = faultMessage['detail'][0]['TCSServiceFault'][0].return_code;
        responseError.errorMessage = faultMessage['detail'][0]['TCSServiceFault'][0].return_detail;
      }
      resolve(responseError);
    } else {
      reject(responseError);
    }
  });
};

/**
 * @function getTrackingId - Get paygov tracking id out of the paygov response XML
 * @param {Object} result - result from paygov request for completeOnlineCollection
 * @return {string} - paygov tracking id 
 */
paygov.getTrackingId = result => {
  return new Promise((resolve, reject) => {
    const completeOnlineCollectionResponse =
    result['S:Envelope']['S:Body'][0]['ns2:completeOnlineCollectionResponse'][0]['completeOnlineCollectionResponse'][0];
    if (completeOnlineCollectionResponse) {
      resolve(completeOnlineCollectionResponse.paygov_tracking_id[0]);
    }
    reject(new Error('no tracking id'));
  });
};

/**
 * @function postPayGov - Function to make a post request to pay.gov/mock pay.gov
 * @param {String} xmlData - xml to be posted to payGov endpoint
 * @return {Object} - response from payGov
 */
paygov.postPayGov = xmlData => {
  const payGovPrivateKey = Buffer.from(vcapConstants.PAY_GOV_PRIVATE_KEY, 'utf8');
  const payGovCert = Buffer.from(vcapConstants.PAY_GOV_CERT[0], 'utf8');
  return util.request.post(
    {
      url: vcapConstants.PAY_GOV_URL,
      method: 'POST',
      headers: {
        'Content-Type': 'application/xml'
      },
      body: xmlData,
      key: payGovPrivateKey,
      cert: payGovCert
    }
  );
};

module.exports = paygov;
