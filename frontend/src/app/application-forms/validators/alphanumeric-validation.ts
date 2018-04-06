import { AbstractControl, ValidatorFn } from '@angular/forms';

export function alphanumericValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const val = control.value;
    if (val && val.length) {
      const alphanumericRegex = /\w/;
      const valid = alphanumericRegex.test(val);
      return valid ? null : { alphanumericRequirement: true };
    } else {
      return null;
    }
  };
}
