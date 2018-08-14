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
    ).format('MM/DD/YYYY')} has been submitted to the ${application.forestName}.`,
    body: `
      Go to ${applicationUrl} to log in and view the application.
      **************************************

      Application details
      **************************************

      Application identification number: ${application.applicationId}
      Permit type:  ${util.camelCaseToRegularForm(application.type)}
      Contact name: ${application.applicantInfoPrimaryFirstName} ${application.applicantInfoPrimaryLastName}
      Forest: ${application.forestName}
      Event name: ${application.eventName}
      Start date: ${moment(application.noncommercialFieldsStartDateTime, util.datetimeFormat).format('MM/DD/YYYY hh:mm a')}
      End date: ${moment(application.noncommercialFieldsEndDateTime, util.datetimeFormat).format('MM/DD/YYYY hh:mm a')}
      Number of participants: ${application.noncommercialFieldsNumberParticipants}
      Number of spectators: ${application.noncommercialFieldsSpectatorCount}
      Location: ${application.noncommercialFieldsLocationDescription}
    `, 
    html: `
    <p><a href="${ applicationUrl }">Login and view the application.</a></p>
    <hr />
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
`
  };
};
