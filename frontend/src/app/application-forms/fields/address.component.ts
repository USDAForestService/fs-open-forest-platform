import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApplicationFieldsService } from '../_services/application-fields.service';
import { States } from '../../_models/constants';

@Component({
  providers: [ApplicationFieldsService],
  selector: 'app-address',
  templateUrl: './address.component.html'
})
export class AddressComponent implements OnInit {
  @Input() parentForm: FormGroup;
  address: FormGroup;
  @Input() formName: string;
  @Input() type: string;
  unique: string;

  states = States;

  constructor(private formBuilder: FormBuilder, public afs: ApplicationFieldsService) {}

  ngOnInit() {
    this.unique = Math.random().toString(36).substring(7);

    this.afs.addAddress(this.parentForm, this.formName);
    if (this.formName === 'primaryAddress') {
      this.afs.addAddressValidation(this.parentForm, this.formName);
    }
  }
}
