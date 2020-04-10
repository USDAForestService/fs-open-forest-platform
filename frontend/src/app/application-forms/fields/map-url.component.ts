import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApplicationFieldsService } from '../_services/application-fields.service';

@Component({
  selector: 'app-map-url',
  templateUrl: './map-url.component.html'
})
export class MapUrlComponent {
  @Input() applicantInfo: FormGroup;
  @Output() blurWebsite: EventEmitter<any> = new EventEmitter();

  constructor(public afs: ApplicationFieldsService) {}

  blurHandler(): void {
    // function to make blur event bubble up
    this.blurWebsite.emit();
  }
}
