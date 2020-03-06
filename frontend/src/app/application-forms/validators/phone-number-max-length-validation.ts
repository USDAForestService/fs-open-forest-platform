import { FormControl, ValidatorFn } from '@angular/forms';

export function phoneNumberMaxValidator(): ValidatorFn {
  return (control: FormControl): { [key: string]: any } => {
    const val = control.value;
    if (val && val.length) {
      const phoneNmbrRegex = /^[0-9-]{2,}[0-9]$/;
      let isTenOrLess = false;
      if (val.length > 10){
        isTenOrLess = true;
      }
      const valid = phoneNmbrRegex.test(val) && isTenOrLess === false;
      return valid ? null : { phoneNumberMaxRequirement: true };
    } else {
      return null;
    }
  };
}
