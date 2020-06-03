import { FormControl, ValidatorFn } from '@angular/forms';

export function patternValidator(): ValidatorFn {
  return (control: FormControl): { [key: string]: any } => {
    const val = control.value;
    if (val && val.length) {
      const urlRegex = /^(https?:\/\/)?\S+(\.\S+)+/;
      const alphanumericRegex = /\w/;
      const whitespaceRegex = /\s/g;
      const valid = urlRegex.test(val) && alphanumericRegex.test(val) && !whitespaceRegex.test(val);
      return valid ? null : { urlRequirement: true };
    } else {
      return null;
    }
  };
}