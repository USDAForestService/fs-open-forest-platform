import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApplicationFieldsService } from '../_services/application-fields.service';

@Component({
  selector: 'app-permit-holder-name',
  templateUrl: './permit-holder-name.component.html'
})
export class PermitHolderNameComponent implements OnInit {
  @Input() applicantInfo: FormGroup;
  @Input() type: string;
  @Input() name: string;
  unique: string;

  constructor(public afs: ApplicationFieldsService) {}

  ngOnInit() {
    this.unique = Math.random().toString(36).substring(7);
  }
}
