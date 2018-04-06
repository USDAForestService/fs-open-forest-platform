import { AbstractControl, ValidatorFn } from '@angular/forms';
import { States } from '../../_models/constants';

export function stateValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const val = control.value;
    if (val && val.length) {
      for (const state of States) {
        if (state.short === val) {
          return null;
        }
      }
      return { stateRequirement: true };
    } else {
      return null;
    }
  };
}
