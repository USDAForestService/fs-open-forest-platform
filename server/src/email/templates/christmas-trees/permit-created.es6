const moment = require('moment');
const vcapConstants = require('../../../vcap-constants.es6');
const util = require('../../../util.es6');

module.exports = application => {
  return {
    to: application.emailAddress,
    subject: 'U.S. Forest Service: Your Christmas Tree Permit',
    body: `
Hello, ${application.firstName}. Thank you for purchasing your Christmas tree permit from the U.S. Forest Service.


Order Details
**************************************

Order number: ${application.paygovTrackingId}
Forest: ${application.christmasTreesForest.forestName} National Forest
Number of trees: ${application.quantity}
Name: ${application.firstName} ${application.lastName}
Payment: $${application.totalCost}
Transaction date: ${moment(application.createdAt, util.datetimeFormat).format('MM/DD/YYYY hh:mm a')}


Permit Printing Guidelines
**************************************
1. Download the attached permit.
2. Print your permit on plain white paper.
3. Display your printed permit on your vehicle when cutting down your Christmas tree. (Your printed permit has display instructions.)
4. Your permit is available for printing from the following url. Copy and paste the following url into your browser:

${application.permitUrl} 

Return to the ${application.christmasTreesForest.forestName} Christmas tree permit website, ${
      vcapConstants.intakeClientBaseUrl
    }/christmas-trees/forests/${
      application.christmasTreesForest.forestAbbr
    }/tree-guidelines, for more information about cutting down your tree.
`,
    html: `
    <div class="body">
    <p>Hello, ${
      application.firstName
    }. Thank you for purchasing your Christmas tree permit from the U.S. Forest Service.</p>
    <h2 class="border-bottom">Order Details</h2>
    <table class="bordered" cellpadding="0" cellspacing="0">
      <tr>
        <td style="width: 150px;" class="border-bottom border-right">Order number</td>
        <td class="border-bottom">${application.paygovTrackingId}</td>
      </tr>
      <tr>
        <td class="border-bottom border-right">Forest</td>
        <td class="border-bottom">${application.christmasTreesForest.forestName} National Forest</td>
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
      <li>Your permit is available for printing from <a href="${ application.permitUrl }">this link</a> or in an attachment to this email.
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
