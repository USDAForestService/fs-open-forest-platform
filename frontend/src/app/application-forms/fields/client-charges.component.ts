import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApplicationFieldsService } from '../_services/application-fields.service';

@Component({
  selector: 'app-client-charges',
  templateUrl: './client-charges.component.html'
})
export class ClientChargesComponent {
  @Input() tempOutfitterFields: FormGroup;
  constructor(public afs: ApplicationFieldsService) {}
}
