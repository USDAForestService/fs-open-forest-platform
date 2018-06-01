'use strict';

const emailUtil = require('../src/email/email-util.es6');
const sinon = require('sinon');

sinon.stub(emailUtil.transporter, 'sendMail');