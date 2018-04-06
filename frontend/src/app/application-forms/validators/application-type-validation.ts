import { AbstractControl, ValidatorFn } from '@angular/forms';

export function applicationTypeValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const val = control.value;
    if (val && val.length) {
      const types = ['tempOutfitters', 'noncommercial'];
      const valid = types.indexOf(val) !== -1;
      return valid ? null : { applicationTypeRequirement: true };
    } else {
      return null;
    }
  };
}
