const defaultApplicationDetails = require('./default-application-details.es6');
const defaultForestContact = require('./default-contact-info.es6');

module.exports = application => {

  return {
    to: application.applicantInfoEmailAddress,
    subject: 'An update on your recent permit application to the Forest Service.',
    body: `
Permit application status update
*********************************

We are reviewing the additional information you provided.


Application details
*********************************

${defaultApplicationDetails(application)}

What happens next?
*********************************

1. Your new information will be reviewed by our staff.
2. If additional information is needed, a representative of the National Forest Service will contact you via email to resolve any issues.
3. Once your application has been reviewed by our staff, you will be notified of the application status.
4. If your application is approved, you will receive your permit within 2 weeks of approval.


Contact us
*********************************
${defaultForestContact}
`
  };
};
