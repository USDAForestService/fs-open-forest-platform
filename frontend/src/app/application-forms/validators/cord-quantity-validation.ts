import { FormControl, ValidatorFn } from '@angular/forms';

export function cordQuantityValidator(minCords, maxCords): ValidatorFn {
  return (control: FormControl): { [key: string]: any } => {
    const val = control.value;
    if (val && val.length) {
      const numberRegex = /^[0-9]*$/;
      const valid = numberRegex.test(val);
      if (!valid) {
        return {phoneNumberRequirement: true};
      }
      if (valid && val < minCords) {
        return {phoneNumberMinRequirement: true};
      }
      if (valid && val > maxCords) {
        return {phoneNumberMaxRequirement: true};
      }
        return null;
    }
  };
}

