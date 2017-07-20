import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';

export function alphanumericValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const val = control.value;
    const alphanumericRegex = /\w/;
    const valid = alphanumericRegex.test(val);
    return valid ? null : { alphanumericRequirement: true };
  };
}
