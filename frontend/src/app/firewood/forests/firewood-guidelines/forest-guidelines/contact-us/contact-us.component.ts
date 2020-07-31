import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { FirewoodInfoService } from '../../../../_services/firewood-info.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html'
})
export class ContactUsComponent implements OnInit {
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
