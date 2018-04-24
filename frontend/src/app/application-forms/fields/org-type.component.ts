import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-org-type',
  templateUrl: './org-type.component.html'
})
export class OrgTypeComponent {
  @Input() applicantInfo: FormGroup;
  @Input() type: string;
}
