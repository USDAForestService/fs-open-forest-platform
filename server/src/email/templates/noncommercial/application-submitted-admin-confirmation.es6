const moment = require('moment');

const vcapConstants = require('../../../vcap-constants.es6');
const util = require('../../../services/util.es6');

module.exports = application => {
  const applicationUrl = `${vcapConstants.INTAKE_CLIENT_BASE_URL}/admin/applications/noncommercial/${application.appControlNumber}`;

  return {
    to: vcapConstants.SPECIAL_USE_ADMIN_EMAIL_ADDRESSES,
    subject: `A new permit application with a start date of ${moment(
      application.noncommercialFieldsStartDateTime,
      util.datetimeFormat
    ).format('MM/DD/YYYY')} has been submitted to the Mt. Baker-Snoqualmie National Forest.`,
    body: `
Go to ${applicationUrl} to log in and view the application.
**************************************

Application details
**************************************

Application identification number: ${application.applicationId}
Permit type:  ${util.camelCaseToRegularForm(application.type)}
Event name: ${application.eventName}
Start date: ${moment(application.noncommercialFieldsStartDateTime, util.datetimeFormat).format('MM/DD/YYYY hh:mm a')}
End date: ${moment(application.noncommercialFieldsEndDateTime, util.datetimeFormat).format('MM/DD/YYYY hh:mm a')}
Number of participants: ${application.noncommercialFieldsNumberParticipants}
Number of spectators: ${application.noncommercialFieldsSpectatorCount}
Location: ${application.noncommercialFieldsLocationDescription}
`
  };
};
