import { Component, OnInit, SecurityContext } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-tree-permit-view',
  templateUrl: './tree-permit-view.component.html'
})
export class TreePermitViewComponent implements OnInit {
  forest: any;
  permit: any = { totalCost: 0, quantity: 0, emailAddress: '' };
  image: any;

  constructor(private route: ActivatedRoute, private titleService: Title, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.forest = data.forest;
      this.permit = data.permit;
      this.titleService.setTitle(
        'View your Christmas tree permit order confirmation for ' +
          data.forest.forestName +
          ' National Forest | U.S. Forest Service Christmas Tree Permitting'
      );
      this.image = this.sanitizer.bypassSecurityTrustHtml(this.permit.permitImage);
    });
  }

  printPermit() {
    let printContents, popupWin;
    printContents = document.getElementById('toPrint').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
        </head>
        <style>
          @page {
            size: auto;
            margin: 0mm;
          }
          body {
            max-height: 816px;
          }
        </style>
      <body onload="window.print();window.close()">${printContents}</body>
      </html>`);
    popupWin.document.close();
  }
}
