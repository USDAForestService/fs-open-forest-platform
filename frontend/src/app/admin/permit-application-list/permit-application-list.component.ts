import { Application } from '../../_models/application';
import { ApplicationService } from '../../_services/application.service';
import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-permit-application-list',
  templateUrl: './permit-application-list.component.html',
  providers: [ ApplicationService ]
})

@Injectable()
export class PermitApplicationListComponent implements OnInit {

  applications: any;
  apiErrors: any;

  constructor( private applicationService: ApplicationService ) { }

  isApproachingDeadline(startDateTime) {
    const now = moment();
    const start = moment(startDateTime);
    const deadline = moment().add(3, 'days');
    return start.isBetween(now, deadline);
  }

  getApplications() {
    this.applicationService.get()
      .subscribe(
        (applications: any) => {
          this.applications = applications;
        },
        (e: any) => {
          this.apiErrors = e;
          window.scroll(0, 0);
        }
      );
  }

  ngOnInit() {
    this.getApplications();
  }

}
