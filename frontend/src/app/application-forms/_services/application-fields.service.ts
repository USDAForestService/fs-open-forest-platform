import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { alphanumericValidator } from '../validators/alphanumeric-validation';

@Injectable()
export class ApplicationFieldsService {
  uploadingFiles: any = [];
  hasFilesToUpload: boolean = false;

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
      this.updateValidators(dataField, value);
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

  setHasFilesToUpload(value) {
    this.hasFilesToUpload = value;
  }

  getHasFilesToUpload() {
    return this.hasFilesToUpload;
  }

  addUploadingFile(file) {
    this.uploadingFiles.push(file);
  }

  removeUploadingFile(file) {
    this.uploadingFiles.splice(file, 1);
  }

  areFilesUploaded() {
    if (!this.uploadingFiles.length) {
      return true;
    }
  }

  getFileUploadProgress(numFiles) {
    if (this.uploadingFiles.length) {
      return 100 / numFiles * (numFiles - this.uploadingFiles.length);
    } else {
      return 100;
    }
  }
}
