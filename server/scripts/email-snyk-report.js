/* eslint-disable no-console */
const nodemailer = require('nodemailer');
const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USERNAME,
  SMTP_PASSWORD,
  SNYK_RECIPIENTS
} = require('../src/vcap-constants.es6');

function emailSnykReport(reportDate, reportFilename, reportContent) {
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
    from: `"Digital Permits Security Monitoring" <${SMTP_USERNAME}>`,
    to: SNYK_RECIPIENTS,
    subject: `Snyk Report for ${reportDate}`,
    attachments: [{
      filename: reportFilename,
      content: reportContent
    }],
    text: `
      See attached Snyk report for ${reportDate}.

      Please do not reply to this message.
      This email message was sent from a notification-only address that cannot accept incoming email.
    `
  };

  nodemailer.createTransport(smtpConfig).sendMail(mailOptions, (error) => {
    if (error) {
      console.error('NODE_MAILER_SMTP_ERROR', error);
      process.exit(1);
    } else {
      console.log('Snyk report successfully sent');
    }
  });
}

