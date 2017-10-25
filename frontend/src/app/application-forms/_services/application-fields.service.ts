import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { alphanumericValidator } from '../validators/alphanumeric-validation';

@Injectable()
export class ApplicationFieldsService {
  numberOfFiles: any = 0;
  fileUploadError = false;
  editApplication = false;

  constructor(private formBuilder: FormBuilder) {}

  addAddress(parentForm, formName) {
    this[formName] = this.formBuilder.group({
      mailingAddress: [''],
      mailingAddress2: [''],
      mailingCity: [''],
      mailingState: [''],
      mailingZIP: ['']
    });
    parentForm.addControl(formName, this[formName]);
  }

  removeAddress(parentForm, formName) {
    parentForm.removeControl(formName);
  }

  addAddressValidation(parentForm, formName) {
    if (parentForm.get(`${formName}`)) {
      parentForm.get(`${formName}.mailingAddress`).setValidators([Validators.required, alphanumericValidator()]);
      parentForm.get(`${formName}.mailingCity`).setValidators([Validators.required, alphanumericValidator()]);
      parentForm.get(`${formName}.mailingState`).setValidators([Validators.required, alphanumericValidator()]);
      parentForm
        .get(`${formName}.mailingZIP`)
        .setValidators([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(5),
          alphanumericValidator()
        ]);
    }
  }

  removeAddressValidation(parentForm, formName) {
    if (parentForm.get(`${formName}`)) {
      parentForm.get(`${formName}.mailingAddress`).setValidators(null);
      parentForm.get(`${formName}.mailingCity`).setValidators(null);
      parentForm.get(`${formName}.mailingState`).setValidators(null);
      parentForm.get(`${formName}.mailingZIP`).setValidators(null);
    }
  }

  addAdditionalPhone(parentForm) {
    const eveningPhone = this.formBuilder.group({
      areaCode: [],
      extension: [],
      number: [],
      prefix: [],
      tenDigit: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]]
    });
    parentForm.addControl('eveningPhone', eveningPhone);

    parentForm.get('eveningPhone.tenDigit').valueChanges.subscribe(value => {
      parentForm.patchValue({ eveningPhone: { areaCode: value.substring(0, 3) } });
      parentForm.patchValue({ eveningPhone: { prefix: value.substring(3, 6) } });
      parentForm.patchValue({ eveningPhone: { number: value.substring(6, 10) } });
    });
  }

  removeAdditionalPhone(parentForm) {
    parentForm.removeControl('eveningPhone');
  }

  simpleRequireToggle(toggleField, dataField) {
    toggleField.valueChanges.subscribe(value => {
      this.updateValidators(dataField, value);
    });
  }

  toggleSwitchRequire(toggleField, dataFieldOne, dataFieldTwo) {
    toggleField.valueChanges.subscribe(value => {
      this.updateValidators(dataFieldOne, !value);
      this.updateValidators(dataFieldTwo, value);
    });
  }

  updateValidators(dataField, value) {
    if (value) {
      dataField.setValidators([Validators.required, alphanumericValidator()]);
    } else {
      dataField.setValidators(null);
      dataField.updateValueAndValidity();
    }
  }

  scrollToFirstError() {
    const invalidElements = document.querySelectorAll(
      'input.ng-invalid, select.ng-invalid, textarea.invalid, .usa-file-input.ng-invalid, .ng-untouched.required'
    );
    if (invalidElements.length === 0) {
      return;
    }
    invalidElements[0].scrollIntoView();
    document.getElementById(invalidElements[0].getAttribute('id')).focus();
  }

  touchField(control: FormControl) {
    control.markAsTouched();
    control.updateValueAndValidity();
  }

  touchAllFields(formGroup: FormGroup) {
    if (formGroup.controls) {
      (<any>Object).keys(formGroup.controls).forEach(c => {
        const control = formGroup.controls[c];
        if (control.status === 'INVALID') {
          control.markAsTouched();
          control.updateValueAndValidity();
        }
        this.touchAllFields(<FormGroup>control);
      });
    }
  }

  doesControlHaveErrors(formGroup: FormGroup) {
    let errors = false;
    if (!formGroup) {
      return errors;
    }

    errors = (<any>Object).keys(formGroup.controls).some(control => {
      return (
        this.loopChildControlsForErrors(<FormGroup>formGroup.controls[control]) ||
        (formGroup.controls[control].errors && formGroup.controls[control].touched)
      );
    });
    return errors;
  }

  loopChildControlsForErrors(formGroup: FormGroup) {
    if (formGroup.controls) {
      const errors = (<any>Object).keys(formGroup.controls).some(control => {
        if (formGroup.controls[control].errors && formGroup.controls[control].touched) {
          return true;
        }
        if (control.controls) {
          this.loopChildControlsForErrors(<FormGroup>formGroup.controls[control]);
        }
      });
      return errors;
    }
    return;
  }

  parseNumberOfFilesToUpload(FormControls) {
    let numberOfFiles = 0;
    FormControls.forEach(function(control) {
      if (control && control.value) {
        numberOfFiles++;
      }
    });
    this.setNumberOfFiles(numberOfFiles);
    return this.numberOfFiles;
  }

  getNumberOfFiles() {
    return this.numberOfFiles;
  }

  setNumberOfFiles(num) {
    this.numberOfFiles = num;
  }

  removeOneFile() {
    this.numberOfFiles--;
  }

  getFileUploadProgress(startingNumberOfFiles) {
    const filesRemaining = this.numberOfFiles - 1;
    return startingNumberOfFiles - filesRemaining;
  }

  setFileUploadError(value: boolean) {
    this.fileUploadError = value;
  }

  setEditApplication(value: boolean) {
    this.editApplication = value;
  }

  getEditApplication() {
    return this.editApplication;
  }
}
