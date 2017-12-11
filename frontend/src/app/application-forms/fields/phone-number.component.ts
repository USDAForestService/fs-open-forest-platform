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

  constructor(private formBuilder: FormBuilder, public afs: ApplicationFieldsService) {}

  ngOnInit() {
    this.addFormControls();
    this.setValueChangeSubscription('dayPhone');
    this.setValueChangeSubscription('eveningPhone');
    if (this.parentForm.get('addAdditionalPhone')) {
      this.parentForm.get('addAdditionalPhone').valueChanges.subscribe(value => {
        this.addRemoveValidators(value);
      });
    }
  }

  addFormControls() {
    const dayPhone = this.formBuilder.group({
      areaCode: [null, Validators.maxLength(3)],
      extension: [, [Validators.minLength(1), Validators.maxLength(6)]],
      number: [null, Validators.maxLength(4)],
      prefix: [null, Validators.maxLength(3)],
      tenDigit: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]]
    });
    this.parentForm.addControl('dayPhone', dayPhone);

    const eveningPhone = this.formBuilder.group({
      areaCode: [null, Validators.maxLength(3)],
      extension: [null, Validators.maxLength(6)],
      number: [null, Validators.maxLength(4)],
      prefix: [null, Validators.maxLength(3)],
      tenDigit: ['', Validators.maxLength(10)]
    });
    this.parentForm.addControl('eveningPhone', eveningPhone);
  }

  addRemoveValidators(value) {
    if (value) {
      this.parentForm.get('eveningPhone.extension').setValidators([Validators.minLength(1), Validators.maxLength(6)]);
      this.parentForm
        .get('eveningPhone.tenDigit')
        .setValidators([Validators.required, Validators.minLength(10), Validators.maxLength(10)]);
    } else {
      this.parentForm.get('eveningPhone.extension').setValidators(null);
      this.parentForm.get('eveningPhone.tenDigit').setValidators(null);
    }
  }

  setValueChangeSubscription(type) {
    if (this.parentForm.get('dayPhone.tenDigit')) {
      this.parentForm.get(`${type}.tenDigit`).valueChanges.subscribe(value => {
        if (value) {
          this.parentForm.patchValue({ [type]: { areaCode: value.substring(0, 3) } });
          this.parentForm.patchValue({ [type]: { prefix: value.substring(3, 6) } });
          this.parentForm.patchValue({ [type]: { number: value.substring(6, 10) } });
        }
      });
    }
  }
}
