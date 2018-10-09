'use strict';

const emailUtil = require('../src/email/email-util.es6');
const sinon = require('sinon');

module.exports = sinon.stub(emailUtil, 'send').resolves();
