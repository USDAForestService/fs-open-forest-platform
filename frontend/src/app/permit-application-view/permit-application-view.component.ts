import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Application } from '../admin/application';
import { ApplicationService } from '../admin/application.service';

@Component({
  selector: 'app-permit-application-view',
  templateUrl: './permit-application-view.component.html',
  providers: [ ApplicationService ],
  styleUrls: ['./permit-application-view.component.scss']
})
export class PermitApplicationViewComponent implements OnInit {

  id: number;
  application = new Application();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private applicationService: ApplicationService
  ) { }

  getApplication(id) {
    this.applicationService.getOne(id)
      .subscribe(
        application => this.application = application,
        (e: any) => {
          console.log(e);
        }
      )
  }

  updateApplicationStatus(application, status) {
    application.status = status;
    this.applicationService.update(application, '/special-uses/noncommercial/')
      .subscribe(
        (application: any) => {
          console.log(application);
        },
        (e: any) => {
          console.log(e);
        }
      );
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getApplication(this.id);
    });
  }

}
