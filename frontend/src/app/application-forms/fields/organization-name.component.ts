import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApplicationFieldsService } from '../_services/application-fields.service';

@Component({
  selector: 'app-organization-name',
  templateUrl: './organization-name.component.html'
})
export class OrganizationNameComponent {
  @Input() applicantInfo: FormGroup;
  @Input() name: string;
  @Input() required: boolean;
  constructor(public afs: ApplicationFieldsService) {}
}
