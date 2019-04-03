/* eslint-disable no-console */
const path = require('path');
const nodemailer = require('nodemailer');
const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USERNAME,
  SMTP_PASSWORD,
  SNYK_RECIPIENTS
} = require('../src/vcap-constants.es6');

function emailSnykReport(reportDate, reportPath) {
  const smtpConfig = {
    host: SMTP_HOST,
    port: SMTP_PORT || 587,
    secure: false,
    requireTLS: true
  };

  /*
  * If smtp username and password are set in VCAP_SERVICES,
  * we assume that smtp host is configured to authenticate with username and password.
  */
  if (SMTP_USERNAME && SMTP_PASSWORD) {
    smtpConfig.auth = {
      user: SMTP_USERNAME,
      pass: SMTP_PASSWORD
    };
  }

  const mailOptions = {
    from: `Open Forest Security Monitoring" <${SMTP_USERNAME}>`,
    to: SNYK_RECIPIENTS,
    subject: `Snyk Report for ${reportDate}`,
    attachments: [{ path: path.resolve(reportPath) }],
    text: `
      See attached Snyk report for ${reportDate}.

      Please do not reply to this message.
      This email message was sent from a notification-only address that cannot accept incoming email.
    `
  };

  nodemailer.createTransport(smtpConfig).sendMail(mailOptions, (error) => {
    if (error) {
      console.error('NODE_MAILER_SMTP_ERROR', error);
    } else {
      console.info('Snyk report successfully sent');
    }
  });
}

emailSnykReport(...process.argv.slice(2));
