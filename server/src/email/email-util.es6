'use strict';

const nodemailer = require('nodemailer');

const vcapConstants = require('../vcap-constants.es6');
const emailTemplates = require('./email-templates.es6');

const emailUtil = {};

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

emailUtil.send = (to, subject, body, html = false, attachments = false) => {
  let mailOptions = {
    from: `"Forest Service online permits" <${vcapConstants.smtpUsername}>`,
    to: to,
    subject: subject,
    text: body // plain text
  };
  if (html) {
    mailOptions.html = html;
  }
  if (attachments) {
    mailOptions.attachments = attachments;
  }
  if (vcapConstants.smtpHost) {
    transporter.sendMail(mailOptions);
  }
};

emailUtil.sendEmail = (templateName, data) => {
  if (emailTemplates[templateName]) {
    const template = emailTemplates[templateName](data);
    let html;
    if (template.html) {
      html = template.html;
    }
    emailUtil.send(template.to, template.subject, template.body, html);
  }
};

emailUtil.sendEmailWithAttachments = (templateName, data, attachments) => {
  if (emailTemplates[templateName]) {
    const template = emailTemplates[templateName](data, attachments);
    let html;
    let templateAttachments;
    if (template.html) {
      html = template.html;
    }
    if (template.attachments) {
      templateAttachments = template.attachments;
    }
    emailUtil.send(template.to, template.subject, template.body, html, templateAttachments);
  }
};

module.exports = emailUtil;
