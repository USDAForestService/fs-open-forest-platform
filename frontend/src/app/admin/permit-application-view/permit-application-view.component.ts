import { SpecialUseApplication } from '../../_models/special-use-application';
import { AlertService } from '../../_services/alert.service';
import { ApplicationService } from '../../_services/application.service';
import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  providers: [],
  selector: 'app-permit-application-view',
  templateUrl: './permit-application-view.component.html'
})
export class PermitApplicationViewComponent implements OnInit {

  errorMessage: string;
  id: string;

  application = new SpecialUseApplication();
  fixedCtas = false;
  reasonOrCancel = {
    buttonClass: 'fs-button-green',
    confirmButtonText: '',
    label: '',
    open: false,
    status: ''
  };

  constructor(
    private alertService: AlertService,
    private applicationService: ApplicationService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  getApplication(id) {
    this.applicationService.getOne(id)
      .subscribe(
        application => this.application = application,
        (e: any) => {
          this.errorMessage = 'The application could not be found.'
          window.scrollTo(0, 200);
        }
      );
  }

  updateApplicationStatus(application, status) {
    application.status = status;
    this.applicationService.update(application)
      .subscribe(
        (data: any) => {
          if (status === 'Accepted') {
            this.alertService.addSuccessMessage('Permit application successfully sent to SUDS.');
          }
          this.router.navigate(['admin/applications']);
        },
        (e: any) => {
          this.errorMessage = 'There was an error updating this application.'
          window.scrollTo(0, 200);
        }
      );
  }

  provideReasonOrCancel(status) {

    switch (status) {
      case 'Accepted':
        this.reasonOrCancel.buttonClass = 'usa-button-primary-alt';
        this.reasonOrCancel.confirmButtonText = 'Approve and notify applicant';
        this.reasonOrCancel.label = 'Additional message for the permit holder.';
        break;
      case 'Hold':
        this.reasonOrCancel.buttonClass = 'usa-button';
        this.reasonOrCancel.confirmButtonText = 'Hold and notify applicant';
        this.reasonOrCancel.label = 'Why is this application on hold?';
        break;
      case 'Returned':
        this.reasonOrCancel.buttonClass = 'usa-button-secondary';
        this.reasonOrCancel.confirmButtonText = 'Reject and notify applicant';
        this.reasonOrCancel.label = 'Why is this application being rejected?';
        break;
    }

    this.reasonOrCancel.status = status;
    this.reasonOrCancel.open = true;
    window.scrollTo(0, 200);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getApplication(this.id);
    });
  }

  enter() {
    this.fixedCtas = false;
  }

  leave() {
    this.fixedCtas = true;
  }

}
