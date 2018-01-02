'use strict';

const nodemailer = require('nodemailer');

const vcapConstants = require('../vcap-constants.es6');
const emailTemplates = require('./email-templates.es6');
const htmlTemplate = require('./assets/html-template.es6');
const inlineCss = require('nodemailer-juice');

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
  return new Promise((resolve, reject) => {
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
      transporter.use('compile', inlineCss());
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return resolve(false);
        } else {
          return resolve(true);
        }
      });
    } else {
      return resolve(false);
    }
  });
};

emailUtil.sendEmail = (templateName, data, attachments = []) => {
  return new Promise((resolve, reject) => {
    if (emailTemplates[templateName]) {
      data.attachments = attachments.concat(htmlTemplate.attachments);
      const template = emailTemplates[templateName](data);
      let html;
      let templateAttachments;
      if (template.html) {
        html = `${htmlTemplate.forestService}<div class="body">${template.html}</div>`;
      }
      if (template.attachments) {
        templateAttachments = template.attachments;
      }
      emailUtil.send(template.to, template.subject, template.body, html, templateAttachments).then(emailSent => {
        return resolve(emailSent);
      });
    }
  });
};

module.exports = emailUtil;
