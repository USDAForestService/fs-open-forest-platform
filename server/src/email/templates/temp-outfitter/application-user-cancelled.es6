const moment = require('moment');
const vcapConstants = require('../../../vcap-constants.es6');
const util = require('../../../services/util.es6');

module.exports = application => {
  const businessName = util.businessNameElsePersonalName(application);

  return {
    to: vcapConstants.SPECIAL_USE_ADMIN_EMAIL_ADDRESSES,
    subject: `The following permit application from ${businessName} to the ${application.forestName} has been cancelled.`,
    body: `
      Application details
      *********************************

      Application identification number: ${application.applicationId}
      Permit type: ${util.camelCaseToRegularForm(application.type)}
      Contact name: ${application.applicantInfoPrimaryFirstName} ${application.applicantInfoPrimaryLastName}
      Business name: ${application.applicantInfoOrganizationName}
      Forest: ${application.forestName}
      Start date: ${moment(application.tempOutfitterFieldsActDescFieldsStartDateTime, util.datetimeFormat).format(
            'MM/DD/YYYY hh:mm a'
          )}
      End date: ${moment(application.tempOutfitterFieldsActDescFieldsEndDateTime, util.datetimeFormat).format(
            'MM/DD/YYYY hh:mm a'
          )}
      Number of trips: ${application.tempOutfitterFieldsActDescFieldsNumTrips}
      Number of participants: ${application.tempOutfitterFieldsActDescFieldsPartySize}
      Services: ${application.tempOutfitterFieldsActDescFieldsServProvided}

            Go to ${vcapConstants.INTAKE_CLIENT_BASE_URL}/admin/applications to log in.
    `,
    html: `
      <h2>Application Details</h2>
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
    </table>
    <p><a href="${vcapConstants.INTAKE_CLIENT_BASE_URL}/admin/applications">Log in to view pending applications</a></p>
  `
  };
};
