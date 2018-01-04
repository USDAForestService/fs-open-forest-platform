import { Component, OnInit, SecurityContext } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';
import { WindowRef } from '../../../_services/native-window.service';

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

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private sanitizer: DomSanitizer,
    private router: Router,
    private winRef: WindowRef
  ) {
    this.nativeWindow = winRef.getNativeWindow();
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      if (data.permit && data.permit.error) {
        this.processError(data.permit.error.errors[0]);
      } else {
        this.setPageData(data, 'View your Christmas tree permit order confirmation');
      }
    });
  }

  processError(data) {
    this.setPageData(data, 'There was an error processing your Christmas tree permit order');
    this.error = data;
  }

  setPageData(data, title) {
    if (data.permit && data.permit.forest) {
      this.forest = data.permit.forest;
      this.permit = data.permit;
      if (this.permit.permitImage) {
        this.image = this.sanitizer.bypassSecurityTrustHtml(this.permit.permitImage);
      }
      this.isPermitExpired = data.permit.expirationDate < new Date();
      this.titleService.setTitle(
        `${title} for ${data.permit.forest.forestName} National Forest | U.S. Forest Service Christmas Tree Permitting`
      );
    }
  }

  printPermit() {
    let printContents, popupWin;
    printContents = document.getElementById('toPrint').innerHTML;
    popupWin = this.nativeWindow.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print permit</title>
          <link href="/assets/css/print-permit.css" rel="stylesheet" type="text/css">
        </head>
        <body onload="window.print();window.close();">${printContents}</body>
      </html>
      `);
    popupWin.document.close();
  }
}
