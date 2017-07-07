import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-advertising',
  templateUrl: './advertising.component.html'
})

export class AdvertisingComponent {
  @Input() tempOutfitterFields: FormGroup;
}
