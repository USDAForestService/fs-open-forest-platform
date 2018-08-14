const moment = require('moment');

const util = require('../../../services/util.es6');

module.exports = application => {
  const userApplicationLink = util.userApplicationLink(application);
  
  return {
    to: application.applicantInfoEmailAddress,
    subject: 'Your following permit application to the ${application.forestName} has been cancelled.',
    body: `
Application details
*********************************

Application identification number: ${application.applicationId}
Contact name: ${application.applicantInfoPrimaryFirstName} ${application.applicantInfoPrimaryLastName}
Business name: ${application.applicantInfoOrganizationName}
Forest: ${application.forestName}
Start date: ${moment(application.tempOutfitterFieldsActDescFieldsStartDateTime, util.datetimeFormat).format(
      'MM/DD/YYYY hh:mm a'
    )}
End date: ${moment(application.tempOutfitterFieldsActDescFieldsEndDateTime, util.datetimeFormat).format(
      'MM/DD/YYYY hh:mm a'
    )}
Number of trips: ${application.tempOutfitterFieldsActDescFieldsNumTrips}
Number of participants: ${application.tempOutfitterFieldsActDescFieldsPartySize}
Services: ${application.tempOutfitterFieldsActDescFieldsServProvided}

${userApplicationLink}

Contact us
**************************************

If you have questions or need to contact the permit staff at the National Forest Service, please use a method listed below.

Temp outfitter contact
Name: Sue Sherman-Biery
Title: Special use administrator
Phone: 360-854-2660
Email: sshermanbiery@fs.fed.us

Thank you for your interest in our National Forests.
`
  };
};
