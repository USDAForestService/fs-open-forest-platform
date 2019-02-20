/* eslint-disable eqeqeq */

const express = require('express');
const uuid = require('uuid/v4');

const util = require('../services/util.es6');
const treesDb = require('../models/trees-db.es6');
const middleware = require('../services/middleware.es6');
const paygov = require('../services/paygov');
const templates = require('./pay-gov-templates.es6');

const mockPayGov = {};

const transactions = {};

function isStartCollection(requestBody) {
  return requestBody['ns2:startOnlineCollection']
    && requestBody['ns2:startOnlineCollection'][0].startOnlineCollectionRequest[0];
}

function isCompleteCollection(requestBody) {
  return requestBody['ns2:completeOnlineCollection']
    && requestBody['ns2:completeOnlineCollection'][0].completeOnlineCollectionRequest[0];
}

function handleStartCollection(requestBody) {
  const startCollectionRequest = requestBody['ns2:startOnlineCollection'][0].startOnlineCollectionRequest[0];
  const applicantName = startCollectionRequest.account_holder_name[0];

  let response;

  if (/^unknown/.test(applicantName)) {
    response = templates.startOnlineCollectionRequest.applicationError(startCollectionRequest.tcs_app_id[0]);
    return [500, response];
  }

  if (/^noresponse/.test(applicantName)) {
    response = templates.startOnlineCollectionRequest.noResponse();
    return [500, response];
  }

  if (/^duplicate/.test(applicantName)) {
    response = templates.startOnlineCollectionRequest.agencyTrackingIdError();
    return [500, response];
  }

  response = templates.startOnlineCollectionRequest.successfulResponse(uuid());
  return [200, response];
}

function handleCompleteCollection(requestBody) {
  const collectionRequest = requestBody['ns2:completeOnlineCollection'][0].completeOnlineCollectionRequest[0];
  const requestToken = collectionRequest.token[0];

  let response = transactions[requestToken];
  if (response) {
    return [500, response];
  }

  if (requestToken === 'carderror') {
    response = templates.completeOnlineCollectionRequest.cardError();
    return [500, response];
  }

  if (requestToken === 'badtoken') {
    response = templates.completeOnlineCollectionRequest.badToken();
    return [500, response];
  }

  response = templates.completeOnlineCollectionRequest.successfulResponse(util.getRandomString(5).toUpperCase());
  return [200, response];
}

/** router for mock pay.gov specific endpoints */
mockPayGov.router = express.Router();

mockPayGov.router.options('*', middleware.setCorsHeaders, (_req, res) => {
  res.set('Access-Control-Allow-Headers', 'accept, content-type');
  res.set('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS, PATCH');
  res.send();
});

mockPayGov.router.post('/mock-pay-gov', (req, res) => {
  const requestBody = req.body['soap:Envelope']['soap:Body'][0];

  let status = 500;
  let response = '';

  if (isStartCollection(requestBody)) {
    [status, response] = handleStartCollection(requestBody);
  } else if (isCompleteCollection(requestBody)) {
    [status, response] = handleCompleteCollection(requestBody);
  }

  res.set('Content-Type', 'application/xml; charset=utf-8');
  res.status(status).send(response);
});

mockPayGov.router.post('/mock-pay-gov-process', middleware.setCorsHeaders, (req, res) => {
  const { cc, token } = req.body;

  if (cc.startsWith('000000000000')) {
    transactions[token] = templates.completeOnlineCollectionRequest.cardError();
  }
  res.status(200).json(null);
});

mockPayGov.router.get('/mock-pay-gov', middleware.setCorsHeaders, (req, res) => {
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
          successUrl: paygov.returnUrl(permit.christmasTreesForest.forestAbbr, permit.permitId, false),
          cancelUrl: paygov.returnUrl(permit.christmasTreesForest.forestAbbr, permit.permitId, true)
        };
        return res.status(200).send(mockResponse);
      }
      return res.status(404).send();
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

module.exports = mockPayGov;
