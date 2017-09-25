import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-organization-name',
  templateUrl: './organization-name.component.html'
})
export class OrganizationNameComponent {
  @Input() applicantInfo: FormGroup;
  @Input() name: string;
}
