'use strict';

const moment = require('moment');
const vcapConstants = require('../vcap-constants.es6');

const email = {};

email.noncommercialApplicationSubmittedConfirmation = application => {
  return {
    to: application.applicantInfoEmailAddress,
    subject: 'Your noncommercial permit application has been submitted for review!',
    body: `
Submitted for review! \r\n
Your permit application has been submitted for review, but is NOT APPROVED until you hear from a special use administrator. Submitting an application does not guarantee your permit will be approved. \r\n
Application details \r\n\r\n
Event name: ${application.eventName}\r\n
Start date: ${moment(application.noncommercialFieldsStartDateTime, 'YYYY-MM-DDTHH:mm:ss').format(
      'MM/DD/YYYY hh:mm a'
    )}\r\n
End date: ${moment(application.noncommercialFieldsEndDateTime, 'YYYY-MM-DDTHH:mm:ss').format('MM/DD/YYYY hh:mm a')}\r\n
Participants: ${application.noncommercialFieldsNumberParticipants}\r\n
Spectators: ${application.noncommercialFieldsSpectatorCount}\r\n
Location: ${application.noncommercialFieldsLocationDescription}\r\n\r\n
What happens next?\r\n\r\n
1. Your application will be reviewed by our staff within 48 hours.\r\n
2. If additional information is needed, a representative of the National Forest Service will contact you via email to resolve any issues.\r\n
3. Once your application has been reviewed by our staff, you will be notified of the application status.\r\n
4. If your application is approved, you will receive your permit via U.S. mail within 2 weeks of approval.\r\n\r\n
Contact us\r\n\r\n
If you have questions or need to contact the permit staff at the National Forest Service, please use a method listed below.\r\n\r\n
Noncommercial contact\r\n
Name: \r\n
Title: \r\n
Phone: \r\n
Email: \r\n\r\n
Thank you for your interest in our National Forests.
`
  };
};

email.tempOutfitterApplicationSubmittedConfirmation = application => {
  return {
    to: application.applicantInfoEmailAddress,
    subject: 'Your temporary outfitter permit application has been submitted for review.',
    body: `
Submitted for review! \r\n
Your permit application has been submitted for review, but is NOT APPROVED until you hear from a special use administrator. Submitting an application does not guarantee your permit will be approved. \r\n
Application details \r\n\r\n
Business name: ${application.applicantInfoOrganizationName}\r\n
Start date: ${moment(application.tempOutfitterFieldsActDescFieldsStartDateTime, 'YYYY-MM-DDTHH:mm:ss').format(
      'MM/DD/YYYY hh:mm a'
    )}\r\n
End date: ${moment(application.tempOutfitterFieldsActDescFieldsEndDateTime, 'YYYY-MM-DDTHH:mm:ss').format(
      'MM/DD/YYYY hh:mm a'
    )}\r\n
Number of trips: ${application.tempOutfitterFieldsActDescFieldsNumTrips}\r\n
Number of participants: ${application.tempOutfitterFieldsActDescFieldsPartySize}\r\n
Services: ${application.tempOutfitterFieldsActDescFieldsServProvided}\r\n\r\n
What happens next?\r\n\r\n
1. Your application will be reviewed by our staff.\r\n
2. If additional information is needed, a representative of the National Forest Service will contact you via email to resolve any issues.\r\n
3. Once your application has been reviewed by our staff, you will be notified of the application status.\r\n
4. If your application is approved, you will receive your permit within 2 weeks of approval.\r\n\r\n
Contact us\r\n\r\n
If you have questions or need to contact the permit staff at the National Forest Service, please use a method listed below.\r\n\r\n
Temp outfitter contact\r\n
Name: \r\n
Title: \r\n
Phone: \r\n
Email: \r\n\r\n
Thank you for your interest in our National Forests.
`
  };
};

