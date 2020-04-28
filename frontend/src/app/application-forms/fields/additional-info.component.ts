import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApplicationFieldsService } from '../_services/application-fields.service';

@Component({
  selector: 'app-additional-info',
  templateUrl: './additional-info.component.html'
})
export class AdditionalInfoComponent {
  @Input() tempOutfitterFields: FormGroup;
  constructor(public afs: ApplicationFieldsService) {}
}
