const vcapConstants = require('../../../vcap-constants.es6');

module.exports = (application, defaultAdminApplicationDetails) => {
  const applicationUrl = `${vcapConstants.INTAKE_CLIENT_BASE_URL}/admin/applications`;

  return {
    to: vcapConstants.SPECIAL_USE_ADMIN_EMAIL_ADDRESSES,
    subject: 'An update to a recent Open Forest permit application has been submitted for review.',
    body: `
      Go to ${applicationUrl} to log in and view the application.
      **************************************

      Application details
      **************************************

      ${defaultApplicationDetails.text(application)}

    `, 
    html: `
        <h2>Open Forest permit application status update</h2>
        <p>An update to a recent Open Forest permit application has been submitted for review.</p>
        ${defaultApplicationDetails.html(application)}
`
  };
};
