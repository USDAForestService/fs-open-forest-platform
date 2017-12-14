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
    const printContents = document.getElementById('toPrint').innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  }
}
