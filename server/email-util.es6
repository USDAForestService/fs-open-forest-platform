'use strict';

let nodemailer = require('nodemailer');
let vcapServices = require('./vcap-services.es6');

let emailUtil = {};

emailUtil.noncommercialApplicationSubmittedConfirmation = application => {
  const to = application.applicantInfoEmailAddress;
  const subject = 'New non commercial application';
  const body = `Dear ${to}, thank you for your application.`;

  emailUtil.send(to, subject, body);
};

emailUtil.tempOutfitterApplicationSubmittedConfirmation = application => {
  const to = application.applicantInfoEmailAddress;
  const subject = 'New non commercial application';
  const body = `Dear ${to}, thank you for your application.`;

  emailUtil.send(to, subject, body);
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
      return console.log(error);
    }
    console.log('message info', info);
  });
};

module.exports = emailUtil;
