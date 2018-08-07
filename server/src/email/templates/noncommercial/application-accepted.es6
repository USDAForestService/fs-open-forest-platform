const vcapConstants = require('../../../vcap-constants.es6');
const defaultApplicationDetails = require('./default-application-details.es6');

module.exports = application => {

  return {
    to: application.applicantInfoEmailAddress,
    subject: 'An update on your recent permit application to the Forest Service.',
    body: `
Permit application status update
*********************************

The permit application listed below has passed a preliminary review! An administrator will now do a more in-depth review and may be contacting you to get any additional details or documents needed.

Then, if your application is approved, you will receive your permit within 2 weeks of approval.

${application.applicantMessage}


Application details
*********************************

${defaultApplicationDetails(application)}


Contact us
*********************************

If you have questions or need to contact the permit staff at the National Forest Service, please use a method listed below.

Noncommercial contact
Name: Sue Sherman-Biery
Title: Special use administrator
Phone: 360-854-2660
Email: sshermanbiery@fs.fed.us


If you would like to submit another permit application visit ${vcapConstants.INTAKE_CLIENT_BASE_URL}.

Thank you for your interest in our National Forests.
`
  };
};
