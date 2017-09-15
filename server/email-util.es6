'use strict';

const nodemailer = require('nodemailer');
const vcapConstants = require('./vcap-constants.es6');
const emailTemplates = require('./email-templates/email-templates.es6');

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

  if (vcapConstants.smtpPassword) {
    smtpConfig.auth.pass = vcapConstants.smtpPassword;
  }

  const transporter = nodemailer.createTransport(smtpConfig);

  const mailOptions = {
    from: vcapConstants.smtpUsername,
    to: to,
    subject: subject,
    text: body // plain text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    console.log('------------ email info', info);
    if (error) {
      return console.log('error message', error);
      // TODO: Handle error
    }
  });
};

module.exports = emailUtil;
