import { Component, Input } from '@angular/core';

@Component({
  providers: [],
  selector: 'app-permit-application-view-details',
  templateUrl: './permit-application-view-details.component.html'
})
export class PermitApplicationViewDetailsComponent {
  @Input() application: any;
}
