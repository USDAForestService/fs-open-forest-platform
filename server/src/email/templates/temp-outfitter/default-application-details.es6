const moment = require('moment');
const util = require('../../../services/util.es6');

module.exports = application => {
  return `
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

  ${util.userApplicationLink(application)}`;
};
