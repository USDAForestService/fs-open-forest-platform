import { AlertService } from '../../_services/alert.service';
import { ApplicationService } from '../../_services/application.service';
import { AuthenticationService } from '../../_services/authentication.service';
import { Component, Injectable, OnInit } from '@angular/core';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-permit-application-list',
  templateUrl: './permit-application-list.component.html'
})
@Injectable()
export class PermitApplicationListComponent implements OnInit {
  apiErrors: any;
  applications: any;
  warningMessage: string;
  successMessage: string;
  applicationStatus = 'pending';
  isAdmin: boolean;
  userType: string;
  holdText: string;
  reviewText: string;

  constructor(
    private applicationService: ApplicationService,
    private alertService: AlertService,
    private authenticationService: AuthenticationService
  ) {
    this.applications = [];
    this.isAdmin = this.authenticationService.isAdmin();
    this.userType = this.isAdmin ? 'admin' : 'user';
    if (this.isAdmin) {
      this.warningMessage = 'You have one or more applications in the system that require immediate attention.';
      this.holdText = 'Hold';
      this.reviewText = 'Review';
    } else {
      this.holdText = 'On hold';
      this.reviewText = 'In review';
      this.warningMessage = 'Applications with an ON HOLD status require additional information';
    }
  }

  applicationStatusChange(event) {
    this.applicationStatus = event.target.value;
    this.alertService.clear();
    this.successMessage = null;
    this.getApplications(this.applicationStatus);
  }

  isOverTwoDaysOld(submittedDateTime) {
    const now = moment();
    const deadline = moment(submittedDateTime, 'YYYY-MM-DDTHH:mm:ss').add(2, 'days');
    return now.isAfter(deadline);
  }

  isWeekAwayOrPast(dateTime) {
    const now = moment();
    const warning = moment(dateTime, 'YYYY-MM-DDTHH:mm:ss').subtract(1, 'weeks');
    return now.isAfter(warning);
  }

  showAttentionAlert() {
    let result = false;
    this.applications.forEach(application => {
      if (this.isOverTwoDaysOld(application.createdAt)) {
        result = true;
      }
      if (!this.isAdmin && application.status === 'Hold') {
        result = true;
      }
    });
    return result;
  }

  getApplications(type) {
    this.applicationService.get(`/${type}`).subscribe(
      (applications: any) => {
        this.applications = applications;
      },
      (e: any) => {
        this.apiErrors = e;
        window.scroll(0, 0);
      }
    );
  }

  applicationCancelled(application: any): void {
    this.getApplications(this.applicationStatus);
    this.successMessage = this.alertService.getSuccessMessage();
    this.alertService.clear();
  }

  ngOnInit() {
    this.getApplications(this.applicationStatus);
    this.successMessage = this.alertService.getSuccessMessage();
    this.alertService.clear();
  }
}
