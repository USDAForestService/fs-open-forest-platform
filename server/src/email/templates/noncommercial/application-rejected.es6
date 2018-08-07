const vcapConstants = require('../../../vcap-constants.es6');
const defaultApplicationDetails = require('./default-application-details.es6');

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

${defaultApplicationDetails(application)}

If you would like to submit another permit application visit ${vcapConstants.INTAKE_CLIENT_BASE_URL}.


Contact us
**************************************

If you have questions or need to contact the permit staff at the National Forest Service, please use a method listed below.

Noncommercial contact
Name: Sue Sherman-Biery
Title: Special use administrator
Phone: 360-854-2660
Email: sshermanbiery@fs.fed.us

Thank you for your interest in our National Forests.
`
  };
};
