import { FormControl, ValidatorFn } from '@angular/forms';

export function httpsValidator(): ValidatorFn {
  return (control: FormControl): { [key: string]: any } => {
    const val = control.value;
    if (val && val.length) {
      const httpsRegex = /^https:?\/\/.+$/;
      const alphanumericRegex = /\w/;
      const whitespaceRegex = /\s/g;
      const valid = httpsRegex.test(val) && alphanumericRegex.test(val) && !whitespaceRegex.test(val);
      return valid ? null : { httpsRequirement: true };
    } else {
      return null;
    }
  };
}
