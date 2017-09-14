'use strict';

let nodemailer = require('nodemailer');
let vcapServices = require('./vcap-services.es6');
let emailTemplates = require('./email-templates/email-templates.es6');

let emailUtil = {};

emailUtil.sendEmail = (templateName, data) => {
  let template = emailTemplates[templateName](data);
  emailUtil.send(template.to, template.subject, template.body);
};

emailUtil.send = (to, subject, body) => {
  let smtpConfig = {
    host: vcapServices.smtpHost,
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: vcapServices.smtpUsername
    }
  };

  if (vcapServices.smtpPassword) {
    smtpConfig.auth.pass = vcapServices.smtpPassword;
  }

  let transporter = nodemailer.createTransport(smtpConfig);

  let mailOptions = {
    from: vcapServices.smtpUsername,
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
