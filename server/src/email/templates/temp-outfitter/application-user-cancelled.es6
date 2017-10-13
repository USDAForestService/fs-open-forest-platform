const moment = require('moment');
const vcapConstants = require('../../../vcap-constants.es6');
const util = require('../../../util.es6');

module.exports = application => {
  const businessName = util.businessNameElsePersonalName(application);

  return {
    to: vcapConstants.specialUseAdminEmailAddresses,
    subject: `The following permit application from ${businessName} to the Mt. Baker-Snoqualmie National Forest has been cancelled.`,
    body: `
Application details
*********************************

Permit type: ${util.camelCaseToRegularForm(application.type)}
Business name: ${application.applicantInfoOrganizationName}
Start date: ${moment(application.tempOutfitterFieldsActDescFieldsStartDateTime, 'YYYY-MM-DDTHH:mm:ss').format(
      'MM/DD/YYYY hh:mm a'
    )}
End date: ${moment(application.tempOutfitterFieldsActDescFieldsEndDateTime, 'YYYY-MM-DDTHH:mm:ss').format(
      'MM/DD/YYYY hh:mm a'
    )}
Number of trips: ${application.tempOutfitterFieldsActDescFieldsNumTrips}
Number of participants: ${application.tempOutfitterFieldsActDescFieldsPartySize}
Services: ${application.tempOutfitterFieldsActDescFieldsServProvided}

Go to ${vcapConstants.intakeClientBaseUrl}/admin/applications to log in.
`
  };
};
