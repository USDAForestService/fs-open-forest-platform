'use strict';

const express = require('express');
const uuid = require('uuid/v4');

const util = require('../util.es6');
const vcapConstants = require('../vcap-constants.es6');
const treesDb = require('../models/trees-db.es6');
const middleware = require('../middleware.es6');

const templates = require('./pay-gov-templates.es6');

const payGov = {};

let transactions = {};
let tokens = {};

/** router for mock pay.gov  specific endpoints */
payGov.router = express.Router();

payGov.router.options('*', middleware.setCorsHeaders, (req, res) => {
  res.set('Access-Control-Allow-Headers', 'accept, content-type');
  res.set('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS, PATCH');
  res.send();
});

payGov.router.post('/mock-pay-gov', function(req, res) {
  const requestBody = req.body['soap:Envelope']['soap:Body'][0];

  let xmlResponse = '';

  const token = uuid();
  const paygovTrackingId = util.getRandomString(5).toUpperCase();

  if (
    requestBody['ns2:startOnlineCollection'] &&
    requestBody['ns2:startOnlineCollection'][0]['startOnlineCollectionRequest'][0]
  ) {
    let startCollectionRequest = requestBody['ns2:startOnlineCollection'][0]['startOnlineCollectionRequest'][0];
    let accountHolderName = startCollectionRequest.account_holder_name;
    if (accountHolderName && accountHolderName == '1 1') {
      xmlResponse = templates.startOnlineCollectionRequest.applicationError(startCollectionRequest.tcs_app_id);
    } else if (accountHolderName && accountHolderName == '1 2') {
      xmlResponse = templates.startOnlineCollectionRequest.noResponse();
    } else {
      xmlResponse = templates.startOnlineCollectionRequest.successfulResponse(token);
    }
    tokens[token] = { successUrl: startCollectionRequest.url_success[0] };
  } else if (
    requestBody['ns2:completeOnlineCollection'] &&
    requestBody['ns2:completeOnlineCollection'][0]['completeOnlineCollectionRequest'][0]
  ) {
    let collectionRequest = requestBody['ns2:completeOnlineCollection'][0]['completeOnlineCollectionRequest'][0];
    let requestToken = collectionRequest.token[0];
    let transactionStatus = transactions[requestToken];

    if (transactionStatus && transactionStatus.status == 'failure') {
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

payGov.router.post('/mock-pay-gov-process', middleware.setCorsHeaders, function(req, res) {
  const token = req.body.token;
  const cc = req.body.cc;

  let status = 'success';
  let errorCode;
  if (cc.startsWith('000000000000')) {
    status = 'failure';
    let code = cc.slice(cc.length - 4, cc.length + 1);
    if (code != '0000') {
      errorCode = code;
    }
  }
  transactions[token] = { status: status, errorCode: errorCode };
  return res.status(200).json(transactions[token]);
});

payGov.router.get('/mock-pay-gov', middleware.setCorsHeaders, function(req, res) {
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
    .then(permit => {
      if (permit) {
        const successUrl = tokens[req.query.token].successUrl;
        const cancelUrl =
          vcapConstants.intakeClientBaseUrl +
          '/christmas-trees/forests/' +
          permit.christmasTreesForest.forestAbbr +
          '/applications/' +
          permit.permitId;
        const mockResponse = {
          token: permit.permitId,
          paymentAmount: permit.totalCost,
          applicantName: permit.firstName + ' ' + permit.lastName,
          applicantEmailAddress: permit.emailAddress,
          amountOwed: permit.totalCost,
          tcsAppID: req.query.tcsAppID,
          orgStructureCode: permit.orgStructureCode,
          successUrl: successUrl,
          cancelUrl: cancelUrl
        };
        return res.status(200).send(mockResponse);
      } else {
        res.status(404).send();
      }
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

module.exports = payGov;
