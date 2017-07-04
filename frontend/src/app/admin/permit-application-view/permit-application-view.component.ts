import { Application } from '../../_models/application';
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

  id: string;
  application = new Application();
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
          // TODO: talk to Peter about how to handle
          console.log(e);
        }
      );
  }

  updateApplicationStatus(application, status) {
    application.status = status;
    this.alertService.addSuccessMessage('yah!');
    console.log('updating');
    this.applicationService.update(application)
      .subscribe(
        (data: any) => {
          this.router.navigate(['admin/applications']);
        },
        (e: any) => {
          // TODO: talk to Peter about how to handle
          console.log(e);
        }
      );
  }

  provideReasonOrCancel(status) {

    switch (status) {
      case 'Accepted':
        this.reasonOrCancel.buttonClass = 'fs-button-green';
        this.reasonOrCancel.confirmButtonText = 'Approve and notify applicant';
        this.reasonOrCancel.label = 'Additional message for the permit holder.';
        this.reasonOrCancel.status = status;
        break;
      case 'Hold':
        this.reasonOrCancel.buttonClass = 'usa-button';
        this.reasonOrCancel.confirmButtonText = 'Hold and notify applicant';
        this.reasonOrCancel.label = 'Why is this application on hold?';
        this.reasonOrCancel.status = status;
        break;
      case 'Returned':
        this.reasonOrCancel.buttonClass = 'usa-button-secondary';
        this.reasonOrCancel.confirmButtonText = 'Reject and notify applicant';
        this.reasonOrCancel.label = 'Why is this application being rejected?';
        this.reasonOrCancel.status = status;
        break;
    }

    this.reasonOrCancel.open = true;
    window.scrollTo(0, 200);
  }

  ngOnInit() {
    window.scrollTo(0, 0);
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
