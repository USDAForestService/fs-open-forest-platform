import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApplicationFieldsService } from '../_services/application-fields.service';

@Component({
  selector: 'app-number-of-trees',
  templateUrl: './number-of-trees.component.html'
})
export class NumberOfTreesComponent {
  @Input() parentGroup: FormGroup;
  constructor(public afs: ApplicationFieldsService) {}
}
