import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { Location } from '@angular/common';
import * as moment from 'moment-timezone';
import { FirewoodInfoService } from '../../_services/firewood-info.service';
import { NrmService } from '../../_services/nrm.service';
import { ApplicationFieldsService } from '../../../application-forms/_services/application-fields.service';
import { FirewoodApplicationService } from '../../_services/firewood-application.service';
import { UtilService } from '../../../_services/util.service';
import { WindowRef } from '../../../_services/native-window.service';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html'
})
export class OrderConfirmationComponent implements OnInit {
  forest: any;
  permit: any;
  apiErrors: any;
  jwtToken: string;
  showCancelAlert = false;
  nativeWindow: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private titleService: Title,
    public firewoodInfoService: FirewoodInfoService,
    public nrmService: NrmService,
    public firewoodApplicationService: FirewoodApplicationService,
    public util: UtilService,
    private winRef: WindowRef,
    private meta: Meta
  ) {
    this.nativeWindow = winRef.getNativeWindow();
    this.meta.addTag({
      name: 'description',
      content: `Firewood permit`
    });
  }

  /**
   * Get data from route resolver
   */
  ngOnInit() {
    this.winRef.getNativeWindow().location.hash = ''; // clear out the hash on reload

    let isCancel = false;
    this.route.queryParams.forEach((params: Params) => {
      if (params.cancel) {
        isCancel = true;
      }

      if (params.t) {
        this.jwtToken = params.t;
      }
    });

    this.route.data.subscribe(data => {
      if (data.forest) {
        this.forest = data.forest;
      }
      if (data.permit) {
        this.permit = data.permit;
        this.permit.forest = this.forest;
        // e-mail the permit to the purchaser
        this.firewoodApplicationService.emailPDF(data.permit).subscribe(email => {
          console.log('email sent');
        });
      }
    });
  }

  getFriendlyDate(date) {
    const friendlyDate = new Date(date);
    const month = friendlyDate.getMonth();
    const day = friendlyDate.getDay();
    const year = friendlyDate.getFullYear();

    return ' ' + month + '/' + day + '/' + year;
  }

  printPDF = () => {
    const permitHTML = this.generatePermitHTML(this.permit);
    const popupWin = this.nativeWindow.open('FirewoodPermit', '_blank', 'top=0,left=0,height=auto,width=auto');

    popupWin.document.open();

    popupWin.document.write(permitHTML);

    popupWin.document.close();

  }

  printLoadTag = () => {
    const loadTags = this.generateLoadTagsHTML(this.permit);
    const popupWin = this.nativeWindow.open('FirewoodLoadTags', '_blank', 'top=0,left=0,height=auto,width=auto');

    popupWin.document.open();

    popupWin.document.write(loadTags);

    popupWin.document.close();

  }

  printInstructions = () => {
    const instructions = this.generateInstructionsHTML(this.permit);
    const popupWin = this.nativeWindow.open('FirewoodLoadTags', '_blank', 'top=0,left=0,height=auto,width=auto');

    popupWin.document.open();

    popupWin.document.write(instructions);

    popupWin.document.close();

  }

  generatePermitHTML = (data) => {
    const permitTemplate = `
    <html>
      <head>
        <title></title>
        <link href="/assets/css/print-permit.css" rel="stylesheet" type="text/css">
      </head>
      <body onload="window.focus(); setTimeout(window.print(), 1000);  window.onmousemove=function(){ window.close()}">
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
              <span>Expires: &nbsp;&nbsp; ${this.getFriendlyDate(data.expirationDate)}</span>
            </div>
          </div>
          <div class="general-info">
            <div class="permit-row no-border-bottom">
              <div class="big-cell four-twelfths border-right">FS Region/BLM State:</div>
              <div class="big-cell four-twelfths border-right">FS National Forest/BLM District:</div>
              <div class="big-cell four-twelfths no-border-right">FS Ranger District/BLM Field Office:</div>
            </div>
            <div class="permit-row">
              <div class="header-cell five-twelfths no-border-top border-left border-right">Permittee's Name and Complete Address:</div>
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
              <div class="two-twelfths no-border-top border-left border-right">&nbsp;&nbsp;${this.getFriendlyDate(data.transactionDate)}</div>
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
              <div class="two-twelfths no-border-top border-left">&nbsp;&nbsp;${this.getFriendlyDate(data.transactionDate)}</div>
              <div class="two-twelfths no-border-top border-left border-right">&nbsp;&nbsp;${this.getFriendlyDate(data.expirationDate)}</div>
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
              <span>Expires: &nbsp;&nbsp; ${this.getFriendlyDate(data.expirationDate)}</span>
            </div>
          </div>
          <div class="permit-number-box">
            Permit No.: &nbsp;&nbsp; ${data.permitNumber}
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
  }

  generateInstructionsHTML = (data) => {
    const instructions = [{
      image: `/assets/img/site-wide/load-tags-instructions-1.png`,
      long: `Fill in the day and month that you're harvesting the wood \
      with a black marker. For example, if you harvested on the 4th of \
      July, you would fill in "7" for the month and "4" for the day.`,
      short: `Fill in the day and month`
    }, {
      image: `/assets/img/site-wide/load-tags-instructions-2.png`,
      long: `Cut tags apart.`,
      short: `Cut your tag`
    }, {
      image: `/assets/img/site-wide/load-tags-instructions-3.png`,
      long: `Fold your tag on the dotted line.`,
      short: `Fold your tag`
    }, {
      image: `/assets/img/site-wide/load-tags-instructions-4.png`,
      long: `Place each tag in it's own individual zip-top bag and close the bag.`,
      short: `Place in zip-top bag`
    }, {
      image: `/assets/img/site-wide/load-tags-instructions-5.png`,
      long: `Nail your tag(s) to a piece of wood in the back of your load so \
      that the section with the USDA logo is visible to cars behind you.`,
      short: `Nail your tag`
    }];

    // instructions page styles
    let styleHtml = `<style>`;
    styleHtml += `@media print{@page {size: landscape}}`;
    styleHtml += `.load-tags-instructions {
      position: absolute;
      right: 0px;
      bottom: 0px;
      height: 100%;
      max-height: 100%;
      width: 100%;
      max-width: 100%;
      overflow: hidden;
      display: flex;
      flex-direction: row;
    }
    .written-instructions {
      display: flex;
      flex-direction: column;
      position: absolute;
      left: 25px;
      top: 150px;
      height: 100%;
      width: calc(50% - 50px);
    }
    .written-instructions-title {
      font-weight: bold;
      margin-left: 10px;
      margin-bottom: 10px;
    }
    .written-instruction {
      display: flex;
      flex-direction: row;
      margin-top: 5px;
      margin-bottom: 5px;
    }
    .written-instruction-number {
      border: 1px solid black;
      border-radius: 100%;
      text-align: center;
      height: 25px;
      width: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .written-instruction-text {
      margin-left: 10px;
      width: calc(100% - 25px);
    }
    .pictograph-instructions {
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      width: 50%;
    }
    .pictograph-instructions-image-container {
      position: absolute;
      top: 50px;
      right: 0px;
      width: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    }
    .pictograph-instructions-image {
      height: 150px;
      margin: 10px;
    }`;

    styleHtml += `</style>`;

    // instructions page elements
    let elementsHtml = `
    <html>
      <head>
        <title></title>
      </head>
      <body onload="window.focus(); setTimeout(window.print(), 1000);  window.onmousemove=function(){ window.close()}">`;

    elementsHtml += `
    <div class="load-tags-instructions">`;

    // written instructions / left side
    elementsHtml += `<div class="written-instructions">
        <div class="written-instructions-title">
          Instructions for tagging your load
        </div>`;
    for (let x = 0; x < instructions.length; x++) {
      elementsHtml += `
          <div class="written-instruction">
            <div class="written-instruction-number">${x + 1}</div>
            <div class="written-instruction-text">${instructions[x].long}</div>
          </div>`;
    }
    elementsHtml += `
      </div>`;
    // end of written instructions / left side

    // pictograph instructions / right side
    elementsHtml += `
      <div class="pictograph-instructions">
      <div class="pictograph-instructions-image-container">`;
    for (let x = 0; x < instructions.length; x++) {
      elementsHtml += `
          <img class="pictograph-instructions-image" src="${instructions[x].image}"/>`;
    }
    elementsHtml += `
      </div>
      </div>`;
    // end of pictograph instructions / right side

    elementsHtml += `
    </div>`;
    // end of load tag instructions page

    elementsHtml += `
    </body>
    </html>`;

    const loadTagsTemplate = styleHtml + elementsHtml;
    return loadTagsTemplate;

  }

  generateLoadTagsHTML = (data) => {
    let styleHtml = `<style>`;
    styleHtml += `@media print{@page {size: portrait}}`;

    // position the four main load tag squares
    styleHtml += `
    .load-tags-section-one {
      position: absolute;
      top: 0px;
      left: 0px;
      width: calc(50% - 2px);
      height: calc(50% - 2px);
      border: 1px dotted black;
      transform: rotate(180deg);
    }
    .load-tags-section-two {
      position: absolute;
      top: 0px;
      right: 0px;
      width: calc(50% - 2px);
      height: calc(50% - 2px);
      transform: rotate(180deg);
      text-align: center;
    }
    .load-tags-section-three {
      text-align: center;
      position: absolute;
      bottom: 0px;
      left: 0px;
      width: calc(50% - 2px);
      height: calc(50% - 2px);
    }
    .load-tags-section-four {
      position: absolute;
      bottom: 0px;
      right: 0px;
      width: calc(50% - 2px);
      height: calc(50% - 2px);
    }`;

    // fold arrow
    styleHtml += `.fold-arrow {
      transform: translateX(-50%);
      left: 50%;
      top: 4px;
      font-size: 30px;
      height: 10px;
      width: 20px;
      color: lightgray;
      position: absolute;
    }`;

    styleHtml += `.folding-text {
      font-weight: bold;
      color: lightgray;
      transform: rotate(180deg);
      position: relative;
      top: 44px;
    }`;

    // punch hole
    styleHtml += `.punch-hole {
      position: absolute;
      top: 40px;
      left: 50%;
      transform: translateX(-50%);
      height: 40px;
      width: 40px;
      background: white;
      border: 1px dotted black;
      border-radius: 100%;
    }`;

    // month / day / info box
    styleHtml += `.load-tags-info-box {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
    }`;
    styleHtml += `.month-day-boxes {
      display: flex;
      flex-direction: row;
    }`;
    styleHtml += `.month-box {
      border: 1px black solid;
      height: 90px;
      width: 90px;
      margin-right: 5px;
    }`;
    styleHtml += `.month-box-caption {
      position: relative;
      height: 30px;
      max-width: 50px;
      top: -7px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 100;
      background: white;
      font-size: 12px;
      font-weight: bold;
    }`;
    styleHtml += `.day-box {
      border: 1px black solid;
      height: 90px;
      width: 90px;
      margin-left: 5px;
    }`;
    styleHtml += `.day-box-caption {
      max-width: 30px;
      position: relative;
      height: 30px;
      top: -7px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 100;
      background: white;
      font-size: 12px;
      font-weight: bold;
    }`;
    styleHtml += `.cord-count {
      background: black;
      color: white;
      font-weight: bold;
      font-size: 20px;
      text-align: center;
      margin-top: 10px;
    }`;
    styleHtml += `.permit-number-input {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 8px;
      border-bottom: 1px solid black;
    }`;
    styleHtml += `.tag-number-input {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 8px;
      border-bottom: 1px solid black;
    }`;
    styleHtml += `.expires-input {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 8px;
      border-bottom: 1px solid black;
    }`;
    styleHtml += `.permit-number-input-label {
      font-size: 12px;
      font-weight: bold;
    }`;
    styleHtml += `.tag-number-input-label {
      font-size: 12px;
      font-weight: bold;
    }`;
    styleHtml += `.expires-input-label {
      font-size: 12px;
      font-weight: bold;
    }`;

    // styles for the section one and four (logo)
    styleHtml += `
    .load-tags-logo-section {
      padding: 3px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      height: 60%;
      width: 60%;
      background: white;
      display: flex;
      flex-direction: column;
      text-align: center;
      align-items: center;
    }
    .load-tags-logo-image {
      max-width: 87%;
      margin-bottom: 10px;
    }
    .watermark-container {
      overflow: hidden;
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
    .wavy-text-container {
      overflow: hidden;
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }`;

    // generate style rules for watermark text
    const numOfWatermarkLines = 24;
    for (let x = 1; x <= numOfWatermarkLines; x++) {
      const watermarkline = `.watermark-text-${x} {
        color: lightgray;
        white-space: nowrap;
        font-family: Public Sans ExtraLight;
        position: relative;
        left: -${x * 50}px;
      }`;
      styleHtml += watermarkline;
    }

    // generate style rules for wavy text
    const numOfWavyLines = 15;
    for (let x = 1; x <= numOfWavyLines; x++) {
      const wavyline = `.wavy-text-${x} {
        max-width: 100%;
        white-space: nowrap;
        position: absolute;
        font-family: Public Sans Black;
        font-weight: bold;
        left: 0px;
        top: ${(x - 1) * (100 / 8)}%;
      }`;
      styleHtml += wavyline;
    }

    // generate a container element for each "2021"
    const numOfTwentyTwentyOnes = 30;
    for (let x = 1; x <= numOfTwentyTwentyOnes; x++) {
      styleHtml += `.twenty-twentyone-${x} {
        position: absolute;
        bottom: 0px;
        left: ${(x - 1) * 200}px;
        font-size: 28px;
      }`;
    }

    // generate arc text style rules for each character in "2021"
    const numOfCharacters = 16;
    let degrees = 0;
    // first arc
    for (let x = 1; x <= 4; x++) {
      const char = `.character-${x} {
        transform-origin: bottom center;
        height: 143px;
        width: 20px;
        text-align: center;
        position: absolute;
        left: 0;
        bottom: 50px;
        transform: rotate(${degrees}deg);
      }`;
      degrees += 6;
      styleHtml += char;
    }

    degrees += -6;
    // second arc
    for (let x = 5; x <= 8; x++) {
      const char = `.character-${x} {
        transform-origin: bottom center;
        height: 143px;
        width: 20px;
        text-align: center;
        position: absolute;
        left: 15px;
        bottom: 48px;
        transform: rotate(${degrees}deg);
      }`;
      degrees += 6;
      styleHtml += char;
    }
    degrees = 0;

    // third arc
    for (let x = 9; x <= 12; x++) {
      const char = `.character-${x} {
        transform-origin: bottom center;
        height: 143px;
        width: 20px;
        text-align: center;
        position: absolute;
        left: -12px;
        bottom: 173px;
        transform: rotate(${degrees}deg) scaleX(-1) scaleY(-1);
      }`;
      degrees += 6;
      styleHtml += char;
    }

    // fourth arc
    for (let x = 13; x <= 16; x++) {
      const char = `.character-${x} {
        transform-origin: bottom center;
        height: 143px;
        width: 20px;
        text-align: center;
        position: absolute;
        left: -12px;
        bottom: 173px;
        transform: rotate(${degrees}deg) scaleX(-1) scaleY(-1);
      }`;
      degrees += 6;
      styleHtml += char;
    }

    styleHtml += `</style>`;

    let elementsHtml = `
    <html>
      <head>
        <title></title>
      </head>
      <body onload="window.focus(); setTimeout(window.print(), 1000);  window.onmousemove=function(){ window.close()}">`;

    // load tags page
    elementsHtml += `
        <div class="load-tags-section-one">`;

    // watermark lines container
    elementsHtml += `
          <div class="watermark-container">`;

    // watermark lines
    for (let x = 1; x <= numOfWatermarkLines; x++) {
      elementsHtml += `
            <div class="watermark-text-${x}">`;

      // show forest name multiple times per line, separated y a bullet
      for (let y = 1; y <= 20; y++) {
        elementsHtml += `
              ${data.forest.forestName} &bullet;&nbsp;`;
      }
      elementsHtml += `
            </div>`;
    }
    elementsHtml += `
          </div>`;
    // end of watermark lines container

    // create wavy-lines container
    elementsHtml += `<div class="wavy-text-container">`;

    // generate wavy lines
    for (let x = 1; x <= numOfWavyLines; x++) {
      elementsHtml += `
            <div class="wavy-text-${x}">`;

      // generate multiple "2021"s per wavy line
      for (let y = 1; y <= numOfTwentyTwentyOnes; y++) {
        elementsHtml += `
              <div class="twenty-twentyone-${y}">`;

        // individual characters in "2021" block
        elementsHtml += `<span class="character-1">2</span>`;
        elementsHtml += `<span class="character-2">0</span>`;
        elementsHtml += `<span class="character-3">2</span>`;
        elementsHtml += `<span class="character-4">1</span>`;

        elementsHtml += `<span class="character-5">2</span>`;
        elementsHtml += `<span class="character-6">0</span>`;
        elementsHtml += `<span class="character-7">2</span>`;
        elementsHtml += `<span class="character-8">1</span>`;

        elementsHtml += `<span class="character-9">2</span>`;
        elementsHtml += `<span class="character-10">0</span>`;
        elementsHtml += `<span class="character-11">2</span>`;
        elementsHtml += `<span class="character-12">1</span>`;

        elementsHtml += `<span class="character-13">2</span>`;
        elementsHtml += `<span class="character-14">0</span>`;
        elementsHtml += `<span class="character-15">2</span>`;
        elementsHtml += `<span class="character-16">1</span>`;
        // end of characters

        elementsHtml += `
            </div>`;
        // end of "2021" block
      }

      elementsHtml += `
          </div>`;
      // end of wavy line

    }
    elementsHtml += `
        </div>`;
    // end of wavy line container

    // punch hole element
    elementsHtml += `
        <div class="punch-hole"></div>`;

    elementsHtml += `
        <div class="load-tags-logo-section">
          <img class="load-tags-logo-image" src="/assets/img/site-wide/load-tags-usda-logo.png"/>
          <div class="load-tags-sub-logo-text">
            <div class="load-tags-forest-name">${data.forest.forestName}</div>
            <div class="firewood-load-tag-text">Firewood Load Tag</div>
          </div>
        </div>
          </div>

          <div class="load-tags-section-two">
          <div class="fold-arrow">&#8593;</div>
          <div class="folding-text">Fold and display this section outward</div>
          <div class="load-tags-info-box">
            <div class="month-day-boxes">
              <div class="month-box">
                <div class="month-box-caption">MONTH</div>
              </div>
              <div class="day-box">
                <div class="day-box-caption">DAY</div>
              </div>
            </div>
            <div class="cord-count">
              1/${data.quantity} CORD
            </div>
            <div class="permit-number-input">
              <span class="permit-number-input-label">Permit number:&nbsp;</span>
              <span class="permit-number-input-value">${data.permitNumber}</span>
            </div>
            <div class="tag-number-input">
              <span class="tag-number-input-label">Tag number:&nbsp;</span>
              <span class="tag-number-input-value">${data.tagNumber}</span>
            </div>
            <div class="expires-input">
              <span class="expires-input-label">Expires:&nbsp;</span>
              <span class="expires-input-value">${this.getFriendlyDate(data.expirationDate)}</span>
            </div>
          </div>
          </div>

          <div class="load-tags-section-three">
            <div class="fold-arrow">&#8593;</div>
            <div class="folding-text">Fold and display this section outward</div>
            <div class="load-tags-info-box">
              <div class="month-day-boxes">
                <div class="month-box">
                  <div class="month-box-caption">MONTH</div>
                </div>
                <div class="day-box">
                  <div class="day-box-caption">DAY</div>
                </div>
              </div>
              <div class="cord-count">
                1/${data.quantity} CORD
              </div>
              <div class="permit-number-input">
                <span class="permit-number-input-label">Permit number:&nbsp;</span>
                <span class="permit-number-input-value">${data.permitNumber}</span>
              </div>
              <div class="tag-number-input">
                <span class="tag-number-input-label">Tag number:&nbsp;</span>
                <span class="tag-number-input-value">${data.tagNumber}</span>
              </div>
              <div class="expires-input">
                <span class="expires-input-label">Expires:&nbsp;</span>
                <span class="expires-input-value">${this.getFriendlyDate(data.expirationDate)}</span>
              </div>
            </div>
          </div>

          <div class="load-tags-section-four">
            <div class="watermark-container">
            `;
    // generate watermark lines
    for (let x = 1; x <= numOfWatermarkLines; x++) {
      elementsHtml += `
              <div class="watermark-text-${x}">`;
      for (let y = 1; y <= 20; y++) {
        elementsHtml += `${data.forest.forestName} &bullet;&nbsp;`;
      }
      elementsHtml += `</div>`;
    }
    elementsHtml += `</div>`;

    elementsHtml += `<div class="wavy-text-container">`;
    // generate wavy lines
    for (let x = 1; x <= numOfWavyLines; x++) {
      elementsHtml += `
              <div class="wavy-text-${x}">`;
      for (let y = 1; y <= numOfTwentyTwentyOnes; y++) {
        // 2021
        elementsHtml += `<div class="twenty-twentyone-${y}">`;
        // individual characters in "2021" block
        elementsHtml += `<span class="character-1">2</span>`;
        elementsHtml += `<span class="character-2">0</span>`;
        elementsHtml += `<span class="character-3">2</span>`;
        elementsHtml += `<span class="character-4">1</span>`;

        elementsHtml += `<span class="character-5">2</span>`;
        elementsHtml += `<span class="character-6">0</span>`;
        elementsHtml += `<span class="character-7">2</span>`;
        elementsHtml += `<span class="character-8">1</span>`;

        elementsHtml += `<span class="character-9">2</span>`;
        elementsHtml += `<span class="character-10">0</span>`;
        elementsHtml += `<span class="character-11">2</span>`;
        elementsHtml += `<span class="character-12">1</span>`;

        elementsHtml += `<span class="character-13">2</span>`;
        elementsHtml += `<span class="character-14">0</span>`;
        elementsHtml += `<span class="character-15">2</span>`;
        elementsHtml += `<span class="character-16">1</span>`;
        elementsHtml += `</div>`;
      }
      elementsHtml += `</div>`;
    }
    elementsHtml += `</div>`;

    // punch hole element
    elementsHtml += `<div class="punch-hole"></div>`;

    elementsHtml += `
            <div class="load-tags-logo-section">
              <img class="load-tags-logo-image" src="/assets/img/site-wide/load-tags-usda-logo.png"/>
              <div class="load-tags-sub-logo-text">
                <div class="load-tags-forest-name">${data.forest.forestName}</div>
                <div class="firewood-load-tag-text">Firewood Load Tag</div>
              </div>
            </div>
          </div>

      </body>
    </html>
    `;
    const loadTagsTemplate = styleHtml + elementsHtml;
    return loadTagsTemplate;
  }

}
