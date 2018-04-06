import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ChristmasTreesApplicationService } from '../../../trees/_services/christmas-trees-application.service';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { WindowRef } from '../../../_services/native-window.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-tree-permit-view',
  templateUrl: './tree-permit-view.component.html'
})
export class TreePermitViewComponent implements OnInit {
  forest: any;
  permit: any;
  image: any;
  error: any = null;
  nativeWindow: any;
  isPermitExpired = false;
  includeRules = false;
  jwtToken: string;

  constructor(
    private route: ActivatedRoute,
    private christmasTreesApplicationService: ChristmasTreesApplicationService,
    private titleService: Title,
    private sanitizer: DomSanitizer,
    private winRef: WindowRef,
    @Inject(DOCUMENT) private document: any
  ) {
    this.nativeWindow = winRef.getNativeWindow();
  }

  /**
   * Get data from route resolver
   */
  ngOnInit() {
    this.route.queryParams.forEach((params: Params) => {
      if (params.t) {
        this.jwtToken = params.t;
      }
    });
    this.route.data.subscribe(data => {
      if (data.permit && data.permit.error) {
        this.processError(data.permit.error, data.permit.error.permit);
      } else {
        if (data.permit.status === 'Initiated') {
          this.christmasTreesApplicationService.updatePermit(data.permit.permitId, 'Completed', this.jwtToken).subscribe(updated => {
            this.setPageData(updated);
          },
          error => {
            this.processError(error[0], error[0].permit);
          });
        } else {
          this.setPageData(data.permit);
        }
      }
    });
  }

  /**
   * Set error
   */
  processError(error, permit) {
    this.error = error;
    this.setPageData(permit);
  }

  /**
   * Set forest, permit, isPermitExpired, and page title
   */
  setPageData(permit) {
    if (permit && permit.forest) {
      this.forest = permit.forest;
      this.permit = permit;
      this.isPermitExpired = new Date(permit.expirationDate) < new Date();
      this.titleService.setTitle(
        `Permit order confirmation | ${permit.forest.forestName} | U.S. Forest Service Christmas Tree Permitting`
      );
    }
  }

  /**
   * Create popup containing printable permit
   */
  printPermit() {
    const popupWin = this.nativeWindow.open('', '_blank', 'top=0,left=0,height=auto,width=auto');

    const includeRules = this.includeRules;

    this.christmasTreesApplicationService.getPrintablePermit(this.permit.permitId, includeRules).subscribe(response => {
      let content = response[0]['result'];
      if (includeRules) {
        content += response[1]['result'];
      }
      this.image = this.sanitizer.bypassSecurityTrustHtml(content);
      setTimeout(() => this.permitPopup(includeRules, popupWin), 0);
    });
  }

  /**
   * Open popup window and print dialog
   */
  permitPopup(includeRules, popupWin) {
    let printContents;
    const cssFile = includeRules ? 'print-permit-with-rules.css' : 'print-permit.css';
    const toPrintEl = this.document.getElementById('toPrint');

    if (toPrintEl) {
      printContents = toPrintEl.innerHTML;
    }

    popupWin.document.open();

    popupWin.document.write(`
      <html>
        <head>
          <title></title>
          <link href="/assets/css/${cssFile}" rel="stylesheet" type="text/css">
        </head>
        <body onload="window.focus(); setTimeout(window.print(), 1000);  window.onmousemove=function(){ window.close()}">${printContents}</body>
      </html>
      `);

    popupWin.document.close();
  }
}
