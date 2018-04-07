import { Injectable, Inject} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { alphanumericValidator } from '../validators/alphanumeric-validation';
import { numberValidator } from '../validators/number-validation';
import { stateValidator } from '../validators/state-validation';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class ApplicationFieldsService {
  editApplication = false;

  constructor(
    @Inject(DOCUMENT) public doc: Document,
    public formBuilder: FormBuilder
  ) {}

  hasError(control: FormControl) {
    if (control && control.touched && control.errors) {
      return 'true';
    } else {
      return 'false';
    }
  }

  labelledBy(control: FormControl, labelId, errorId) {
    if (control && control.touched && control.errors) {
      return errorId;
    } else {
      return labelId;
    }
  }

  addAddress(parentForm, formName) {
    this[formName] = this.formBuilder.group({
      mailingAddress: ['', [Validators.maxLength(255)]],
      mailingAddress2: ['', [Validators.maxLength(255)]],
      mailingCity: ['', [Validators.maxLength(255)]],
      mailingState: ['', [Validators.maxLength(2), stateValidator()]],
      mailingZIP: ['', [Validators.minLength(5), Validators.maxLength(5), numberValidator()]]
    });
    parentForm.addControl(formName, this[formName]);
  }

  removeAddress(parentForm, formName) {
    parentForm.removeControl(formName);
  }

  addAddressValidation(parentForm, formName) {
    if (parentForm.get(`${formName}`)) {
      parentForm
        .get(`${formName}.mailingAddress`)
        .setValidators([Validators.required, alphanumericValidator(), Validators.maxLength(255)]);
      parentForm
        .get(`${formName}.mailingCity`)
        .setValidators([Validators.required, alphanumericValidator(), Validators.maxLength(255)]);
      parentForm
        .get(`${formName}.mailingState`)
        .setValidators([Validators.required, alphanumericValidator(), Validators.maxLength(2), stateValidator()]);
      parentForm
        .get(`${formName}.mailingZIP`)
        .setValidators([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(5),
          numberValidator(),
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
      areaCode: [null, [Validators.maxLength(3)]],
      extension: [null, [Validators.maxLength(6)]],
      number: [null, [Validators.maxLength(4)]],
      prefix: [null, [Validators.maxLength(3)]],
      tenDigit: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]]
    });
    parentForm.addControl('eveningPhone', eveningPhone);

    this.phoneChangeSubscribers(parentForm, 'eveningPhone');
  }

  phoneChangeSubscribers(parentForm, type) {
    parentForm.get(`${type}.tenDigit`).valueChanges.subscribe(value => {
      parentForm.patchValue({ [type]: { areaCode: value.substring(0, 3) } });
      parentForm.patchValue({ [type]: { prefix: value.substring(3, 6) } });
      parentForm.patchValue({ [type]: { number: value.substring(6, 10) } });
    });
  }

  removeAdditionalPhone(parentForm) {
    parentForm.removeControl('eveningPhone');
  }

  simpleRequireToggle(toggleField, dataField) {
    toggleField.valueChanges.subscribe(value => {
      this.updateValidators(dataField, value, 512);
    });
  }

  toggleSwitchRequire(toggleField, dataFieldOne, dataFieldTwo) {
    toggleField.valueChanges.subscribe(value => {
      this.updateValidators(dataFieldOne, !value, 255);
      this.updateValidators(dataFieldTwo, value, 255);
    });
  }

  toggleSwitchAdder(toggleSubFields, parentFieldName, parentForm) {
    toggleSubFields.forEach(subField => {
      this.simpleRequireToggle(
        parentForm.get(`${parentFieldName}.${subField.toggleField}`),
        parentForm.get(`${parentFieldName}.${subField.dataField}`)
      );
    });
  }

  updateValidators(dataField, validate, length = null) {
    if (dataField && validate && length) {
      dataField.setValidators([Validators.required, alphanumericValidator(), Validators.maxLength(length)]);
      dataField.updateValueAndValidity();
    } else {
      dataField.setValidators(null);
      dataField.updateValueAndValidity();
    }
  }

  /*
  ** Gets first invalid element and assigns id if id isn't set.
  */
  getInvalidElement(firstInvalidElement) {
    let element = this.doc.getElementById(firstInvalidElement.getAttribute('id'));
    if (!element) {
      const invalidClass = this.doc.getElementsByClassName(firstInvalidElement.getAttribute('class'));
      if (invalidClass) {
        invalidClass[0].setAttribute('id', 'temporaryId');
        element = this.doc.getElementById('temporaryId');
      }
    }
    return element;
  }

  setTemporaryIdToNull(invalidElement) {
    if (invalidElement && invalidElement.getAttribute('id') === 'temporaryId') {
      invalidElement.setAttribute('id', null);
    }
  }

  scrollToFirstError() {
    const invalidElements = document.querySelectorAll(
      'input.ng-invalid, select.ng-invalid, textarea.invalid, .usa-file-input.ng-invalid, .ng-untouched.required'
    );
    if (invalidElements.length !== 0) {
      const firstInvalidElement = invalidElements[0];
      firstInvalidElement.scrollIntoView();
      this.setTemporaryIdToNull(this.getInvalidElement(firstInvalidElement));
    }
    return;
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
      return (<any>Object).keys(formGroup.controls).some(control => {
        if (formGroup.controls[control].errors && formGroup.controls[control].touched) {
          return true;
        }
        if (control.controls) {
          this.loopChildControlsForErrors(<FormGroup>formGroup.controls[control]);
        }
      });
    }
    return;
  }

  setEditApplication(value: boolean) {
    this.editApplication = value;
  }

  getEditApplication() {
    return this.editApplication;
  }
}
