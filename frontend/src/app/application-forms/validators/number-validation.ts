import { AbstractControl, ValidatorFn } from '@angular/forms';

export function numberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const val = control.value;
    if (val && val.length) {
      const numberRegex = /^\d+$/;
      const valid = numberRegex.test(val);
      return valid ? null : { numberRequirement: true };
    } else {
      return null;
    }
  };
}
