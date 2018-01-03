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
    <div class="float-right">Order number: ${application.paygovTrackingId}</div>
    <p>Hello ${
      application.firstName
    }. Thank you for purchasing your Christmas tree permit from the U.S. Forest Service.</p>
    <h2 class="border-bottom">Order Details</h2>
    <table class="bordered" cellpadding="0" cellspacing="0">
      <tr>
        <td style="width: 150px;" class="border-bottom border-right">Forest</td>
        <td class="border-bottom">${application.christmasTreesForest.forestName}</td>
      </tr>
      <tr>
        <td class="border-bottom border-right">Number of trees</td>
        <td class="border-bottom">${application.quantity}</td>
      </tr>
      <tr>
        <td class="border-bottom border-right">Name</td>
        <td class="border-bottom">${application.firstName} ${application.lastName}</td>
      </tr>
      <tr>
        <td class="border-bottom border-right">Payment</td>
        <td class="border-bottom">$${application.totalCost}</td>
      </tr>
      <tr>
        <td class="border-right">Transaction date</td>
        <td>${moment(application.createdAt, util.datetimeFormat).format('MM/DD/YYYY hh:mm a')}</td>
      </tr>
    </table>

    <h2 class="border-bottom">Permit Printing Guidelines</h2>
    <ul>
      <li>Print your permit on plain white paper.</li>
      <li>Display your printed permit on your vehicle when cutting down your Christmas tree. (Your printed permit has display instructions.)</li>
    </ul>
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
