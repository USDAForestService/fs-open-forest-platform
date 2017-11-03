import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';
import { States } from '../../_models/constants';

export function stateValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const val = control.value;
    if (val && val.length) {
      const states = States;
      for (let state of states) {
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
