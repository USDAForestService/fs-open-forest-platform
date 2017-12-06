import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html'
})
export class ErrorMessageComponent {
  @Input() control: FormControl;
  @Input() fieldId: string;
  @Input() name: string;

  errorOptions: any = {
    required: {
      message: 'is required. '
    },
    email: {
      message: 'requires a valid email address. '
    },
    minlength: {
      message: 'requires a minimum of ',
      requiredLength: ' characters. '
    },
    maxlength: {
      message: 'allows a maximum of ',
      requiredLength: ' characters. '
    },
    alphanumericRequirement: {
      message: 'requires at least one alphanumeric character. '
    },
    applicationTypeRequirement: {
      message: 'has an incorrect application type. '
    },
    numberRequirement: {
      message: 'allows numbers only. '
    },
    stateRequirement: {
      message: 'requires a valid capitalized state abbreviation. '
    },
    urlRequirement: {
      message: 'requires a valid URL. '
    },
    currencyRequirement: {
      message: 'requires a format like 0.00. '
    },
    lessThanOrEqualFail: {
      message: 'must have a value less than or equal to ',
      number: '. '
    }
  };

  parseErrors(errors) {
    let message = '';
    if (errors) {
      for (const error in errors) {
        if (this.errorOptions[error] && this.errorOptions[error]['message']) {
          message += `${this.name} ${this.errorOptions[error]['message']}`;
          for (const option in errors[error]) {
            if (this.errorOptions[error] && this.errorOptions[error][option]) {
              message += `${errors[error][option]}${this.errorOptions[error][option]}`;
            }
          }
        }
      }
      if (errors && errors.pattern && errors.pattern.requiredPattern === '^https?://.+$') {
        message += `${this.name} requires a valid URL and must include http://.`;
      }
    }
    return message;
  }
}
