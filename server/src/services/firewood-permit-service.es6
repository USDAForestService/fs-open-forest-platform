const puppeteer = require('puppeteer');
const moment = require('moment-timezone');
const uuid = require('uuid/v4');
const zpad = require('zpad');

const email = require('../email/email-util.es6');
const forestDb = require('../models/forests.es6');
const vcapConstants = require('../vcap-constants.es6');
const paygov = require('./paygov');

const firewoodPermitService = {};

/**
 * @function translatePermitFromClientToDatabase - Private function to translate request data to the database json object
 * @param {Object} input - christmas trees permit object from database
 * @return {Object} - formatted permit object
 */
firewoodPermitService.translatePermitFromClientToDatabase = (permit, forest) => ({
  // processed: false,
  permitId: uuid(),
  firstName: permit.firstName,
  lastName: permit.lastName,
  emailAddress: permit.emailAddress,
  quantity: permit.quantity,
  // TODO update to reflect real cost
  totalCost: parseInt(permit.quantity, 10) * 1,
  forestId: forest.id,
  orgStructureCode: forest.orgStructureCode,
  permitExpireDate: forest.endDate
});

/**
 * @function permitResult - Private function to return formatted permit result
 * @param {Object} permit - permit object from database
 * @return {Object} - formatted permit object
 */
firewoodPermitService.permitResult = permit => ({
  // processed: permit.processed,
  permitId: permit.permitId,
  orgStructureCode: permit.orgStructureCode,
  firstName: permit.firstName,
  lastName: permit.lastName,
  emailAddress: permit.emailAddress,
  quantity: permit.quantity,
  totalCost: permit.totalCost,
  status: permit.status,
  transactionDate: permit.updatedAt,
  paygovTrackingId: permit.paygovTrackingId,
  expirationDate: permit.permitExpireDate,
  permitNumber: zpad(permit.permitNumber, 9),
  forest: {
    forestName: permit.christmasTreesForest ? permit.christmasTreesForest.forestName : null,
    forestAbbr: permit.christmasTreesForest ? permit.christmasTreesForest.forestAbbr : null,
    forestNameShort: permit.christmasTreesForest ? permit.christmasTreesForest.forestNameShort : null
  }
});

firewoodPermitService.createPermitTransaction = async (application, forest) => {
  const transformed = firewoodPermitService.translatePermitFromClientToDatabase(application, forest);
  const permit = await forestDb.firewoodPermits.create(transformed);

  let paygovToken;

  try {
    paygovToken = await paygov.startCollection(forest, permit);
  } catch (paygovError) {
    await permit.update({ status: 'Error', paygovError: paygovError.toString() });
    throw new Error('Paygov Error');
  }

  const savedPermit = await permit.update({ paygovToken });

  const createPermitResponse = {
    token: paygovToken,
    permitId: savedPermit.permitId,
    payGovUrl: vcapConstants.PAY_GOV_CLIENT_URL,
    tcsAppID: vcapConstants.PAY_GOV_APP_ID
  };

  return createPermitResponse;
};

/**
 * @function completePermitTransaction - method to take an update request to complete the permit
 * and send complete transaction request to pay.gov and generate the permit email
 * @param {Object} permit - object model of an existing permit to be completed
 * @param {Object} req - http request
 * @param {Object} res - http response
 * @return {Promise} - promise that the email has been sent and response too
 */
firewoodPermitService.completePermitTransaction = async (permit) => {
  let paygovTrackingId;
  try {
    paygovTrackingId = await paygov.completeCollection(permit.paygovToken);
  } catch (paygovError) {
    await permit.update({ status: 'Error', paygovError: paygovError.toString() });
    throw new Error('Paygov Error');
  }
  const updatedPermit = await permit.update({ paygovTrackingId, status: 'Completed', purchaseDate: new Date() });
  firewoodPermitService.generateRulesAndEmail(updatedPermit);
  return firewoodPermitService.permitResult(updatedPermit);
};

firewoodPermitService.emailPDF = async (data) => {
  // create a headless browser
  const browser = await puppeteer.launch({ headless: true });

  // create new page in browser
  const page = await browser.newPage();

  // generate the HTML and set it as the page content
  await page.setContent(firewoodPermitService.generatePermitHTML(data));

  await page.pdf({ printBackground: true, path: 'permit.pdf' });

  // todo: pdf file on the server needs to be deleted after this
  const emailData = data;
  emailData.html = firewoodPermitService.generatePermitHTML(data);
  emailData.attachments = [{
    filename: 'permit.pdf',
    path: 'permit.pdf',
    contentType: 'application/pdf'
  }];

  // end the headless browser session
  await browser.close();

  const sentData = await email.sendPermit(emailData);

  return sentData;
};

