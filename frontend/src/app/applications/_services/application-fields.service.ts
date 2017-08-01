import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { alphanumericValidator } from '../validators/alphanumeric-validation';

@Injectable()
export class ApplicationFieldsService {
  constructor(private formBuilder: FormBuilder) {}

  addAddress(parentForm, formName) {
    this[formName] = this.formBuilder.group({
      mailingAddress: ['', [Validators.required, alphanumericValidator()]],
      mailingAddress2: [''],
      mailingCity: ['', [Validators.required, alphanumericValidator()]],
      mailingState: ['', [Validators.required, alphanumericValidator()]],
      mailingZIP: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5), alphanumericValidator()]]
    });
    parentForm.addControl(formName, this[formName]);
  }

  removeAddress(parentForm, formName) {
    parentForm.removeControl(formName);
  }

  simpleRequireToggle(toggleField, dataField) {
    toggleField.valueChanges.subscribe(value => {
      if (value) {
        dataField.setValidators([Validators.required, alphanumericValidator()]);
      } else {
        dataField.setValidators(null);
      }
    });
  }

  scrollToFirstError() {
    const elements = document.getElementsByClassName('ng-invalid');
    const invalidInputs = Array.prototype.filter.call(elements, function(element) {
      return element.nodeName === 'INPUT';
    });
    if (invalidInputs.length === 0) {
      return;
    }
    invalidInputs[0].scrollIntoView();
  }

  touchAllFields(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      if (control.status === 'INVALID') {
        control.markAsTouched();
        control.updateValueAndValidity();
      }
      if (control.controls) {
        this.touchAllFields(control);
      }
    });
  }
}
