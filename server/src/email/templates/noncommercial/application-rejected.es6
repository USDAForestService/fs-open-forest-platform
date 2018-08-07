const vcapConstants = require('../../../vcap-constants.es6');
const defaultApplicationDetails = require('./default-application-details.es6');
const defaultForestContact = require('../default-special-use-contact-info.es6');

module.exports = application => {

  return {
    to: application.applicantInfoEmailAddress,
    subject: 'An update on your recent permit application to the Forest Service.',
    body: `
Permit application status update
**************************************

Unfortunately the following permit application has not been accepted.

${application.applicantMessage}


Application details
**************************************

${defaultApplicationDetails.text(application)}

If you would like to submit another permit application visit ${vcapConstants.INTAKE_CLIENT_BASE_URL}.


${defaultForestContact.text}
`,
    html: `
    <h2>Permit application status update</h2>
    <p>Unfortunately the following permit application has not been accepted.</p>
    <p>${application.applicantMessage}</p>
    <h2>Application details</h2>
    ${defaultApplicationDetails.html(application)}
    <p>If you would like to submit another permit application visit <a href="${vcapConstants.INTAKE_CLIENT_BASE_URL}">Open Forest</a>.</p>
    ${defaultForestContact.html}
    `
  };
};
