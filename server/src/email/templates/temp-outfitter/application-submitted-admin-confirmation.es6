const moment = require('moment');
const vcapConstants = require('../../../vcap-constants.es6');
const util = require('../../../services/util.es6');

module.exports = application => {
  const applicationUrl = `${vcapConstants.INTAKE_CLIENT_BASE_URL}/admin/applications/temp-outfitter/${application.appControlNumber}`;

  return {
    to: vcapConstants.SPECIAL_USE_ADMIN_EMAIL_ADDRESSES,
    subject: `A new permit application with a start date of ${moment(
      application.tempOutfitterFieldsActDescFieldsStartDateTime,
      util.datetimeFormat
    ).format('MM/DD/YYYY')} has been submitted to the Mt. Baker-Snoqualmie National Forest.`,
    body: `
Go to ${applicationUrl} to log in and view the application.
**************************************

Application details
**************************************

Application identification number: ${application.applicationId}
Permit type: ${util.camelCaseToRegularForm(application.type)}
Business name: ${application.applicantInfoOrganizationName}
Start date: ${moment(application.tempOutfitterFieldsActDescFieldsStartDateTime, util.datetimeFormat).format(
      'MM/DD/YYYY'
    )}
End date: ${moment(application.tempOutfitterFieldsActDescFieldsEndDateTime, util.datetimeFormat).format('MM/DD/YYYY')}
Number of trips: ${application.tempOutfitterFieldsActDescFieldsNumTrips}
Number of participants: ${application.tempOutfitterFieldsActDescFieldsPartySize}
Services: ${application.tempOutfitterFieldsActDescFieldsServProvided}
`
  };
};
