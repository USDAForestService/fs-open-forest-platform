import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApplicationFieldsService } from '../_services/application-fields.service';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html'
})
export class EmailConfirmationComponent {
  @Input() applicantInfo: FormGroup;
  @Input() hintText: string;
  constructor(public afs: ApplicationFieldsService) {}
}
