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
    subject: 'Your temporary outfitter permit application has been submitted for review.',
    body: `
      Submitted for review! \r\n\r\n
      Your permit application has been submitted for review, but is NOT APPROVED until you hear from a special use administrator. Submitting an application does not guarantee your permit will be approved. \r\n\r\n
      Application details \r\n\r\n
    `
  };
};

module.exports = email;
