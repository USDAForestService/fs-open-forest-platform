const moment = require('moment');
const vcapConstants = require('../../../vcap-constants.es6');
const util = require('../../../services/util.es6');

module.exports = application => {
  const businessName = util.businessNameElsePersonalName(application);

  return {
    to: vcapConstants.SPECIAL_USE_ADMIN_EMAIL_ADDRESSES,
    subject: `The following permit application from ${businessName} to the Mt. Baker-Snoqualmie National Forest has been cancelled.`,
    body: `
Application details
*********************************

Application identification number: ${application.applicationId}
Permit type: ${util.camelCaseToRegularForm(application.type)}
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

Go to ${vcapConstants.INTAKE_CLIENT_BASE_URL}/admin/applications to log in.
`
  };
};
