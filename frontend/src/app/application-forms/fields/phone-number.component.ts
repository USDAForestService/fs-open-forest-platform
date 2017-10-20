import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApplicationFieldsService } from '../_services/application-fields.service';

@Component({
  selector: 'app-phone-number',
  templateUrl: './phone-number.component.html'
})
export class PhoneNumberComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Input() name: string;
  dayPhone = 'dayPhone';
  eveningPhone = 'eveningPhone';
  additionalPhone = false;

  constructor(private formBuilder: FormBuilder, private service: ApplicationFieldsService) {}

  ngOnInit() {
    const dayPhone = this.formBuilder.group({
      areaCode: [],
      extension: [, [Validators.minLength(1), Validators.maxLength(6)]],
      number: [],
      prefix: [],
      tenDigit: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]]
    });
    this.parentForm.addControl('dayPhone', dayPhone);

    if (this.parentForm.controls.addAdditionalPhone.value) {
      this.addAdditionalPhone();
    }

    this.parentForm.get('dayPhone.tenDigit').valueChanges.subscribe(value => {
      this.parentForm.patchValue({ dayPhone: { areaCode: value.substring(0, 3) } });
      this.parentForm.patchValue({ dayPhone: { prefix: value.substring(3, 6) } });
      this.parentForm.patchValue({ dayPhone: { number: value.substring(6, 10) } });
    });
  }

  addOrRemoveAdditionalPhone() {
    if (!this.additionalPhone) {
      this.addAdditionalPhone();
    } else {
      this.removeAdditionalPhone();
    }
  }

  addAdditionalPhone() {
    const eveningPhone = this.formBuilder.group({
      areaCode: [],
      extension: [],
      number: [],
      prefix: [],
      tenDigit: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]]
    });
    this.parentForm.addControl('eveningPhone', eveningPhone);

    this.parentForm.get('eveningPhone.tenDigit').valueChanges.subscribe(value => {
      this.parentForm.patchValue({ eveningPhone: { areaCode: value.substring(0, 3) } });
      this.parentForm.patchValue({ eveningPhone: { prefix: value.substring(3, 6) } });
      this.parentForm.patchValue({ eveningPhone: { number: value.substring(6, 10) } });
    });

    this.additionalPhone = true;
  }

  removeAdditionalPhone() {
    this.parentForm.removeControl('eveningPhone');
    this.additionalPhone = false;
  }
}
