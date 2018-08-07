const moment = require('moment');
const util = require('../../../services/util.es6');

module.exports = application => {
  return `Application identification number: ${application.applicationId}
    Contact name: ${application.applicantInfoPrimaryFirstName} ${application.applicantInfoPrimaryLastName}
    Event name: ${application.eventName}
    Start date: ${moment(application.noncommercialFieldsStartDateTime, util.datetimeFormat).format('MM/DD/YYYY hh:mm a')}
    End date: ${moment(application.noncommercialFieldsEndDateTime, util.datetimeFormat).format('MM/DD/YYYY hh:mm a')}
    Number of participants: ${application.noncommercialFieldsNumberParticipants}
    Number of spectators: ${application.noncommercialFieldsSpectatorCount}
    Location: ${application.noncommercialFieldsLocationDescription}
    
    ${util.userApplicationLink(application)}`;
};
