import { FormControl, ValidatorFn } from '@angular/forms';

export function numberOfCordsValidator(num, minNum = -99999): ValidatorFn {
  return (control: FormControl): { [key: string]: any } => {
    const val = control.value;
    if (val) {
      const numberRegex = /^(\d+)$/;
      const valid = numberRegex.test(val);
      if (val < minNum) {
        return { lessThanOrEqualFail: { number: num, minNumber: minNum } };
      }
      if (val > num) {
        return { lessThanOrEqualFail: { number: num, minNumber: minNum } };
      }
      if (!valid) {
        return { numberRequirement: true };
      }
    } else {
      return { required: true };
    }
  };
}
