'use strict';

const nodemailer = require('nodemailer');

const vcapConstants = require('./vcap-constants.es6');
const emailTemplates = require('./email-templates/email-templates.es6');
const util = require('./util.es6');

const emailUtil = {};

emailUtil.sendEmail = (templateName, data) => {
  const template = emailTemplates[templateName](data);
  emailUtil.send(template.to, template.subject, template.body);
};

emailUtil.send = (to, subject, body) => {
  const smtpConfig = {
    host: vcapConstants.smtpHost,
    port: 587,
    secure: false,
    requireTLS: true
  };

  /*
   * If smtp username and password are set in VCAP_SERVICES,
   * we assume that smtp host is configured to authenticate with username and password.
   */
  if (vcapConstants.smtpUsername && vcapConstants.smtpPassword) {
    smtpConfig.auth = {
      user: vcapConstants.smtpUsername,
      pass: vcapConstants.smtpPassword
    };
  }

  const transporter = nodemailer.createTransport(smtpConfig);

  const mailOptions = {
    from: vcapConstants.smtpUsername,
    to: to,
    subject: subject,
    text: body // plain text
  };

  transporter.sendMail(mailOptions);
};

module.exports = emailUtil;
