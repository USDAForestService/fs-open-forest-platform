import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html'
})
export class EmailComponent {
  @Input() applicantInfo: FormGroup;
}
