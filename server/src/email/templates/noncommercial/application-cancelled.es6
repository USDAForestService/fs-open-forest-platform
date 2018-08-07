const defaultApplicationDetails = require('./default-application-details.es6');
const defaultForestContact = require('../default-special-use-contact-info.es6');

module.exports = application => {

  return {
    to: application.applicantInfoEmailAddress,
    subject: `Your ${application.eventName} permit application to the Mt. Baker-Snoqualmie National Forest has been cancelled.`,
    body: `
Application details
*********************************

${defaultApplicationDetails.text(application)}


${defaultForestContact.text}
`,
    html: `
    <h2>Application details</h2>
    ${defaultApplicationDetails.html(application)}
    ${defaultForestContact.html}
    `
  };
};
