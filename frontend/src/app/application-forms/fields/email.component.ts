import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApplicationFieldsService } from '../_services/application-fields.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html'
})
export class EmailComponent {
  @Input() applicantInfo: FormGroup;
  @Input() hintText: string;
  constructor(public afs: ApplicationFieldsService) {}
}
