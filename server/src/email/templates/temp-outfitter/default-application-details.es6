const moment = require('moment');
const util = require('../../../services/util.es6');

module.exports = {
  text: application => {
    const linkDetails = util.userApplicationLink(application, true);
    return `
  Application details
  *********************************

  Application identification number: ${application.applicationId}
  Contact name: ${application.applicantInfoPrimaryFirstName} ${application.applicantInfoPrimaryLastName}
  Business name: ${application.applicantInfoOrganizationName}
  Forest: ${application.forestName}
  Start date: ${moment(application.tempOutfitterFieldsActDescFieldsStartDateTime, util.datetimeFormat)
    .format('MM/DD/YYYY')}
  End date: ${moment(application.tempOutfitterFieldsActDescFieldsEndDateTime, util.datetimeFormat)
    .format('MM/DD/YYYY')}
  Number of trips: ${application.tempOutfitterFieldsActDescFieldsNumTrips}
  Number of participants: ${application.tempOutfitterFieldsActDescFieldsPartySize}
  Services provided: ${application.tempOutfitterFieldsActDescFieldsServProvided}

  ${linkDetails.text}: ${linkDetails.url}`;
  },
  html: application => {
    const linkDetails = util.userApplicationLink(application, false);
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
      <tr>
        <th scope="row" style="width: 150px;" class="border-bottom border-right">Business name</th>
        <td class="border-bottom">${application.applicantInfoOrganizationName}</td>
      </tr>
      <tr>
        <th scope="row" style="width: 150px;" class="border-bottom border-right">Forest</th>
        <td class="border-bottom">${application.forestName}</td>
      </tr>
      <tr>
        <th scope="row" style="width: 150px;" class="border-bottom border-right">Start date</th>
        <td class="border-bottom">
          ${moment(application.tempOutfitterFieldsActDescFieldsStartDateTime, util.datetimeFormat).format('MM/DD/YYYY')}
        </td>
      </tr>
      <tr>
        <th scope="row" style="width: 150px;" class="border-bottom border-right">End date</th>
        <td class="border-bottom">
          ${moment(application.tempOutfitterFieldsActDescFieldsEndDateTime, util.datetimeFormat).format('MM/DD/YYYY')}
        </td>
      </tr>
      <tr>
        <th scope="row" style="width: 150px;" class="border-bottom border-right">Number of trips</th>
        <td class="border-bottom">${application.tempOutfitterFieldsActDescFieldsNumTrips}</td>
      </tr>
      <tr>
        <th scope="row" style="width: 150px;" class="border-bottom border-right">Number of participants</th>
        <td class="border-bottom">${application.tempOutfitterFieldsActDescFieldsPartySize}</td>
      </tr>
      <tr>
        <th scope="row" style="width: 150px;" class="border-bottom border-right">Services provided</th>
        <td class="border-bottom">${application.tempOutfitterFieldsActDescFieldsServProvided}</td>
      </tr>
      <tr>
        <td class="border-bottom" colspan="2"><a href="${linkDetails.url}">${linkDetails.text}</a></td>
      </tr>   
    </table>
    `;
  }
};
