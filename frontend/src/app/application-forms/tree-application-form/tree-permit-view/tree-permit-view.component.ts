import { Component, Inject, OnInit, SecurityContext } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChristmasTreesApplicationService } from '../../../trees/_services/christmas-trees-application.service';
import { Title } from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';
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

  constructor(
    private route: ActivatedRoute,
    private christmasTreesApplicationService: ChristmasTreesApplicationService,
    private titleService: Title,
    private sanitizer: DomSanitizer,
    private router: Router,
    private winRef: WindowRef,
    @Inject(DOCUMENT) private document: any
  ) {
    this.nativeWindow = winRef.getNativeWindow();
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      if (data.permit && data.permit.error) {
        this.processError(data.permit.error);
      } else {
        this.setPageData(data);
      }
    });
  }

  processError(data) {
    this.error = data;
    this.setPageData(data);
  }

  setPageData(data) {
    if (data.permit && data.permit.forest) {
      this.forest = data.permit.forest;
      this.permit = data.permit;
      this.isPermitExpired = new Date(data.permit.expirationDate) < new Date();
      this.titleService.setTitle(
        `Permit order confirmation | ${data.permit.forest.forestName} | U.S. Forest Service Christmas Tree Permitting`
      );
    }
  }

  printPermit() {
    const includeRules = this.includeRules ? true : false;

    this.christmasTreesApplicationService.getPrintablePermit(this.permit.permitId, includeRules).subscribe(response => {
      let content = response[0]['result'];
      if (includeRules) {
        content += response[1]['result'];
      }
      this.image = this.sanitizer.bypassSecurityTrustHtml(content);
      setTimeout(() => this.permitPopup(includeRules), 0);
    });
  }

  permitPopup(includeRules) {
    let printContents, popupWin;

    const cssFile = (includeRules) ? 'print-permit-with-rules.css' : 'print-permit.css';
    const toPrintEl = this.document.getElementById('toPrint');
    if (toPrintEl) {
      printContents = toPrintEl.innerHTML;
    }
    popupWin = this.nativeWindow.open('', '_blank', 'top=0,left=0,height=auto,width=auto');

    popupWin.document.open();

    popupWin.document.write(`
      <html>
        <head>
          <title></title>
          <link href="/assets/css/${cssFile}" rel="stylesheet" type="text/css">
        </head>
        <body onload="window.focus(); setTimeout(window.print(), 0);  window.onmousemove=function(){ window.close()}">${printContents}</body>
      </html>
      `);

    popupWin.document.close();
  }
}
