'use strict';

let email = {};

email.noncommercialApplicationSubmittedConfirmation = application => {
  return {
    to: application.applicantInfoEmailAddress,
    subject: 'New noncommercial application',
    body: `
      Dear ${application.applicantInfoEmailAddress}, thank you for your application.
    `
  };
};

email.tempOutfitterApplicationSubmittedConfirmation = application => {
  return {
    to: application.applicantInfoEmailAddress,
    subject: 'New temp outfitter application',
    body: `
      Dear ${application.applicantInfoEmailAddress}, thank you for your application.
    `
  };
};

module.exports = email;
