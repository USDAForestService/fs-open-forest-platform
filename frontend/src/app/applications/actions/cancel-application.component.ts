import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApplicationService } from '../../_services/application.service';
import { AlertService } from '../../_services/alert.service';
import { UtilService } from '../../_services/util.service';
import { AuthenticationService } from '../../_services/authentication.service';
import { CamelToHyphensPipe } from '../../_pipes/camel-to-hyphens.pipe';

@Component({
  selector: 'app-cancel-application',
  template: `<button *ngIf="
      application.status !== 'Accepted'
      && application.status !== 'Cancelled'"
      class="usa-button cancel-button-{{authentication.user.role}}" (click)="cancelApplication()">{{ text }}</button>`,
  providers: [CamelToHyphensPipe]
})
export class CancelApplicationComponent {
  @Input() application: any;
  @Input() text: string;
  @Output() applicationCancelled: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private applicationService: ApplicationService,
    private alertService: AlertService,
    public authentication: AuthenticationService,
    public util: UtilService,
    public camelToHyphensPipe: CamelToHyphensPipe
  ) {}

  cancelApplication() {
    const confirm = window.confirm('Are you sure you want to cancel this application?');
    if (confirm) {
      this.updateApplication();
    }
  }

  updateApplication() {
    this.application.status = 'Cancelled';
    const type = this.camelToHyphensPipe.transform(this.application.type);
    this.applicationService.update(this.application, type).subscribe(
      (data: any) => {
        this.alertService.addSuccessMessage('Permit application was successfully cancelled.');
        this.applicationCancelled.emit(this.application);
      },
      (e: any) => {
        alert('There was an error cancelling your application. Please try again.');
      }
    );
  }
}
