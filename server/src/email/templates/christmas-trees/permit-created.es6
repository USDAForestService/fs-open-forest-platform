const moment = require('moment-timezone');
const zpad = require('zpad');
const vcapConstants = require('../../../vcap-constants.es6');

module.exports = application => {
  return {
    to: application.emailAddress,
    subject: 'U.S. Forest Service: Your Christmas Tree Permit from Digital Permitsmits',
    body: `
Hello, ${application.firstName}. Thank you for purchasing your Christmas tree permit from the U.S. Forest Service.


Order Details
**************************************

Permit number: ${zpad(application.permitNumber, 8)}
Forest: ${application.christmasTreesForest.forestName}
Number of trees: ${application.quantity}
Name: ${application.firstName} ${application.lastName}
Payment: $${application.totalCost}
Transaction date: ${moment.tz(application.createdAt, application.christmasTreesForest.timezone).format('MM/DD/YYYY')}


Permit Printing Guidelines
**************************************
1. Download the attached permit.
2. Print your permit on plain white paper. Your permit must be printed to be valid and cannot be stored on a mobile device.
3. Printed permit must be placed and clearly visible on your vehicle's dashboard with the permit side facing up.
4. Your permit is available for printing from the following url. Copy and paste the following url into your browser:

${application.permitUrl}

Return to the ${application.christmasTreesForest.forestName} Digital Permitsmits Christmas tree permit website, ${
  vcapConstants.INTAKE_CLIENT_BASE_URL
}/christmas-trees/forests/${
  application.christmasTreesForest.forestAbbr
}, for more information about cutting down your tree.
`,
    html: `
    <p>Hello, ${
  application.firstName
}. Thank you for purchasing your Christmas tree permit from the U.S. Forest Service.</p>
    <h1 class="border-bottom">Order Details</h1>
    <table class="bordered" cellpadding="0" cellspacing="0">
      <tr>
        <th scope="row" style="width: 150px;" class="border-bottom border-right">Permit number</th>
        <td class="border-bottom">${zpad(application.permitNumber, 8)}</td>
      </tr>
      <tr>
        <th scope="row" class="border-bottom border-right">Forest</th>
        <td class="border-bottom">${application.christmasTreesForest.forestName}</td>
      </tr>
      <tr>
        <th scope="row" class="border-bottom border-right">Number of trees</th>
        <td class="border-bottom">${application.quantity}</td>
      </tr>
      <tr>
        <th scope="row" class="border-bottom border-right">Name</th>
        <td class="border-bottom">${application.firstName} ${application.lastName}</td>
      </tr>
      <tr>
        <th scope="row" class="border-bottom border-right">Payment</th>
        <td class="border-bottom">$${application.totalCost}</td>
      </tr>
      <tr>
        <th scope="row" class="border-right">Transaction date</th>
        <td>${moment.tz(application.createdAt, application.christmasTreesForest.timezone).format('MM/DD/YYYY')}</td>
      </tr>
    </table>

    <h2 class="border-bottom">Permit Printing Guidelines</h2>
    <ul>
      <li>Print your permit on plain white paper. 
      Your permit must be printed to be valid and cannot be stored on a mobile device.</li>
      <li>Printed permit must be placed and clearly visible on your vehicle's dashboard with the permit side facing up.</li>
      <li>Your permit is available for printing from <a href="${
  application.permitUrl
}">${application.permitUrl}</a> or in an attachment to this email.</li>
    </ul>
    <p>Return to the <a href="${vcapConstants.INTAKE_CLIENT_BASE_URL}/christmas-trees/forests/${
  application.christmasTreesForest.forestAbbr
}">${
  application.christmasTreesForest.forestName
} Christmas tree permit website</a> for more information about cutting down your tree.</p>

    <p><img src="cid:christmas-tree-permit-image" alt="Christmas tree permit 2018 for 
    ${application.christmasTreesForest.forestName}. Permit must be printed and filled 
    out with bold black ink on the date that you cut your tree. It is unlawful to reuse 
    or duplicate this permit for the purpose of removing more products than the permit 
    holder has purchased. Complete permit before transporting tree. Have permit holder 
    present at time of tree cutting."/></p>
    `
  };
};
