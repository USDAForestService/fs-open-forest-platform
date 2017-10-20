const moment = require('moment');

const vcapConstants = require('../../../vcap-constants.es6');
const util = require('../../../util.es6');

module.exports = application => {
  return {
    to: vcapConstants.specialUseAdminEmailAddresses,
    subject: `The ${application.eventName} permit application to the Mt. Baker-Snoqualmie National Forest has been cancelled.`,
    body: `
Application details
*********************************

Permit type: ${util.camelCaseToRegularForm(application.type)}
Event name: ${application.eventName}
Start date: ${moment(application.noncommercialFieldsStartDateTime, util.datetimeFormat).format('MM/DD/YYYY hh:mm a')}
End date: ${moment(application.noncommercialFieldsEndDateTime, util.datetimeFormat).format('MM/DD/YYYY hh:mm a')}
Number of participants: ${application.noncommercialFieldsNumberParticipants}
Number of spectators: ${application.noncommercialFieldsSpectatorCount}
Location: ${application.noncommercialFieldsLocationDescription}

Go to ${vcapConstants.intakeClientBaseUrl}/admin/applications to log in.
`
  };
};
