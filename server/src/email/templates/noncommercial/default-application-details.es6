const moment = require('moment');
const util = require('../../../services/util.es6');

module.exports = {
  text: application => {
    const linkDetails = util.userApplicationLink(application, true);
    return `
      Application details
      *********************************
      
      app status: ${application.status}
      Application identification number: ${application.applicationId}
      Contact name: ${application.applicantInfoPrimaryFirstName} ${application.applicantInfoPrimaryLastName}
      Forest: ${application.forestName}
      Event name: ${application.eventName}
      Start date: ${moment(application.noncommercialFieldsStartDateTime, util.datetimeFormat).format('MM/DD/YYYY hh:mm a')}
      End date: ${moment(application.noncommercialFieldsEndDateTime, util.datetimeFormat).format('MM/DD/YYYY hh:mm a')}
      Number of participants: ${application.noncommercialFieldsNumberParticipants}
      Number of spectators: ${application.noncommercialFieldsSpectatorCount}
      Location: ${application.noncommercialFieldsLocationDescription}
      
      ${linkDetails.text}: ${linkDetails.url}`;
  },
  html: application => {
    const linkDetails = util.userApplicationLink(application, false);
    const startDate = moment(application.noncommercialFieldsStartDateTime, util.datetimeFormat).format('MM/DD/YYYY hh:mm a');
    const endDate = moment(application.noncommercialFieldsEndDateTime, util.datetimeFormat).format('MM/DD/YYYY hh:mm a');
    return `
    <h2>Application details</h2>
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
        <th scope="row" style="width: 150px;" class="border-bottom border-right">Forest</th>
        <td class="border-bottom">${application.forestName}</td>
      </tr>
      <tr>
        <th scope="row" style="width: 150px;" class="border-bottom border-right">Event name</th>
        <td class="border-bottom">${application.eventName}</td>
      </tr>
      <tr>
        <th scope="row" style="width: 150px;" class="border-bottom border-right">Start date</th>
        <td class="border-bottom">
          ${startDate}
        </td>
      </tr>
      <tr>
        <th scope="row" style="width: 150px;" class="border-bottom border-right">End date</th>
        <td class="border-bottom">
          ${endDate}
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
      <tr>
        <td class="border-bottom" colspan="2"><a href="${linkDetails.url}">${linkDetails.text}</a></td>
      </tr>   
    </table>
    `;
  }
};
