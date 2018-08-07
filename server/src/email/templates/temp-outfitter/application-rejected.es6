const moment = require('moment');

const util = require('../../../services/util.es6');
const vcapConstants = require('../../../vcap-constants.es6');
const defaultForestContact = require('../default-special-use-contact-info.es6');

module.exports = application => {
  const userApplicationLink = util.userApplicationLink(application);

  return {
    to: application.applicantInfoEmailAddress,
    subject: 'An update on your recent permit application to the Forest Service.',
    body: `
Permit application status update
**************************************

Unfortunately the following permit application has not been accepted.


${application.applicantMessage}

Application details
**************************************

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

If you would like to submit another permit application visit ${vcapConstants.INTAKE_CLIENT_BASE_URL}.


${defaultForestContact}
`
  };
};
