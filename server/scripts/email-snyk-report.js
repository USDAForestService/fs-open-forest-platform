/* eslint-disable no-console */
const path = require('path');
const nodemailer = require('nodemailer');

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USERNAME,
  SNYK_RECIPIENTS
} = process.env;

function emailSnykReport(reportDate, reportPath) {
  const smtpConfig = {
    host: SMTP_HOST,
    port: SMTP_PORT || 587,
    secure: false,
    requireTLS: true
  };

  const mailOptions = {
    from: `Open Forest Security Monitoring" <${SMTP_USERNAME}>`,
    to: JSON.parse(SNYK_RECIPIENTS),
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
