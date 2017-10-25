const moment = require('moment');
const vcapConstants = require('../../../vcap-constants.es6');
const util = require('../../../util.es6');

module.exports = application => {
  const applicationUrl = `${vcapConstants.intakeClientBaseUrl}/admin/applications/temp-outfitter/${application.appControlNumber}`;

  return {
    to: vcapConstants.specialUseAdminEmailAddresses,
    subject: `A new permit application with a start date of ${moment(
      application.tempOutfitterFieldsActDescFieldsStartDateTime,
      util.datetimeFormat
    ).format('MM/DD/YYYY')} has been submitted to the Mt. Baker-Snoqualmie National Forest.`,
    body: `
Go to ${applicationUrl} to log in and view the application.
**************************************

Application details
**************************************

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
