const defaultForestContact = require('../default-special-use-contact-info.es6');

module.exports = (application, defaultApplicationDetails) => {

  return {
    to: application.applicantInfoEmailAddress,
    subject: 'An update on your recent Digital Permits permit application to the Forest Service.',
    body: `
      Digital Permits permit application status update
      *********************************

      We are reviewing the additional information you provided.

      ${defaultApplicationDetails.text(application)}

      What happens next?
      *********************************

      1. Your new information will be reviewed by our staff.
      2. If additional information is needed, a Special Use Administrator will contact you by email.
      3. Once your application has been reviewed by our staff, you will be notified of the application status.
      4. If your application is approved, you will receive your permit within 2 weeks of approval.


      ${defaultForestContact.text}
    `,
    html: `
        <h2>Digital Permits permit application status update</h2>
        <p>We are reviewing the additional information you provided.</p>
        ${defaultApplicationDetails.html(application)}
        <h2>What happens next?</h2>
        <ol>
        <li>Your new application will be reviewed by our staff.</li>
        <li>If additional information is needed, a Special Use Administrator will contact you by email.</li>
        <li>Once your application has been reviewed by our staff, you will be notified of the application status.</li>
        <li>If your application is approved, you will receive your permit within 2 weeks of approval.</li>
        </ol>
        ${defaultForestContact.html}
    `
  };
};
