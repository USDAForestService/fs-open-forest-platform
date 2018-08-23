const defaultForestContact = require('../default-special-use-contact-info.es6');
const vcapConstants = require('../vcap-constants.es6');


module.exports = (application, defaultApplicationDetails) => {
  const editURLAppType = (application.type == 'noncommericial') ? 'noncommericial-group-use' : 'temp-outfitters';
  const editLink = `${vcapConstants.INTAKE_CLIENT_BASE_URL}/applications/${editURLAppType}/${application.appControlNumber}/edit`;
  return {
    to: application.applicantInfoEmailAddress,
    subject: 'An update on your recent permit application to the Forest Service.',
    body: `
    Permit application status update
    *********************************

    Your recently submitted application has been put on hold due to insufficient information. Please log in, provide the requested information below, and save your application.

    ${application.applicantMessage}

    Login at ${editLink}


    ${defaultApplicationDetails.text(application)}


    What happens next?
    **************************************

    1. Log back in and submit additional information.
    2. Your application will be reviewed by our staff.
    3. If additional information is needed, a representative of the National Forest Service will contact you via email to resolve any issues.
    4. Once your application has been reviewed by our staff, you will be notified of the application status.
    5. If your application is approved, you will receive your permit within 2 weeks of approval.


    ${defaultForestContact.text}
`,
    html: `
    <h2>Permit application status update</h2>
    <p>Your recently submitted application has been put on hold
     due to insufficient information. Please log in, provide the
      requested information below, and save your application.</p>
    <p>${application.applicantMessage}</p>
    <p><a href="${editLink}">
    Login and edit your application
    </a></p>
    ${defaultApplicationDetails.html(application)}
    <h2>What happens next?</h2>
    <ol>
      <li>Log back in and submit additional information.</li>
      <li>Your application will be reviewed by our staff.</li>
      <li>If additional information is needed, a representative of the National Forest Service will contact you via email to resolve any issues.</li>
      <li>Once your application has been reviewed by our staff, you will be notified of the application status.</li>
      <li>If your application is approved, you will receive your permit within 2 weeks of approval.</li>
    </ol>
    ${defaultForestContact.html}
    `
  };
};
