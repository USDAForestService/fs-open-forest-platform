import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-when-to-cut',
  templateUrl: './when-to-cut.component.html'
})
export class WhenToCutComponent implements OnInit {
  forest: any = [];
  id: any;
  isSeasonOpen = true;


  constructor(
    private route: ActivatedRoute,
    // private firewoodInfoService: FirewoodInfoService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.route.data.subscribe(data => {
      this.forest = data.forest;
    });
  }
}
