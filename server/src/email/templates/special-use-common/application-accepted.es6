const vcapConstants = require('../../../vcap-constants.es6');
const defaultForestContact = require('../default-special-use-contact-info.es6');

module.exports = (application, defaultApplicationDetails) => {

  return {
    to: application.applicantInfoEmailAddress,
    subject: 'An update on your recent permit application to the Forest Service.',
    body: `
      Permit application status update
      *********************************

      The permit application listed below has passed a preliminary review for the ${application.forestName}! An administrator will now do a more in-depth review and may be contacting you to get any additional details or documents needed.

      Then, if your application is approved, you will receive your permit within 2 weeks of approval.

      ${application.applicantMessage}

      If you would like to submit another permit application visit ${vcapConstants.INTAKE_CLIENT_BASE_URL}.

      ${defaultApplicationDetails.text(application)}


      ${defaultForestContact.text}
      `,
    html: `
    <h2>Permit application status update</h2>
    <p>The permit application listed below has passed a preliminary review!
     An administrator will now do a more in-depth review and may be contacting
     you to get any additional details or documents needed.</p>
    <p>Then, if your application is approved, you will receive your permit within
     2 weeks of approval.</p>
    <p>${application.applicantMessage}</p>
    <p>If you would like to submit another permit application
     visit <a href="${vcapConstants.INTAKE_CLIENT_BASE_URL}">Open Forest</a>.</p>
    ${defaultApplicationDetails.html(application)}
    ${defaultForestContact.html}
    `
  };
};
