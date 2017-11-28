import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApplicationFieldsService } from '../_services/application-fields.service';

@Component({
  selector: 'app-quantity',
  templateUrl: './quantity.component.html'
})
export class QuantityComponent {
  @Input() parentGroup: FormGroup;
  @Input() label: string;
  @Input() hintText: string;
  @Input() length: string;
  constructor(public afs: ApplicationFieldsService) {}
}
