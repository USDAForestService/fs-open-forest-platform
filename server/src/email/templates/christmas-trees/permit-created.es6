const moment = require('moment');
const vcapConstants = require('../../../vcap-constants.es6');
const util = require('../../../services/util.es6');

module.exports = application => {
  return {
    to: application.emailAddress,
    subject: 'U.S. Forest Service: Your Christmas Tree Permit',
    body: `
Hello, ${application.firstName}. Thank you for purchasing your Christmas tree permit from the U.S. Forest Service.


Order Details
**************************************

Permit number: ${application.paygovTrackingId}
Forest: ${application.christmasTreesForest.forestName}
Number of trees: ${application.quantity}
Name: ${application.firstName} ${application.lastName}
Payment: $${application.totalCost}
Transaction date: ${moment(application.createdAt, util.datetimeFormat).format('MM/DD/YYYY hh:mm a')}


Permit Printing Guidelines
**************************************
1. Download the attached permit.
2. Print your permit on plain white paper. Your permit must be printed to be valid and cannot be stored on a mobile device.
3. Printed permit must be placed and clearly visible on your vehicle's dashboard with the permit side facing up.
4. Your permit is available for printing from the following url. Copy and paste the following url into your browser:

${application.permitUrl}

Return to the ${application.christmasTreesForest.forestName} Christmas tree permit website, ${
      vcapConstants.intakeClientBaseUrl
    }/christmas-trees/forests/${
      application.christmasTreesForest.forestAbbr
    }, for more information about cutting down your tree.
`,
    html: `
    <div class="body">
    <p>Hello, ${
      application.firstName
    }. Thank you for purchasing your Christmas tree permit from the U.S. Forest Service.</p>
    <h2 class="border-bottom">Order Details</h2>
    <table class="bordered" cellpadding="0" cellspacing="0">
      <tr>
        <td style="width: 150px;" class="border-bottom border-right">Permit number</td>
        <td class="border-bottom">${application.paygovTrackingId}</td>
      </tr>
      <tr>
        <td class="border-bottom border-right">Forest</td>
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
      <li>Print your permit on plain white paper. Your permit must be printed to be valid and cannot be stored on a mobile device.</li>
      <li>Printed permit must be placed and clearly visible on your vehicle's dashboard with the permit side facing up.</li>
      <li>Your permit is available for printing from <a href="${
        application.permitUrl
      }">this link</a> or in an attachment to this email.</li>
    </ul>
    <p>Return to the <a href="${vcapConstants.intakeClientBaseUrl}/christmas-trees/forests/${
      application.christmasTreesForest.forestAbbr
    }">${
      application.christmasTreesForest.forestName
    } Christmas tree permit website</a> for more information about cutting down your tree.</p>

    <p><img src="cid:christmas-tree-permit-image"/></p>
    </div>
    `,
    attachments: application.attachments
  };
};
