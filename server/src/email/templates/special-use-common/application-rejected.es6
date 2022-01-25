
const vcapConstants = require('../../../vcap-constants.es6');
const defaultForestContact = require('../default-special-use-contact-info.es6');

module.exports = (application, defaultApplicationDetails) => {

  return {
    to: application.applicantInfoEmailAddress,
    subject: 'An update on your recent Digital Permitsmits permit application to the Forest Service.',
    body: `
      Digital Permitsmits permit application status update
      **************************************

      Unfortunately the following permit application has not been accepted.

      ${application.applicantMessage}

      ${defaultApplicationDetails.text(application)}

      If you would like to submit another permit application visit ${vcapConstants.INTAKE_CLIENT_BASE_URL}.

      ${defaultForestContact.text}
    `,
    html: `
    <h2>Digital Permitsmits permit application status update</h2>
    <p>Unfortunately the following permit application has not been accepted.</p>
    <p>${application.applicantMessage}</p>
    ${defaultApplicationDetails.html(application)}
    <p>If you would like to submit another permit application visit <a href="${vcapConstants.INTAKE_CLIENT_BASE_URL}">Digital Permitsmits</a>.</p>
    ${defaultForestContact.html}
    `
  };
};
