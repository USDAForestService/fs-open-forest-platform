import { AbstractControl, ValidatorFn } from '@angular/forms';

export function numberValidator(allowDash: boolean = false): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    if (allowDash) {
      const val = control.value;
      if (val && val.length) {
        const numberRegex = /^[\d -\/]+$/;
        const valid = numberRegex.test(val);
        return valid ? null : { numberDashSlashRequirement: true };
      } else {
      return null;
      }
    } else {
      const val = control.value;
      if (val && val.length) {
        const numberRegex = /^\d+$/;
        const valid = numberRegex.test(val);
        return valid ? null : { numberRequirement: true };
      } else {
        return null;
      }
    }
  };
}
