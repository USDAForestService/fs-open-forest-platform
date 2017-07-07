import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-client-charges',
  templateUrl: './client-charges.component.html'
})

export class ClientChargesComponent {
  @Input() tempOutfitterFields: FormGroup;
}
