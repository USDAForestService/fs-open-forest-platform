'use strict';

/**
 * Module for common controllers
 * @module email/email-util
 */
const nodemailer = require('nodemailer');

const vcapConstants = require('../vcap-constants.es6');
const emailTemplates = require('./email-templates.es6');
const htmlTemplate = require('./assets/html-template.es6');
const inlineCss = require('nodemailer-juice');

const emailUtil = {};

const smtpConfig = {
  host: vcapConstants.SMTP_HOST,
  port: 587,
  secure: false,
  requireTLS: true
};

/*
 * If smtp username and password are set in VCAP_SERVICES,
 * we assume that smtp host is configured to authenticate with username and password.
 */
if (vcapConstants.SMTP_USERNAME && vcapConstants.SMTP_PASSWORD) {
  smtpConfig.auth = {
    user: vcapConstants.SMTP_USERNAME,
    pass: vcapConstants.SMTP_PASSWORD
  };
}

const transporter = nodemailer.createTransport(smtpConfig);
/**
 * @function send - sends email using nodemailer
 * @param {string} to - email To address
 * @param {string} subject - email subject
 * @param {string} body - email body
 * @param {boolean} html - email body a html or not
 * @param {boolean} attachments - email contains attachments
 */
emailUtil.send = (to, subject, body, html = false, attachments = false) => {
  const bodyAndNoReply = `${body}

    Please do not reply to this message.
    This email message was sent from a notification-only address that cannot accept incoming email`;

  let mailOptions = {
    from: `"Forest Service online permits" <${vcapConstants.SMTP_USERNAME}>`,
    to: to,
    subject: subject,
    text: bodyAndNoReply // plain text
  };
  if (html) {
    mailOptions.html = html;
  }
  if (attachments) {
    mailOptions.attachments = attachments;
  }
  if (vcapConstants.SMTP_HOST) {
    transporter.use('compile', inlineCss());
    transporter.sendMail(mailOptions, error => {
      if (error) {
        console.error('NODE_MAILER_SMTP_ERROR', error);
      }
    });
  }
};

/**
 * @function sendEmail - composes email before sending
 * @param {string} templateName - email template to be used
 * @param {Object} data - email data (from, to, subject, etc.)
 * @param {array} attachments - email attachments array
 */
emailUtil.sendEmail = (templateName, data, attachments = []) => {
  if (emailTemplates[templateName]) {
    data.attachments = attachments.concat(htmlTemplate.attachments);
    const template = emailTemplates[templateName](data);
    let html;
    let templateAttachments;
    if (template.html) {
      html = `${htmlTemplate.forestService}<div class="body">${template.html}<p>Please do not reply to this message.
      This email message was sent from a notification-only address that cannot accept incoming email.</p></div>`;
    }
    if (template.attachments) {
      templateAttachments = template.attachments;
    }
    emailUtil.send(template.to, template.subject, template.body, html, templateAttachments);
  }
};

module.exports = emailUtil;
