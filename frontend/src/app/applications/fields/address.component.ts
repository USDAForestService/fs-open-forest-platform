import { Component, Input, OnInit  } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApplicationFieldsService } from '../_services/application-fields.service';
import { States } from '../../_models/constants';

@Component({
  providers: [ ApplicationFieldsService ],
  selector: 'app-address',
  templateUrl: './address.component.html',
})

export class AddressComponent implements OnInit {
  @Input() parentForm: FormGroup;
  address: FormGroup;
  @Input() formName: string;
  @Input() type: string;

  states = States;

  constructor(private formBuilder: FormBuilder, private applicationFieldsService: ApplicationFieldsService) {}

  ngOnInit() {
    this.applicationFieldsService.addAddress(this.parentForm, this.formName);
  }
}
