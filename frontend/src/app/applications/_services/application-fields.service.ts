import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Injectable()
export class ApplicationFieldsService {

  constructor(private formBuilder: FormBuilder) {}

  addAddress(parentForm, formName) {
     this[formName] = this.formBuilder.group({
       mailingAddress: ['', [Validators.required]],
       mailingAddress2: [''],
       mailingCity: ['', [Validators.required]],
       mailingState: ['', [Validators.required]],
       mailingZIP: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
     });
     parentForm.addControl(formName, this[formName]);
  }

  removeAddress(parentForm, formName) {
    parentForm.removeControl(formName);
  }

  simpleRequireToggle(toggleField, dataField) {
    toggleField.valueChanges.subscribe(value => {
      if (value) {
        dataField.setValidators(Validators.required);
      } else {
        dataField.setValidators(null);
      }
    });
  }
}
