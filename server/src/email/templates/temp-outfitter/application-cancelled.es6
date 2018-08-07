const defaultApplicationDetails = require('./default-application-details.es6');
const defaultForestContact = require('../default-special-use-contact-info.es6');

module.exports = application => {

  return {
    to: application.applicantInfoEmailAddress,
    subject: 'Your following permit application to the Mt. Baker-Snoqualmie National Forest has been cancelled.',
    body: `
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
