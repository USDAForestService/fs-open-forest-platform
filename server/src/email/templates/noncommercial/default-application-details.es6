const moment = require('moment');
const util = require('../../../services/util.es6');

module.exports = {
  text: application => {
    return `
      Application identification number: ${application.applicationId}
      Contact name: ${application.applicantInfoPrimaryFirstName} ${application.applicantInfoPrimaryLastName}
      Event name: ${application.eventName}
      Start date: ${moment(application.noncommercialFieldsStartDateTime, util.datetimeFormat).format('MM/DD/YYYY hh:mm a')}
      End date: ${moment(application.noncommercialFieldsEndDateTime, util.datetimeFormat).format('MM/DD/YYYY hh:mm a')}
      Number of participants: ${application.noncommercialFieldsNumberParticipants}
      Number of spectators: ${application.noncommercialFieldsSpectatorCount}
      Location: ${application.noncommercialFieldsLocationDescription}
      
      ${util.userApplicationLink(application)}`;
  },
  html: application => {
    return `
    <table class="bordered" cellpadding="0" cellspacing="0">
      <tr>
        <th scope="row" style="width: 150px;" class="border-bottom border-right">Application identification number</th>
        <td class="border-bottom">${application.applicationId}</td>
      </tr>
      <tr>
        <th scope="row" style="width: 150px;" class="border-bottom border-right">Contact name</th>
        <td class="border-bottom">
          ${application.applicantInfoPrimaryFirstName} ${application.applicantInfoPrimaryLastName}
        </td>
      </tr>
      <tr>
        <th scope="row" style="width: 150px;" class="border-bottom border-right">Event name</th>
        <td class="border-bottom">${application.eventName}</td>
      </tr>
      <tr>
        <th scope="row" style="width: 150px;" class="border-bottom border-right">Start date</th>
        <td class="border-bottom">
          ${moment(application.noncommercialFieldsStartDateTime, util.datetimeFormat).format('MM/DD/YYYY hh:mm a')}
        </td>
      </tr>
      <tr>
        <th scope="row" style="width: 150px;" class="border-bottom border-right">End date</th>
        <td class="border-bottom">
          ${moment(application.noncommercialFieldsEndDateTime, util.datetimeFormat).format('MM/DD/YYYY hh:mm a')}
        </td>
      </tr>
      <tr>
        <th scope="row" style="width: 150px;" class="border-bottom border-right">Number of participants</th>
        <td class="border-bottom">${application.noncommercialFieldsNumberParticipants}</td>
      </tr>
      <tr>
        <th scope="row" style="width: 150px;" class="border-bottom border-right">Number of spectators</th>
        <td class="border-bottom">${application.noncommercialFieldsSpectatorCount}</td>
      </tr>
      <tr>
        <th scope="row" style="width: 150px;" class="border-bottom border-right">Location</th>
        <td class="border-bottom">${application.noncommercialFieldsLocationDescription}</td>
      </tr>  
    </table>
    <p><a href="${util.userApplicationLink(application)}">View your application</a></p>
    `;
  }
};
