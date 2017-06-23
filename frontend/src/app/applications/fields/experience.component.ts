import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html'
})

export class ExperienceComponent {
  @Input() tempOutfittersFields: FormGroup;
}
