import { FormControl, ValidatorFn } from '@angular/forms';
import { min } from 'rxjs/operators';

export function lessThanOrEqualValidator(num, minNum = -99999): ValidatorFn {
  return (control: FormControl): { [key: string]: any } => {
    const val = control.value;
    if (val) {
      const phoneNumberRegex = /^(\d+)$/;
      const valid = phoneNumberRegex.test(val);
      if (val < minNum) {
        return { lessThanOrEqualFail: { number: num, minNumber: minNum } };
      }
      if (val > num) {
        return { lessThanOrEqualFail: { number: num, minNumber: minNum } };
      }
      if (!valid) {
        return { numberRequirement: true };;
      }
    } else {
      return { required: true };
    }
  };
}
