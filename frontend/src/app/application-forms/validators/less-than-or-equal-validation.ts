import { AbstractControl, ValidatorFn } from '@angular/forms';

export function lessThanOrEqualValidator(num, minNum = -99999): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const val = control.value;
    const numberRegex = /^(\d+)$/;
    const valid = numberRegex.test(val);

    if (valid && val <= num) {
      if (val < minNum) {
        return { lessThanOrEqualFail: { number: num, minNumber: minNum } };
      } else {
        return null;
      }
    } else {
      return { lessThanOrEqualFail: { number: num, minNumber: minNum } };
    }
  };
}
