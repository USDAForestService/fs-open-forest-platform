import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-how-to-plan',
  templateUrl: './how-to-plan.component.html'
})
export class HowToPlanComponent implements OnInit {
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
