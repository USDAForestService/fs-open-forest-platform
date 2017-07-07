import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-small-business',
  templateUrl: './small-business.component.html'
})

export class SmallBusinessComponent {
  @Input() tempOutfitterFields: FormGroup;
}
