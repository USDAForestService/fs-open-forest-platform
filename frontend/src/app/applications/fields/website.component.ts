import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-website',
  templateUrl: './website.component.html'
})

export class WebsiteComponent {
  @Input() applicantInfo: FormGroup;
}
