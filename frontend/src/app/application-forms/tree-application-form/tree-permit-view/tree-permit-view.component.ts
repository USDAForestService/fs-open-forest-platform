import { Component, OnInit, SecurityContext } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      if (data.permit && data.permit.forest) {
        this.forest = data.permit.forest;
        this.permit = data.permit;
        this.titleService.setTitle(
          'View your Christmas tree permit order confirmation for ' +
            data.permit.forest.forestName +
            ' National Forest | U.S. Forest Service Christmas Tree Permitting'
        );
        this.image = this.sanitizer.bypassSecurityTrustHtml(this.permit.permitImage);
      } else {
        this.router.navigate([`/`]);
      }
    });
  }

  printStyle() {
    return `
      <style>
        @page {
          size: auto;
          margin: 0mm;
        }
        @media print {
          html,body{
            height:100%;
            width:100%;
            max-height: 810px;
            margin:0;
            padding:0;
          }
          svg{
            width: 100%;
            display: block;
            margin-top: 210px;
            transform: rotate(-90deg) scale(1.25, 1.25);
            -webkit-transform: rotate(-90deg) scale(1.25, 1.25);
            -moz-transform:rotate(-90deg) scale(1.25, 1.25);
          }
        }
      </style>`;
  }

  printPermit() {
    let printContents, popupWin;
    const htmlStyle = this.printStyle();
    printContents = document.getElementById('toPrint').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print permit</title>
        </head>
        ${htmlStyle}
        <body onload="window.print();window.close()">${printContents}</body>
      </html>
      `);
    popupWin.document.close();
  }
}
