import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApplicationFieldsService } from '../_services/application-fields.service';

@Component({
  selector: 'app-map-url',
  templateUrl: './map-url.component.html'
})
export class MapUrlComponent {
  @Input() applicantInfo: FormGroup;

  constructor(public afs: ApplicationFieldsService) {}
}
