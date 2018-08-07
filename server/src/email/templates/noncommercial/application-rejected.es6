const vcapConstants = require('../../../vcap-constants.es6');
const defaultApplicationDetails = require('./default-application-details.es6');
const defaultForestContact = require('./default-contact-info.es6');

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
${defaultForestContact}
`
  };
};
