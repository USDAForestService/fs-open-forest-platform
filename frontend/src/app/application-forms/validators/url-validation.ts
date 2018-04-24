import { AbstractControl, ValidatorFn } from '@angular/forms';

export function urlValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
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
