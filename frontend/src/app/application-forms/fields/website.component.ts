import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApplicationFieldsService } from '../_services/application-fields.service';

@Component({
  selector: 'app-website',
  templateUrl: './website.component.html'
})
export class WebsiteComponent {
  @Input() applicantInfo: FormGroup;
  @Output() blurWebsite: EventEmitter<any> = new EventEmitter();

  constructor(public afs: ApplicationFieldsService) {}

  blurHandler(): void {
    // function to make blur event bubble up
    this.blurWebsite.emit();
  }
}