firewoodPermitService.getFriendlyDate = (date) => {
  const friendlyDate = new Date(date);
  const month = friendlyDate.getMonth();
  const day = friendlyDate.getDay();
  const year = friendlyDate.getFullYear();

  return `${month}/${day}/${year}`;
};

firewoodPermitService.generatePermitHTML = (data) => {
  const permitTemplate = `
  <style>
  @media print {
    -webkit-print-color-adjust: exact;
    .first-page {
      background: white;
      display: flex;
      flex-direction: column;
    }
    .permit-header {
      font-size: 12px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    .left-section {
      display: flex;
      flex-direction: column;
    }
    .center-section {
      align-items: center;
      display: flex;
      flex-direction: column;
    }
    .right-section {
      display: flex;
      flex-direction: column;
    }
    .bold-text {
      font-weight: bold;
    }
    .italic-text {
      font-style: italic;
    }
    .general-info {
      margin-top: 25px;
      display: flex;
      flex-direction: column;
    }
    .permit-row {
      font-size: 12px;
      display: flex;
      flex-direction: row;
      border: 1px solid black;
    }
    .big-cell {
      padding-bottom: 12px;
      padding-left: 5px;
    }
    .header-cell {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      background: lightgray;
      font-weight: bold;
      text-align:center;
    }
    /* grid width rules */
    .one-twelfth {
      display: flex;
      width: calc(100% * (1/12));
      max-width: calc(100% * (1/12));
    }
    .two-twelfths {
      display: flex;
      width: calc(100% * (2/12));
      max-width: calc(100% * (2/12));
    }
    .three-twelfths {
      display: flex;
      width: calc(100% * (3/12));
      max-width: calc(100% * (3/12));
    }
    .four-twelfths {
      display: flex;
      width: calc(100% * (4/12));
      max-width: calc(100% * (4/12));
    }
    .five-twelfths {
      display: flex;
      width: calc(100% * (5/12));
      max-width: calc(100% * (5/12));
    }
    .six-twelfths {
      display: flex;
      width: calc(100% * (6/12));
      max-width: calc(100% * (6/12));
    }
    .seven-twelfths {
      display: flex;
      width: calc(100% * (7/12));
      max-width: calc(100% * (7/12));
    }
    .eight-twelfths {
      display: flex;
      width: calc(100% * (8/12));
      max-width: calc(100% * (8/12));
    }
    .nine-twelfths {
      display: flex;
      width: calc(100% * (9/12));
      max-width: calc(100% * (9/12));
    }
    .ten-twelfths {
      display: flex;
      width: calc(100% * (10/12));
      max-width: calc(100% * (10/12));
    }
    .eleven-twelfths {
      display: flex;
      width: calc(100% * (11/12));
      max-width: calc(100% * (11/12));
    }
    .twelve-twelfths {
      display: flex;
      width: 100%;
      max-width: 100%;
    }
    /* border rules */
    .no-border-right {
      border-right: none;
    }
    .no-border-left {
      border-left: none;
    }
    .no-border-top {
      border-top: none;
    }
    .no-border-bottom {
      border-bottom: 1px solid transparent;
    }
    .border-bottom {
      border-bottom: 1px solid black;
    }
    .border-right {
      border-right: 1px solid black;
    }
    .border-left {
      border-left: 1px solid black;
    }
    .border-top {
      border-top: 1px solid black;
    }
    /* misc rules */
    .remarks {
      border: 1px solid black;
      border-top: none;
      height: 60px;
    }
    .remarks-label {
      font-size: 12px;
      background: lightgray;
      font-weight: bold;
      margin-left: 5px
    }
    .product-designation {
      border: 1px solid black;
    }
    div {
      max-width: 100%;
      white-space: no-wrap;
      overflow: hidden;
    }
    .margin-indent {
      margin-left: 5px;
    }
    .for-blm-lands {
      width: 100%;
      border: 1px solid;
    }
    .signature-lines {
      margin-top: 25px;
      width: 100%;
      display: flex;
    }
    .signature-line-40 {
      font-size: 12px;
      white-space: nowrap;
      width: 40%;
      margin-left: 20px;
      margin-right: 20px;
      border-top: 1px solid black;
      padding-top: 2px;
    }
    .signature-line-10 {
      font-size: 12px;
      white-space: nowrap;
      width: 10%;
      margin-left: 20px;
      margin-right: 20px;
      border-top: 1px solid black;
      padding-top: 2px;
    }
    .privacy-act {
      margin-top: 20px;
    }
    .second-page {
      page-break-before: always;
    }
    .permit-number-box  {
      width: 40%;
      padding: 2px;
      font-weight: 10px;
      margin-top: 25px;
      font-weight: bold;
      border: 1px solid black;
      border-bottom: 1px solid transparent;
    }
    .general-conditions-list {
      display: flex;
      flex-direction: column;
      margin-bottom: 5px;
    }
    .general-condition {
      display: flex;
      white-space: normal;
    }
    .list-number {
      min-width: 20px;
      margin-right: 10px;
    }
    .condition-description {
      margin-left: 5px;
      white-space: normal;
    }
    .other-conditions-title {
      margin-top: 15px;
    }
    .other-conditions-box {
      width: calc(100% - 1px);
      height: calc(100% - 550px);
      border-right: 1px solid black;
    }
  }
  </style>
  <html>
    <head>
      <title></title>
    </head>
    <body>
    <div class="firewood-permit">
      <div class="first-page">
        <div class="permit-header">
          <div class="permit-header-section left-section">
            <span>FS-2400-1</span>
            <span>BLM-5450-24</span>
            <span>(05/2005)</span>
          </div>
          <div class="permit-header-section center-section">
            <span class="bold-text">
              FOREST PRODUCTS REMOVAL PERMIT and CASH RECEIPT
            </span>
            <span class="italic-text">
              (Auth: 16 USC 472a, 551; 30 USC 601, 602; 43 USC 1201; 16 CFR 223; & 43 CFR 5420)
            </span>
            <span class="bold-text">
              U.S. DEPARTMENT OF AGRICULTURE – FOREST SERVICE
            </span>
            <span class="bold-text">
              U.S. DEPARTMENT OF THE INTERIOR – BUREAU OF LAND MANAGEMENT
            </span>
          </div>
          <div class="permit-header-section right-section">
            <span>OMB No.: 0596-0085</span>
            <span>Expires: &nbsp;&nbsp; ${firewoodPermitService.getFriendlyDate(data.expirationDate)}</span>
          </div>
        </div>
        <div class="general-info">
          <div class="permit-row no-border-bottom">
            <div class="big-cell four-twelfths border-right">FS Region/BLM State:</div>
            <div class="big-cell four-twelfths border-right">FS National Forest/BLM District:</div>
            <div class="big-cell four-twelfths no-border-right">FS Ranger District/BLM Field Office:</div>
          </div>
          <div class="permit-row">
            <div class="header-cell five-twelfths no-border-top border-left border-right">
              Permittee's Name and Complete Address:
            </div>
            <div class="header-cell two-twelfths no-border-top border-left">Permit No.</div>
            <div class="header-cell two-twelfths no-border-top border-left border-right">Preparation Date</div>
            <div class="header-cell three-twelfths no-border-top no-border-left border-right">Payment Method</div>
          </div>
          <div class="permit-row no-border-bottom">
            <div class="five-twelfths no-border-top border-left border-right">
              <span class="margin-indent border-right three-twelfths italic-text">Name:</span>
              <span class="nine-twelfths margin-indent">${data.firstName} ${data.lastName}</span>
            </div>
            <div class="two-twelfths no-border-top border-left">&nbsp;&nbsp;${data.permitNumber}</div>
            <div class="two-twelfths no-border-top border-left border-right">
              &nbsp;&nbsp;${firewoodPermitService.getFriendlyDate(data.transactionDate)}
            </div>
            <div class="three-twelfths no-border-top no-border-left border-right"></div>
          </div>
          <div class="permit-row no-border-bottom">
            <div class="five-twelfths no-border-top border-left border-right">
              <span class="margin-indent border-right three-twelfths italic-text">Address:</span>
              <span class="nine-twelfths margin-indent"></span>
            </div>
            <div class="header-cell two-twelfths no-border-top border-left">Effective Date</div>
            <div class="header-cell two-twelfths no-border-top border-left border-right">Termination Date</div>
            <div class="header-cell three-twelfths no-border-top no-border-left border-right">Load Ticket Numbers</div>
          </div>
          <div class="permit-row no-border-bottom">
            <div class="five-twelfths no-border-top border-left border-right">
              <span class="margin-indent border-right three-twelfths italic-text"></span>
              <span class="nine-twelfths margin-indent"></span>
            </div>
            <div class="two-twelfths no-border-top border-left">
              &nbsp;&nbsp;${firewoodPermitService.getFriendlyDate(data.transactionDate)}
            </div>
            <div class="two-twelfths no-border-top border-left border-right">
              &nbsp;&nbsp;${firewoodPermitService.getFriendlyDate(data.expirationDate)}
            </div>
            <div class="three-twelfths no-border-top no-border-left border-right">
              <span class="six-twelfths margin-indent">From:</span>
              <span class="six-twelfths">Thru:</span>
            </div>
          </div>
          <div class="permit-row no-border-bottom">
            <div class="five-twelfths no-border-top border-left border-right">
              <span class="margin-indent border-right three-twelfths italic-text">City/State:</span>
              <span class="nine-twelfths margin-indent"></span>
            </div>
            <div class="header-cell four-twelfths no-border-top">Product Plan</div>
            <div class="three-twelfths no-border-top border-left border-right">
              <span class="margin-indent six-twelfths">From:</span>
              <span class="six-twelfths">Thru:</span>
            </div>
          </div>
          <div class="permit-row no-border-bottom">
            <div class="five-twelfths no-border-top border-left border-right">
              <span class="margin-indent border-right three-twelfths italic-text">Zip Code:</span>
              <span class="nine-twelfths margin-indent"></span>
            </div>
            <div class="two-twelfths no-border-top">
              <span class="margin-indent">Number:</span>
            </div>
            <div class="five-twelfths no-border-top border-left border-right">
              <span class="margin-indent">Name:</span>
            </div>
          </div>
          <div class="permit-row no-border-bottom">
            <div class="header-cell border-left three-twelfths">Permittee Identification</div>
            <div class="header-cell border-left no-border-right two-twelfths">Type</div>
            <div class="seven-twelfths no-border-top border-left border-right">
              <span class="header-cell border-right six-twelfths">Public Land Type</span>
              <span class="header-cell border-left six-twelfths">County</span>
            </div>
          </div>
          <div class="permit-row no-border-bottom">
            <div class="border-left three-twelfths"></div>
            <div class="border-left no-border-right two-twelfths"></div>
            <div class="seven-twelfths no-border-top border-left border-right">
              <span class="border-right six-twelfths"></span>
              <span class="border-left six-twelfths">&nbsp;</span>
            </div>
          </div>
          <div class="permit-row no-border-bottom">
            <div class="header-cell border-left five-twelfths">Vehicle(s) Information</div>
            <div class="header-cell border-left two-twelfths">Associated Charges</div>
            <div class="header-cell border-left border-right five-twelfths">Permit Area Description:</div>
          </div>
          <div class="permit-row no-border-bottom">
            <div class="five-twelfths">
              <div class="three-twelfths border-right">
                <span class="margin-indent">Year:</span>
              </div>
              <div class="three-twelfths border-right"></div>
              <div class="three-twelfths border-right">
                <span class="margin-indent">Year:</span>
              </div>
              <div class="three-twelfths border-right"></div>
            </div>
            <div class="border-right border-left header-cell one-twelfth">Fund</div>
            <div class="border-right header-cell one-twelfth">Amount</div>
            <div class="border-right five-twelfths"></div>
          </div>
          <div class="permit-row no-border-bottom">
            <div class="five-twelfths">
              <div class="three-twelfths border-right">
                <span class="margin-indent">Make:</span>
              </div>
              <div class="three-twelfths border-right"></div>
              <div class="three-twelfths border-right">
                <span class="margin-indent">Make:</span>
              </div>
              <div class="three-twelfths border-right"></div>
            </div>
            <div class="border-right one-twelfth"></div>
            <div class="border-right one-twelfth"></div>
            <div class="border-right five-twelfths"></div>
          </div>
          <div class="permit-row no-border-bottom">
            <div class="five-twelfths">
              <div class="three-twelfths border-right">
                <span class="margin-indent">Model:</span>
              </div>
              <div class="three-twelfths border-right"></div>
              <div class="three-twelfths border-right">
                <span class="margin-indent">Model:</span>
              </div>
              <div class="three-twelfths border-right"></div>
            </div>
            <div class="border-right one-twelfth"></div>
            <div class="border-right one-twelfth"></div>
            <div class="border-right five-twelfths"></div>
          </div>
          <div class="permit-row no-border-bottom">
            <div class="five-twelfths">
              <div class="three-twelfths border-right">
                <span class="margin-indent">Color:</span>
              </div>
              <div class="three-twelfths border-right"></div>
              <div class="three-twelfths border-right">
                <span class="margin-indent">Color:</span>
              </div>
              <div class="three-twelfths border-right"></div>
            </div>
            <div class="border-right one-twelfth"></div>
            <div class="border-right one-twelfth"></div>
            <div class="border-right five-twelfths"></div>
          </div>
          <div class="permit-row no-border-bottom">
            <div class="five-twelfths">
              <div class="three-twelfths border-right">
                <span class="margin-indent">License:</span>
              </div>
              <div class="three-twelfths border-right"></div>
              <div class="three-twelfths border-right">
                <span class="margin-indent">License:</span>
              </div>
              <div class="three-twelfths border-right"></div>
            </div>
            <div class="border-right one-twelfth"></div>
            <div class="border-right one-twelfth"></div>
            <div class="border-right five-twelfths"></div>
          </div>
          <div class="permit-row">
            <div class="five-twelfths">
              <div class="three-twelfths border-right">
                <span class="margin-indent">State:</span>
              </div>
              <div class="three-twelfths border-right"></div>
              <div class="three-twelfths border-right">
                <span class="margin-indent">State:</span>
              </div>
              <div class="three-twelfths border-right"></div>
            </div>
            <div class="border-right one-twelfth"></div>
            <div class="border-right one-twelfth"></div>
            <div class="border-right five-twelfths"></div>
          </div>
          <div class="remarks">
            <span class="remarks-label">Remarks:</span>
          </div>
          <div class="product-designation header-cell">
            PRODUCT DESIGNATION
          </div>
          <div class="permit-row">
            <div class="border-right border-left two-twelfths header-cell">Product</div>
            <div class="border-right border-left two-twelfths header-cell">Species</div>
            <div class="border-right border-left one-twelfth header-cell">Unit of Measure (UOM)</div>
            <div class="border-right border-left one-twelfth header-cell">Quantity Solid</div>
            <div class="border-right border-left one-twelfth header-cell">Rate per Product UOM</div>
            <div class="border-right border-left one-twelfth header-cell">Assoc. Charges $ per UOM</div>
            <div class="border-right border-left two-twelfths header-cell">Total cost of Products ($)</div>
            <div class="border-right border-left two-twelfths header-cell">Cost of Assoc. Charges ($)</div>
          </div>
          <div class="permit-row">
            <div class="border-right border-left two-twelfths">&nbsp;</div>
            <div class="border-right border-left two-twelfths"></div>
            <div class="border-right border-left one-twelfth"></div>
            <div class="border-right border-left one-twelfth"></div>
            <div class="border-right border-left one-twelfth"></div>
            <div class="border-right border-left one-twelfth"></div>
            <div class="border-right border-left two-twelfths"></div>
            <div class="border-right border-left two-twelfths"></div>
          </div>
          <div class="permit-row">
            <div class="border-right border-left two-twelfths">&nbsp;</div>
            <div class="border-right border-left two-twelfths"></div>
            <div class="border-right border-left one-twelfth"></div>
            <div class="border-right border-left one-twelfth"></div>
            <div class="border-right border-left one-twelfth"></div>
            <div class="border-right border-left one-twelfth"></div>
            <div class="border-right border-left two-twelfths"></div>
            <div class="border-right border-left two-twelfths"></div>
          </div>
          <div class="permit-row">
            <div class="border-right border-left two-twelfths">&nbsp;</div>
            <div class="border-right border-left two-twelfths"></div>
            <div class="border-right border-left one-twelfth"></div>
            <div class="border-right border-left one-twelfth"></div>
            <div class="border-right border-left one-twelfth"></div>
            <div class="border-right border-left one-twelfth"></div>
            <div class="border-right border-left two-twelfths"></div>
            <div class="border-right border-left two-twelfths"></div>
          </div>
          <div class="permit-row">
            <div class="border-right border-left two-twelfths">&nbsp;</div>
            <div class="border-right border-left two-twelfths"></div>
            <div class="border-right border-left one-twelfth"></div>
            <div class="border-right border-left one-twelfth"></div>
            <div class="border-right border-left one-twelfth"></div>
            <div class="border-right border-left one-twelfth"></div>
            <div class="border-right border-left two-twelfths"></div>
            <div class="border-right border-left two-twelfths"></div>
          </div>
          <div class="permit-row">
            <div class="border-right border-left two-twelfths">&nbsp;</div>
            <div class="border-right border-left two-twelfths"></div>
            <div class="border-right border-left one-twelfth"></div>
            <div class="border-right border-left one-twelfth"></div>
            <div class="border-right border-left one-twelfth"></div>
            <div class="border-right border-left one-twelfth"></div>
            <div class="border-right border-left two-twelfths"></div>
            <div class="border-right border-left two-twelfths"></div>
          </div>
          <div class="permit-row no-border-top no-border-left no-border-bottom">
            <div class="no-border-right no-border-left six-twelfths"></div>
            <div class="border-right border-left border-bottom two-twelfths header-cell">Total Permit Costs:</div>
            <div class="border-right border-left border-bottom two-twelfths"></div>
            <div class="border-right border-left border-bottom two-twelfths"></div>
          </div>
          <div class="permit-row no-border-top no-border-left no-border-bottom">
            <div class="no-border-right no-border-left six-twelfths"></div>
            <div class="border-right border-left four-twelfths header-cell">Total Purchase Price:</div>
            <div class="border-right border-left two-twelfths">&nbsp;&nbsp;${data.totalCost}</div>
          </div>
          <div class="product-designation header-cell">
            PRODUCT QUANTITY REMOVAL RECORD
          </div>
          <div class="permit-row">
            <div class="border-right border-left one-twelfth header-cell">Date</div>
            <div class="border-right border-left one-twelfth header-cell">Time</div>
            <div class="border-right border-left two-twelfths header-cell">Quantity Removed</div>
            <div class="border-right border-left one-twelfth header-cell">Date</div>
            <div class="border-right border-left one-twelfth header-cell">Time</div>
            <div class="border-right border-left two-twelfths header-cell">Quantity Removed</div>
            <div class="border-right border-left one-twelfth header-cell">Date</div>
            <div class="border-right border-left one-twelfth header-cell">Time</div>
            <div class="border-right border-left two-twelfths header-cell">Quantity Removed</div>
            <div class="border-right border-left one-twelfth header-cell">Date</div>
            <div class="border-right border-left one-twelfth header-cell">Time</div>
            <div class="border-right border-left two-twelfths header-cell">Quantity Removed</div>
          </div>
          <div class="permit-row">
            <div class="border-right border-left one-twelfth"></div>
            <div class="border-right border-left one-twelfth"></div>
            <div class="border-right border-left two-twelfths">&nbsp;</div>
            <div class="border-right border-left one-twelfth"></div>
            <div class="border-right border-left one-twelfth"></div>
            <div class="border-right border-left two-twelfths">&nbsp;</div>
            <div class="border-right border-left one-twelfth"></div>
            <div class="border-right border-left one-twelfth"></div>
            <div class="border-right border-left two-twelfths">&nbsp;</div>
            <div class="border-right border-left one-twelfth"></div>
            <div class="border-right border-left one-twelfth"></div>
            <div class="border-right border-left two-twelfths">&nbsp;</div>
          </div>
          <div class="permit-row">
            <div class="border-right border-left one-twelfth"></div>
            <div class="border-right border-left one-twelfth"></div>
            <div class="border-right border-left two-twelfths">&nbsp;</div>
            <div class="border-right border-left one-twelfth"></div>
            <div class="border-right border-left one-twelfth"></div>
            <div class="border-right border-left two-twelfths">&nbsp;</div>
            <div class="border-right border-left one-twelfth"></div>
            <div class="border-right border-left one-twelfth"></div>
            <div class="border-right border-left two-twelfths">&nbsp;</div>
            <div class="border-right border-left one-twelfth"></div>
            <div class="border-right border-left one-twelfth"></div>
            <div class="border-right border-left two-twelfths">&nbsp;</div>
          </div>
          <div class="permit-row">
            <div class="border-right border-left one-twelfth"></div>
            <div class="border-right border-left one-twelfth"></div>
            <div class="border-right border-left two-twelfths">&nbsp;</div>
            <div class="border-right border-left one-twelfth"></div>
            <div class="border-right border-left one-twelfth"></div>
            <div class="border-right border-left two-twelfths">&nbsp;</div>
            <div class="border-right border-left one-twelfth"></div>
            <div class="border-right border-left one-twelfth"></div>
            <div class="border-right border-left two-twelfths">&nbsp;</div>
            <div class="border-right border-left one-twelfth"></div>
            <div class="border-right border-left one-twelfth"></div>
            <div class="border-right border-left two-twelfths">&nbsp;</div>
          </div>
          <div class="permit-row">
            <div class="border-right border-left one-twelfth"></div>
            <div class="border-right border-left one-twelfth"></div>
            <div class="border-right border-left two-twelfths">&nbsp;</div>
            <div class="border-right border-left one-twelfth"></div>
            <div class="border-right border-left one-twelfth"></div>
            <div class="border-right border-left two-twelfths">&nbsp;</div>
            <div class="border-right border-left one-twelfth"></div>
            <div class="border-right border-left one-twelfth"></div>
            <div class="border-right border-left two-twelfths">&nbsp;</div>
            <div class="border-right border-left one-twelfth"></div>
            <div class="border-right border-left one-twelfth"></div>
            <div class="border-right border-left two-twelfths">&nbsp;</div>
          </div>
          <div class="permit-row">
            <div class="border-right border-left one-twelfth"></div>
            <div class="border-right border-left one-twelfth"></div>
            <div class="border-right border-left two-twelfths">&nbsp;</div>
            <div class="border-right border-left one-twelfth"></div>
            <div class="border-right border-left one-twelfth"></div>
            <div class="border-right border-left two-twelfths">&nbsp;</div>
            <div class="border-right border-left one-twelfth"></div>
            <div class="border-right border-left one-twelfth"></div>
            <div class="border-right border-left two-twelfths">&nbsp;</div>
            <div class="border-right border-left one-twelfth"></div>
            <div class="border-right border-left one-twelfth"></div>
            <div class="border-right border-left two-twelfths">&nbsp;</div>
          </div>
          <div class="permit-row">
            <div class="border-right border-left twelve-twelfths">
              For BLM lands only, Permittee certifies that they are of\
              the age of majority in the state they reside in and, if\
              purchasing timber, are a United States citizen.
            </div>
          </div>
          <div class="product-designation header-cell">
            SIGNATURES
          </div>
          <div class="signature-lines">
            <div class="signature-line-40">PERMITTEE</div>
            <div class="signature-line-10">Date</div>
            <div class="signature-line-40">AUTHORIZED AGENCY/VENDOR</div>
            <div class="signature-line-10">Date</div>
          </div>
          <div class="privacy-act permit-row">
            <div class="border-left border-right twelve-twelfths">
              The Privacy Act of 1974 and the regulations in 43 CFR 2.48(d) \
              provide that you be furnished with the following information: \
              The Forest Service and Bureau of Land Management use this \
              information to maintain an inventory of forest product \
              information and to adjudicate your rights to forest products. \
              The information required by this form may be disclosed pursuant \
              to the regulations in 7 CFR 1.5 or 43 CFR 2.56. If you do not furnish all the \
              information required by this form, your application may be rejected.\n
              Under the Paperwork Reduction Act of 1995, an agency shall not \
              conduct or sponsor, and no persons are required to respond to, \
              a collection of information unless it displays a valid OMB control \
              number. The valid OMB control number for this information collection \
              is 0596-0085. Public reporting burden for this collection of information \
              is estimated to average 5 minutes per response, including the \
              time for reviewing instructions, searching existing data sources, \
              gathering and maintaining the data needed, and completing and \
              reviewing the collection of information.
            </div>
          </div>
        </div>
      </div>
      <div class="second-page">
        <div class="permit-header">
          <div class="permit-header-section left-section">
            <span>FS-2400-1</span>
            <span>BLM-5450-24</span>
            <span>(05/2005)</span>
          </div>
          <div class="permit-header-section center-section">
            <span class="bold-text">
              FOREST PRODUCTS REMOVAL PERMIT and CASH RECEIPT
            </span>
            <span class="bold-text">
              U.S. DEPARTMENT OF AGRICULTURE – FOREST SERVICE
            </span>
            <span class="bold-text">
              U.S. DEPARTMENT OF THE INTERIOR – BUREAU OF LAND MANAGEMENT
            </span>
          </div>
          <div class="permit-header-section right-section">
            <span>OMB No.: 0596-0085</span>
            <span>Expires: &nbsp;&nbsp; ${firewoodPermitService.getFriendlyDate(data.expirationDate)}</span>
          </div>
        </div>
        <div class="permit-number-box">
          Permit No.: &nbsp;&nbsp;${data.permitNumber}
        </div>
        <div class="product-designation header-cell">
          GENERAL CONDITIONS
        </div>
        <div class="permit-row">
          <div class="border-right border-left twelve-twelfths general-conditions-list">
            <div class="conditions-preface margin-indent">
              Subject to, and in strict compliance with, all the following conditions \
              (both General and Other) and those listed above, the Permittee \
              named herein is authorized to harvest and remove the forest products \
              described above.
            </div>
            <div class="general-condition">
              <div class="margin-indent list-number">1.&nbsp;</div>
              <div class="condition-description">
                This sale is final and payments are not subject to refund.
              </div>
            </div>
            <div class="general-condition">
              <div class="margin-indent list-number">2.&nbsp;</div>
              <div class="condition-description">
                Permit must be in the Permittee's possession while harvesting \
                and transporting products. Copies are not allowed.
              </div>
            </div>
            <div class="general-condition">
              <div class="margin-indent list-number">3.&nbsp;</div>
              <div class="condition-description">
                This permit is nontransferable.
              </div>
            </div>
            <div class="general-condition">
              <div class="margin-indent list-number">4.&nbsp;</div>
              <div class="condition-description">
                This permit and activities hereunder are subject to all \
                applicable Federal statutes and regulations and State and local \
                laws. In case of conflict, Federal statutes and regulations shall \
                take precedence. Where applicable, a Memorandum of Agreement \
                between the Forest Service and BLM governs administration and \
                enforcement of this permit (Sec. 330, P.L. 106-291).
              </div>
            </div>
            <div class="general-condition">
              <div class="margin-indent list-number">5.&nbsp;</div>
              <div class="condition-description">
                Motorized vehicles are not allowed off existing roads that \
                are open to the public, unless otherwise specified within this \
                permit. Permittee parking shall not block traffic or impede \
                fire or emergency vehicles.
              </div>
            </div>
            <div class="general-condition">
              <div class="margin-indent list-number">6.&nbsp;</div>
              <div class="condition-description">
                Permittee shall remove all trash and litter resulting from Permittee's activities.
              </div>
            </div>
            <div class="general-condition">
              <div class="margin-indent list-number">7.&nbsp;</div>
              <div class="condition-description">
                Concurrent with forest product removal activities, slash and \
                unused vegetative material resulting from Permittee's activities shall \
                be removed from roads and ditches and scattered in the surrounding landscape.
              </div>
            </div>
            <div class="general-condition">
              <div class="margin-indent list-number">8.&nbsp;</div>
              <div class="condition-description">
                Permittee shall comply with fire requirements and current restrictions \
                to prevent forest fires.
              </div>
            </div>
            <div class="general-condition">
              <div class="margin-indent list-number">9.&nbsp;</div>
              <div class="condition-description">
                Permittee shall pay for or repair all damage to natural features; \
                riparian areas; other vegetation; and roads, trails, fences, \
                ditches, telephone lines, or other improvements resulting from \
                Permittee's activities under this permit.
              </div>
            </div>
            <div class="general-condition">
              <div class="margin-indent list-number">10.&nbsp;</div>
              <div class="condition-description">
                The Forest Service and/or BLM reserve the right to unilaterally \
                revoke this permit for Permittee's noncompliance with its terms \
                and conditions or when revocation is in the public's interest.
              </div>
            </div>
            <div class="general-condition">
              <div class="margin-indent list-number">11.&nbsp;</div>
              <div class="condition-description">
                Regardless of whether forest products are removed, this permit \
                will terminate either at midnight of the termination date shown \
                above, or when the quantity listed above is reached, whichever comes first.
              </div>
            </div>
            <div class="general-condition">
              <div class="margin-indent list-number">12.&nbsp;</div>
              <div class="condition-description">
                None of the terms or conditions of this permit may be varied or modified, \
                except for unilateral modifications by the Forest Service and/or BLM.
              </div>
            </div>
            <div class="general-condition">
              <div class="margin-indent list-number">13.&nbsp;</div>
              <div class="condition-description">
                Permittee agrees to hold the Government harmless from any claim \
                for damage or loss of property, personal injury, or death.
              </div>
            </div>
            <div class="general-condition">
              <div class="margin-indent list-number">14.&nbsp;</div>
              <div class="condition-description">
                Collection of forest products is permitted only in the area(s) described \
                by this permit.
              </div>
            </div>
            <div class="general-condition">
              <div class="margin-indent list-number">15.&nbsp;</div>
              <div class="condition-description">
                Permittee shall complete the Product Quantity Removal Record in ink prior \
                to transporting products. When load tickets are issued, the \
                Permittee is required to complete load tickets when Permittee \
                moves between collection sites or leaves a permit area. Load \
                tickets must be securely attached to the load and clearly visible \
                from the rear of the vehicle.
              </div>
            </div>
          </div>
        </div>
        <div class="product-designation other-conditions-title header-cell">
          OTHER CONDITIONS
        </div>
        <div class="permit-row other-conditions-box"></div>
      </div>
    </div>
    </body>
  </html>
  `;
  return permitTemplate;
};

/**
 * @function permitExpireDate - Private function to check if permit expire date is in future
 * @param {date} permitExpireDate - expiration date
 * @return {boolean} - expiration date is is after current date
 */
firewoodPermitService.checkPermitValid = permitExpireDate => moment(permitExpireDate).isAfter(moment());

module.exports = firewoodPermitService;
