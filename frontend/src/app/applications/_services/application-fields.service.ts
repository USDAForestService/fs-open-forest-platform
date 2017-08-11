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
    const invalidElements = document.querySelectorAll(
      'input.ng-invalid, select.ng-invalid, textarea.invalid, .usa-file-input.ng-invalid, .ng-untouched.required'
    );
    if (invalidElements.length === 0) {
      return;
    }
    invalidElements[0].scrollIntoView();
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

  doesControlHaveErrors(formGroup: FormGroup) {
    let errors = false;
    if (!formGroup) {
      return errors;
    }
    errors = (<any>Object).values(formGroup.controls).some(control => {
      return this.loopChildControlsForErrors(control) || (control.errors && control.touched);
    });
    return errors;
  }

  loopChildControlsForErrors(formGroup: FormGroup) {
    if (formGroup.controls) {
      const errors = (<any>Object).values(formGroup.controls).some(control => {
        if (control.errors && control.touched) {
          return true;
        }
        if (control.controls) {
          this.loopChildControlsForErrors(control);
        }
      });
      return errors;
    }
    return;
  }
}
