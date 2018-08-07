const moment = require('moment');

const util = require('../../../services/util.es6');
const defaultForestContact = require('../default-special-use-contact-info.es6');

module.exports = application => {
  const userApplicationLink = util.userApplicationLink(application);

  return {
    to: application.applicantInfoEmailAddress,
    subject: 'Your following permit application to the Mt. Baker-Snoqualmie National Forest has been cancelled.',
    body: `
Application details
*********************************

Application identification number: ${application.applicationId}
Contact name: ${application.applicantInfoPrimaryFirstName} ${application.applicantInfoPrimaryLastName}
Business name: ${application.applicantInfoOrganizationName}
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

${defaultForestContact}`
  };
};
