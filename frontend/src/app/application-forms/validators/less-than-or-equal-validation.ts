import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';
import { States } from '../../_models/constants';

export function lessThanOrEqualValidator(num): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const val = control.value;
    const numberRegex = /^(\d+)$/;
    const valid = numberRegex.test(val);
    if (valid && val <= num) {
      return null;
    } else {
      return { lessThanOrEqualFail: { number: num } };
    }
  };
}