email.noncommercialApplicationSubmittedAdminConfirmation = application => {
  const applicationUrl = `${vcapConstants.intakeClientBaseUrl}/admin/applications/noncommercial/${application.appControlNumber}`;

  return {
    to: vcapConstants.specialUseAdminEmailAddresses,
    subject: 'A new noncommercial permit application has been submitted for review!',
    body: `
Submitted for review! \r\n
View the application: ${applicationUrl} \r\n\r\n
Your permit application has been submitted for review, but is NOT APPROVED until you hear from a special use administrator. Submitting an application does not guarantee your permit will be approved. \r\n
Application details \r\n\r\n
Event name: ${application.eventName}\r\n
Start date: ${moment(application.noncommercialFieldsStartDateTime, 'YYYY-MM-DDTHH:mm:ss').format(
      'MM/DD/YYYY hh:mm a'
    )}\r\n
End date: ${moment(application.noncommercialFieldsEndDateTime, 'YYYY-MM-DDTHH:mm:ss').format('MM/DD/YYYY hh:mm a')}\r\n
Participants: ${application.noncommercialFieldsNumberParticipants}\r\n
Spectators: ${application.noncommercialFieldsSpectatorCount}\r\n
Location: ${application.noncommercialFieldsLocationDescription}\r\n\r\n
What happens next?\r\n\r\n
1. Your application will be reviewed by our staff within 48 hours.\r\n
2. If additional information is needed, a representative of the National Forest Service will contact you via email to resolve any issues.\r\n
3. Once your application has been reviewed by our staff, you will be notified of the application status.\r\n
4. If your application is approved, you will receive your permit via U.S. mail within 2 weeks of approval.\r\n\r\n
Contact us\r\n\r\n
If you have questions or need to contact the permit staff at the National Forest Service, please use a method listed below.\r\n\r\n
Noncommercial contact\r\n
Name: \r\n
Title: \r\n
Phone: \r\n
Email: \r\n\r\n
Thank you for your interest in our National Forests.
`
  };
};

email.tempOutfitterApplicationSubmittedAdminConfirmation = application => {
  const applicationUrl = `${vcapConstants.intakeClientBaseUrl}/admin/applications/temp-outfitter/${application.appControlNumber}`;

  return {
    to: vcapConstants.specialUseAdminEmailAddresses,
    subject: 'A new temporary outfitter permit application has been submitted for review.',
    body: `
Submitted for review! \r\n
View the application: ${applicationUrl} \r\n\r\n
Your permit application has been submitted for review, but is NOT APPROVED until you hear from a special use administrator. Submitting an application does not guarantee your permit will be approved. \r\n
Application details \r\n\r\n
Business name: ${application.applicantInfoOrganizationName}\r\n
Start date: ${moment(application.tempOutfitterFieldsActDescFieldsStartDateTime, 'YYYY-MM-DDTHH:mm:ss').format(
      'MM/DD/YYYY hh:mm a'
    )}\r\n
End date: ${moment(application.tempOutfitterFieldsActDescFieldsEndDateTime, 'YYYY-MM-DDTHH:mm:ss').format(
      'MM/DD/YYYY hh:mm a'
    )}\r\n
Number of trips: ${application.tempOutfitterFieldsActDescFieldsNumTrips}\r\n
Number of participants: ${application.tempOutfitterFieldsActDescFieldsPartySize}\r\n
Services: ${application.tempOutfitterFieldsActDescFieldsServProvided}\r\n\r\n
What happens next?\r\n\r\n
1. Your application will be reviewed by our staff.\r\n
2. If additional information is needed, a representative of the National Forest Service will contact you via email to resolve any issues.\r\n
3. Once your application has been reviewed by our staff, you will be notified of the application status.\r\n
4. If your application is approved, you will receive your permit within 2 weeks of approval.\r\n\r\n
Contact us\r\n\r\n
If you have questions or need to contact the permit staff at the National Forest Service, please use a method listed below.\r\n\r\n
Temp outfitter contact\r\n
Name: \r\n
Title: \r\n
Phone: \r\n
Email: \r\n\r\n
Thank you for your interest in our National Forests.
`
  };
};

email.applicationReturned = application => {
  return {
    to: application.applicantInfoEmailAddress,
    subject: 'Your noncommercial permit application has been submitted for review!',
    body: `
Your application has been returned because\r\n\r\n
${application.reasonForReturn}
`
  };
};

email.applicationHold = application => {
  return {
    to: application.applicantInfoEmailAddress,
    subject: 'Your noncommercial permit application has been submitted for review!',
    body: `
Your application has been set to hold because\r\n\r\n
${application.reasonForReturn}
`
  };
};

module.exports = email;
