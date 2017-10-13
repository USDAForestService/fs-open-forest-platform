const moment = require('moment');
const vcapConstants = require('../../../vcap-constants.es6');
const util = require('../../../util.es6');

module.exports = application => {
  const applicationUrl = `${vcapConstants.intakeClientBaseUrl}/admin/applications/noncommercial/${application.appControlNumber}`;

  return {
    to: vcapConstants.specialUseAdminEmailAddresses,
    subject: `A new permit application with a start date of ${moment(
      application.noncommercialFieldsStartDateTime,
      'YYYY-MM-DDTHH:mm:ss'
    ).format('MM/DD/YYYY')} has been submitted to the Mt. Baker-Snoqualmie National Forest.`,
    body: `
Go to ${applicationUrl} to log in and view the application.
**************************************

Application details
**************************************

Permit type:  ${util.camelCaseToRegularForm(application.type)}
Event name: ${application.eventName}
Start date: ${moment(application.noncommercialFieldsStartDateTime, 'YYYY-MM-DDTHH:mm:ss').format('MM/DD/YYYY hh:mm a')}
End date: ${moment(application.noncommercialFieldsEndDateTime, 'YYYY-MM-DDTHH:mm:ss').format('MM/DD/YYYY hh:mm a')}
Number of participants: ${application.noncommercialFieldsNumberParticipants}
Number of spectators: ${application.noncommercialFieldsSpectatorCount}
Location: ${application.noncommercialFieldsLocationDescription}
`
  };
};
