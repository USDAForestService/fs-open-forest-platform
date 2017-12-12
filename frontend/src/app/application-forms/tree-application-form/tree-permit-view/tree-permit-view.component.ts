import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-tree-permit-view',
  templateUrl: './tree-permit-view.component.html'
})
export class TreePermitViewComponent implements OnInit {
  forest: any;
  permit: any = { totalCost: 0, quantity: 0, emailAddress: '' };

  constructor(private route: ActivatedRoute, private titleService: Title) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.forest = data.forest;
      this.permit = data.permit;
      this.titleService.setTitle(
        'View your Christmas tree permit confirmation for ' +
          data.forest.forestName +
          ' National Forest | U.S. Forest Service Christmas Tree Permitting'
      );
    });
  }
}
