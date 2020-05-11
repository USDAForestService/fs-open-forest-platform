import { FormControl, ValidatorFn } from '@angular/forms';

export function phoneNumberMinMaxValidator(): ValidatorFn {
  return (control: FormControl): { [key: string]: any } => {
    const val = control.value;
    if (val && val.length) {
      const phoneNumberRegex = /^[0-9]*$/;
      const valid = phoneNumberRegex.test(val);
      if (!valid) {
        return {numberRequirement: true};
      }
      if (valid && val.length < 10) {
        return {phoneNumberMinRequirement: true};
      }
      if (valid && val.length > 10) {
        return {phoneNumberMaxRequirement: true};
      }
      else {
        return null;
      }
    }
  };
}

