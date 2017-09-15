'use strict';

let nodemailer = require('nodemailer');
let vcapConstants = require('./vcap-constants.es6');
let emailTemplates = require('./email-templates/email-templates.es6');

let emailUtil = {};

emailUtil.sendEmail = (templateName, data) => {
  let template = emailTemplates[templateName](data);
  emailUtil.send(template.to, template.subject, template.body);
};

emailUtil.send = (to, subject, body) => {
  let smtpConfig = {
    host: vcapConstants.smtpHost,
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: vcapConstants.smtpUsername
    }
  };

  if (vcapConstants.smtpPassword) {
    smtpConfig.auth.pass = vcapConstants.smtpPassword;
  }

  let transporter = nodemailer.createTransport(smtpConfig);

  let mailOptions = {
    from: vcapConstants.smtpUsername,
    to: to,
    subject: subject,
    text: body // plain text
  };

  let trans = transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log('error message', error);
      //TODO: Handle error
    }
  });
};

module.exports = emailUtil;
