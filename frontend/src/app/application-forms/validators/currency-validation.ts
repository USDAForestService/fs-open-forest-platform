import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';

export function currencyValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const val = control.value;
    if (val && val.length) {
      const currencyRegex = /^\d+(\.\d{2})?$/;
      const valid = currencyRegex.test(val);
      return valid ? null : { currencyRequirement: true };
    } else {
      return null;
    }
  };
}
