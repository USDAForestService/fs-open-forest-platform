import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApplicationFieldsService } from '../_services/application-fields.service';

@Component({
  selector: 'app-number-of-cords',
  templateUrl: './number-of-cords.component.html'
})
export class NumberOfCordsComponent {
  @Input() applicantInfo: FormGroup;
  @Input() hintText: string;
  constructor(public afs: ApplicationFieldsService) {}
}
