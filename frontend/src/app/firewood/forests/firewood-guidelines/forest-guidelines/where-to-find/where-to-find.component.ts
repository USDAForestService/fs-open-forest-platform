import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-where-to-find',
  templateUrl: './where-to-find.component.html'
})
export class WhereToFindComponent implements OnInit {
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
