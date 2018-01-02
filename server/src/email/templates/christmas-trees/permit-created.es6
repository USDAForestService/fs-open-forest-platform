const moment = require('moment');
const vcapConstants = require('../../../vcap-constants.es6');
const util = require('../../../util.es6');

module.exports = application => {
  return {
    to: application.emailAddress,
    subject: 'U.S. Forest Service: Your Christmas Tree Permit',
    body: `
Christmas tree permit!
**************************************

Here is your permit

Application details
**************************************

Application identification number:


What happens next?
**************************************

1. Your application will be reviewed by our staff within 48 hours.
2. If additional information is needed, a representative of the National Forest Service will contact you via email to resolve any issues.
3. Once your application has been reviewed by our staff, you will be notified of the application status.
4. If your application is approved, you will receive your permit within 2 weeks of approval.


Contact us
**************************************

If you have questions or need to contact the permit staff at the National Forest Service, please use a method listed below.

Noncommercial contact
Name: Sue Sherman-Biery
Title: Special use administrator
Phone: 360-854-2660
Email: sshermanbiery@fs.fed.us

Thank you for your interest in our National Forests.
`,
    html: `
    <div class="body">
    <div class="float-right">Tracking id: ${application.paygovTrackingId}</div>
    <p>Hello ${application.firstName},</p>
    <p>Thank you for purchasing your Christmas tree permit from the U.S. Forest Service.</p>
    <p>Below are the details of your purchase and your permit.</p>
    <h2>Order Details</h2>
    <p>Forest: ${application.christmasTreesForest.forestName}<br/>
    No. of Trees: ${application.quantity}<br />
    Name: ${application.firstName} ${application.lastName}<br />
    Payment: $${application.totalCost}<br />
    Transaction date: ${moment(application.createdAt, util.datetimeFormat).format('MM/DD/YYYY hh:mm a')}<br />
    </p>
    <p>You must print this permit and have it properly displayed on your vehicle when cutting down your Christmas tree. When printing your permit, use plain white paper. The printed permit will have instructions on how to properly place it on your vehicle.</p>
    <p>Return to the <a href="${vcapConstants.intakeClientBaseUrl}/christmas-trees/forests/${
      application.christmasTreesForest.forestAbbr
    }/tree-guidelines">${
      application.christmasTreesForest.forestName
    } Christmas tree permit website</a> for more information about cutting down your tree.</p>

    <p><img src="cid:unique@kreata.ee"/></p>
    </div>
    `,
    attachments: application.attachments
  };
};
