import { Component, Input } from '@angular/core';
import { ApplicationService } from '../_services/application.service';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-cancel-application',
  template: '<button class="usa-button" (click)="cancelApplication()">Cancel</button>'
})
export class CancelApplicationComponent {
  @Input() application: any;

  constructor(private applicationService: ApplicationService, private alertService: AlertService) {}

  cancelApplication() {
    let confirm = window.confirm('Are you sure you want to cancel?');
    if (confirm) {
      this.updateApplication();
    }
  }

  updateApplication() {
    this.application.status = 'Cancelled';
    this.applicationService.update(this.application, this.application.type).subscribe(
      (data: any) => {
        this.alertService.addSuccessMessage('Application has been cancelled.');
      },
      (e: any) => {
        this.applicationService.handleStatusCode(e[0]);
      }
    );
  }
}
