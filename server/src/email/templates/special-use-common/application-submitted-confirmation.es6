const defaultForestContact = require('../default-special-use-contact-info.es6');
const util = require('../../../services/util.es6');

module.exports = (application, defaultApplicationDetails, reviewTime) => {

  return {
    to: application.applicantInfoEmailAddress,
    subject: `Your ${application.type === 'tempOutfitters' ? 'Temporary Outfitting and Guiding' : 'Non-Commercial Group Use'} permit application has been submitted for review!`,
    body: `
      Submitted for review!
      **************************************

      Your Digital Permits permit application has been submitted for review, but is NOT APPROVED until you hear from a special use administrator. Submitting an application does not guarantee your permit will be approved.


    ${defaultApplicationDetails.text(application)}

      What happens next?
      **************************************

      1. Your application will be reviewed by our staff${reviewTime}.
      2. If additional information is needed, a Special Use Administrator will contact you by email.
      3. Once your application has been reviewed by our staff, you will be notified of the application status.
      4. If your application is approved, you will receive your permit within 2 weeks of approval.


      ${defaultForestContact.text}
    `,
    html: `
    <h2>Submitted for review!</h2>
    <p>Your Digital Permits permit application has been submitted for review, but is <strong>NOT APPROVED</strong> until
     you hear from a special use administrator. Submitting an application does not guarantee your permit
      will be approved.</p>
    ${defaultApplicationDetails.html(application)}
    <h2>What happens next?</h2>
    <ol>
      <li>Your application will be reviewed by our staff${reviewTime}.</li>
      <li>If additional information is needed, a Special Use Administrator will contact you by email.</li>
      <li>Once your application has been reviewed by our staff, you will be notified of the application status.</li>
      <li>If your application is approved, you will receive your permit within 2 weeks of approval.</li>
    </ol>
    ${defaultForestContact.html}
    `
  };
};
