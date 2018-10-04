'use strict';

/**
 * Module for common controllers
 * @module email/email-util
 */
const nodemailer = require('nodemailer');
const juice = require('juice');
const logger = require('../services/logger.es6');

const vcapConstants = require('../vcap-constants.es6');
const emailTemplates = require('./email-templates.es6');
const htmlTemplate = require('./assets/html-template.es6');


const emailUtil = {};

const smtpConfig = {
  host: vcapConstants.SMTP_HOST,
  port: 587,
  secure: false,
  requireTLS: true
};

if (vcapConstants.SMTP_PORT) {
  smtpConfig.port = vcapConstants.SMTP_PORT;
}

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

emailUtil.transporter = nodemailer.createTransport(smtpConfig);
/**
 * @function send - sends email using nodemailer
 * @param {string} to - email To address
 * @param {string} subject - email subject
 * @param {string} body - email body
 * @param {boolean} html - email body a html or not
 * @param {boolean} attachments - email contains attachments
 */
emailUtil.send = (to, subject, body, html = false, attachments = false) => {
  return new Promise((resolve, reject) => {
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
      emailUtil.transporter.sendMail(mailOptions, error => {
        if (error) {
          logger.error('NODE_MAILER_SMTP_ERROR', error);
        } else {
          logger.info('Email successfully sent');
        }
        resolve();
      });
    }
  });
};

/**
 * @function sendEmail - composes email before sending
 * @param {string} templateName - email template to be used
 * @param {Object} data - email data (from, to, subject, etc.)
 * @param {array} attachments - email attachments array
 */
emailUtil.sendEmail = (templateName, data, attachments = []) => {
  if (!emailTemplates[templateName]) {
    const err = new Error(`You must specify a valid template name. templateName=${templateName}`);
    err.templateName = templateName;
    return Promise.reject(err);
  }

  const emailAttachments = htmlTemplate.attachments.concat(attachments);
  const template = emailTemplates[templateName](data);
  let html;
  if (template.html) {
    html = htmlTemplate.forestService(template.html,template.subject);
    html = juice(html);
  }

  return emailUtil.send(template.to, template.subject, template.body, html, emailAttachments);
};

module.exports = emailUtil;
