/* eslint-disable eqeqeq */


const express = require('express');
const uuid = require('uuid/v4');

const util = require('../services/util.es6');
const treesDb = require('../models/trees-db.es6');
const middleware = require('../services/middleware.es6');

const templates = require('./pay-gov-templates.es6');

const payGov = {};

const transactions = {};
const tokens = {};

/** router for mock pay.gov  specific endpoints */
payGov.router = express.Router();

payGov.router.options('*', middleware.setCorsHeaders, (req, res) => {
  res.set('Access-Control-Allow-Headers', 'accept, content-type');
  res.set('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS, PATCH');
  res.send();
});

payGov.router.post('/mock-pay-gov', (req, res) => {
  const requestBody = req.body['soap:Envelope']['soap:Body'][0];

  let xmlResponse = '';

  const token = uuid();
  const paygovTrackingId = util.getRandomString(5).toUpperCase();

  if (
    requestBody['ns2:startOnlineCollection']
    && requestBody['ns2:startOnlineCollection'][0].startOnlineCollectionRequest[0]
  ) {
    const startCollectionRequest = requestBody['ns2:startOnlineCollection'][0].startOnlineCollectionRequest[0];
    const accountHolderName = startCollectionRequest.account_holder_name;
    if (accountHolderName === '1' && accountHolderName == '1 1') {
      xmlResponse = templates.startOnlineCollectionRequest.applicationError(startCollectionRequest.tcs_app_id);
    } else if (accountHolderName && accountHolderName == '1 2') {
      xmlResponse = templates.startOnlineCollectionRequest.noResponse();
    } else {
      xmlResponse = templates.startOnlineCollectionRequest.successfulResponse(token);
    }
    tokens[token] = { successUrl: startCollectionRequest.url_success[0], cancelUrl: startCollectionRequest.url_cancel[0] };
  } else if (
    requestBody['ns2:completeOnlineCollection']
    && requestBody['ns2:completeOnlineCollection'][0].completeOnlineCollectionRequest[0]
  ) {
    const collectionRequest = requestBody['ns2:completeOnlineCollection'][0].completeOnlineCollectionRequest[0];
    const requestToken = collectionRequest.token[0];
    const transactionStatus = transactions[requestToken];

    if (transactionStatus && transactionStatus.status === 'failure') {
      let returnCode = '0000';
      if (transactionStatus.errorCode) {
        returnCode = transactionStatus.errorCode;
      }
      xmlResponse = templates.completeOnlineCollectionRequest.cardError(returnCode);
    } else {
      xmlResponse = templates.completeOnlineCollectionRequest.successfulResponse(paygovTrackingId);
    }
  }
  if (xmlResponse !== null) {
    res.set('Content-Type', 'application/xml; charset=utf-8');
    res.send(xmlResponse);
  } else {
    res.status(500).send();
  }
});

payGov.router.post('/mock-pay-gov-process', middleware.setCorsHeaders, (req, res) => {
  const cc = req.body.cc;

  let status = 'success';
  let errorCode;
  if (cc.startsWith('000000000000')) {
    status = 'failure';
    const code = cc.slice(cc.length - 4, cc.length + 1);
    if (code !== '0000') {
      errorCode = code;
    }
  }
  transactions[req.body.token] = { status, errorCode };
  return res.status(200).json(transactions[req.body.token]);
});

payGov.router.get('/mock-pay-gov', middleware.setCorsHeaders, (req, res) => {
  treesDb.christmasTreesPermits
    .findOne({
      where: {
        paygovToken: req.query.token
      },
      include: [
        {
          model: treesDb.christmasTreesForests
        }
      ]
    })
    .then((permit) => {
      if (permit) {
        const mockResponse = {
          token: permit.permitId,
          paymentAmount: permit.totalCost,
          applicantName: `${permit.firstName} ${permit.lastName}`,
          applicantEmailAddress: permit.emailAddress,
          amountOwed: permit.totalCost,
          tcsAppID: req.query.tcsAppID,
          orgStructureCode: permit.orgStructureCode,
          successUrl: tokens[req.query.token].successUrl,
          cancelUrl: tokens[req.query.token].cancelUrl
        };
        return res.status(200).send(mockResponse);
      }
      return res.status(404).send();
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

module.exports = payGov;
