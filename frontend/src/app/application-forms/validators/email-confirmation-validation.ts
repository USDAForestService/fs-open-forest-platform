import { AbstractControl, FormGroup, ValidatorFn, ValidationErrors } from '@angular/forms';

export function emailConfirmationValidator(emailControl: string, confirmControl: string): ValidatorFn {
  return (control: FormGroup): ValidationErrors | null => {
    const email = control.get(emailControl);
    const confirm = control.get(confirmControl);
    return email && confirm && email.value !== confirm.value ? { 'emailConfirmationRequirement': true } : null;
  };
}
