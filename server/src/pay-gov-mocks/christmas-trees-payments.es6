'use strict';

const express = require('express');
const request = require('request'); // npm install request
const jose = require('node-jose');
const passport = require('passport');
const xml = require('xml');

const util = require('../util.es6');
const vcapConstants = require('../vcap-constants.es6');
const treesDb = require('../models/trees-db.es6');
const middleware = require('../middleware.es6');

const payGov = {};

/** router for mock pay.gov  specific endpoints */
payGov.router = express.Router();

payGov.router.options('*', middleware.setCorsHeaders, (req, res) => {
  res.set('Access-Control-Allow-Headers', 'accept, content-type');
  res.set('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS, PATCH');
  res.send();
});

payGov.router.post('/mock-pay-gov', function(req, res) {
  const startOnlineCollectionRequest =
    req.body['S:Envelope']['S:Body'][0]['ns2:startOnlineCollection'][0]['startOnlineCollectionRequest'][0];
  const permitId = startOnlineCollectionRequest.permitId[0];

  var xmlResponse = `<?xml version="1.0" encoding="UTF-8"?>
                    <S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/">
                      <S:Header>
                       <work:WorkContext xmlns:work="http://oracle.com/weblogic/soap/workarea/">
                       </work:WorkContext>
                      </S:Header>
                      <S:Body>
                        <ns2:startOnlineCollectionResponse xmlns:ns2="http://fms.treas.gov/services/tcsonline">
                          <startOnlineCollectionResponse>
                            <token>${permitId}</token>
                          </startOnlineCollectionResponse>
                        </ns2:startOnlineCollectionResponse>
                      </S:Body>
                    </S:Envelope>`;

  res.set('Content-Type', 'application/xml; charset=utf-8');
  res.send(xmlResponse);
});

payGov.router.get('/mock-pay-gov', middleware.setCorsHeaders, function(req, res) {
  treesDb.christmasTreesPermits
    .findOne({
      where: {
        permitId: req.query.token
      },
      include: [
        {
          model: treesDb.christmasTreesForests
        }
      ]
    })
    .then(permit => {
      if (permit) {  
        const successUrl = vcapConstants.intakeClientBaseUrl + 'applications/christmas-trees/forests/' + permit.christmasTreesForest.forestAbbr + '/permits/' + permit.permitId;
        const mockResponse = {
          token: permit.permitId,
          paymentAmount: permit.totalCost,
          applicantName: permit.firstName + ' ' + permit.lastName,
          applicantEmailAddress: permit.emailAddress,
          amountOwed: permit.totalCost,
          tcsAppID: req.query.tcsAppID,
          orgStructureCode: permit.orgStructureCode,
          successUrl: successUrl  
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
