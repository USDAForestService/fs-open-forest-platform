import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApplicationFieldsService } from '../_services/application-fields.service';

@Component({
  selector: 'app-advertising',
  templateUrl: './advertising.component.html'
})
export class AdvertisingComponent {
  @Input() tempOutfitterFields: FormGroup;
  constructor(public afs: ApplicationFieldsService) {}
}
