import { SpecialUseApplication } from '../../_models/special-use-application';
import { AlertService } from '../../_services/alert.service';
import { ApplicationService } from '../../_services/application.service';
import { AuthenticationService } from '../../_services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  providers: [],
  selector: 'app-permit-application-view',
  templateUrl: './permit-application-view.component.html'
})
export class PermitApplicationViewComponent implements OnInit {
  errorMessage: string;
  id: string;
  type: string;
  isAdmin: boolean;
  userType: string;
  application = new SpecialUseApplication();
  fixedCtas = false;
  reasonOrCancel = {
    buttonClass: 'fs-button-green',
    confirmButtonText: '',
    label: '',
    open: false,
    status: '',
    message: ''
  };

  constructor(
    public alertService: AlertService,
    public applicationService: ApplicationService,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    public router: Router
  ) {
    this.isAdmin = this.authenticationService.isAdmin();
    this.userType = this.isAdmin ? 'admin' : 'user';
  }

  getApplication(type, id) {
    this.applicationService.getOne(id, `/special-uses/${type}/`).subscribe(
      application => (this.application = application),
      (e: any) => {
        this.applicationService.handleStatusCode(e[0]);
        this.errorMessage = 'The application could not be found.';
        window.scrollTo(0, 200);
      }
    );
  }

  updateApplicationStatus(application, status) {
    application.status = status;
    application.applicantMessage = this.reasonOrCancel.message;
    this.applicationService.update(application, this.type).subscribe(
      (data: any) => {
        this.handleUpdateResponse(status);
      },
      (e: any) => {
        this.applicationService.handleStatusCode(e[0]);
        this.errorMessage = 'There was an error updating this application.';
        window.scrollTo(0, 200);
      }
    );
  }

  handleUpdateResponse(status) {
    if (status === 'Accepted') {
      this.alertService.addSuccessMessage(
        'Application has been sent to SUDS for further processing and an email with your message has been sent to the applicant. ' +
          '<div><a class="usa-button" href="https://iweb.fs.usda.gov/login/common.jsp?option=7">Log in to SUDS.</a></div>'
      );
    } else if (status === 'Hold') {
      this.alertService.addSuccessMessage(
        'Permit application successfully put on hold and an email with your message has been sent to the applicant.'
      );
    } else if (status === 'Rejected') {
      this.alertService.addSuccessMessage(
        'Permit application successfully rejected and an email with your message has been sent to the applicant.'
      );
    }
    this.router.navigate(['admin/applications']);
  }

  provideReasonOrCancel(status) {
    switch (status) {
      case 'Accepted':
        this.reasonOrCancel.buttonClass = 'usa-button-primary-alt';
        this.reasonOrCancel.confirmButtonText = 'Accept and notify applicant';
        this.reasonOrCancel.label = 'Additional message for the permit holder.';
        break;
      case 'Hold':
        this.reasonOrCancel.buttonClass = 'usa-button';
        this.reasonOrCancel.confirmButtonText = 'Hold and notify applicant';
        this.reasonOrCancel.label = 'Why is this application on hold?';
        break;
      case 'Rejected':
        this.reasonOrCancel.buttonClass = 'usa-button-secondary';
        this.reasonOrCancel.confirmButtonText = 'Reject and notify applicant';
        this.reasonOrCancel.label = 'Why is this application being rejected?';
        break;
      case 'Review':
        this.reasonOrCancel.buttonClass = 'usa-button-grey';
        this.reasonOrCancel.confirmButtonText = 'Remove hold and notify applicant';
        this.reasonOrCancel.label = 'Why should hold status be removed from this application?';
        break;
    }

    this.reasonOrCancel.status = status;
    this.reasonOrCancel.open = true;
    window.scrollTo(0, 200);
  }

  applicationCancelled(application: any): void {
    this.router.navigate(['user/applications']);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.type = params['type'];
      this.id = params['id'];
      this.getApplication(this.type, this.id);
    });
  }

  enter() {
    this.fixedCtas = false;
  }

  leave() {
    this.fixedCtas = true;
  }
}
