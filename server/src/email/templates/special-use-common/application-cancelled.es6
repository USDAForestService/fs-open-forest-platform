const defaultForestContact = require('../default-special-use-contact-info.es6');

module.exports = (application, defaultApplicationDetails, subject) => {

  return {
    to: application.applicantInfoEmailAddress,
    subject: subject,
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
