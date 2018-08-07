const defaultApplicationDetails = require('./default-application-details.es6');

module.exports = application => {

  return {
    to: application.applicantInfoEmailAddress,
    subject: `Your ${application.eventName} permit application to the Mt. Baker-Snoqualmie National Forest has been cancelled.`,
    body: `
Application details
*********************************

${defaultApplicationDetails(application)}

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
