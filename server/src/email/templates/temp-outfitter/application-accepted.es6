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
*********************************

The permit application listed below has passed a preliminary review! An administrator will now do a more in-depth review and may be contacting you to get any additional details or documents needed.

Then, if your application is approved, you will receive your permit within 2 weeks of approval.

${application.applicantMessage}


If you would like to submit another permit application visit ${vcapConstants.INTAKE_CLIENT_BASE_URL}.


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

${defaultForestContact}
`
  };
};
