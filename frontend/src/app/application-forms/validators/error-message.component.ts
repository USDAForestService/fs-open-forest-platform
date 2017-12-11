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

  parseErrors(errors) {
    let message = '';
    if (errors) {
      for (const error in errors) {
        if (typeof this[error] === 'function') {
          message += this[error](errors);
        }
      }
    }
    return message;
  }

  email(errors) {
    return `${this.name} requires a valid email address. `;
  }

  required(errors) {
    return `${this.name} is required. `;
  }

  minlength(errors) {
    return `${this.name} requires a minimum of ${errors.minlength.requiredLength} characters. `;
  }

  maxlength(errors) {
    return `${this.name} allows a maximum of ${errors.maxlength.requiredLength} characters. `;
  }

  alphanumericRequirement(errors) {
    return `${this.name} requires at least one alphanumeric character. `;
  }

  applicationTypeRequirement(errors) {
    return `${this.name} has an incorrect application type. `;
  }

  numberRequirement(errors) {
    return `${this.name} allows numbers only. `;
  }

  stateRequirement(errors) {
    return `${this.name} requires a valid capitalized state abbreviation. `;
  }

  urlRequirement(errors) {
    return `${this.name} requires a valid URL. `;
  }

  currencyRequirement(errors) {
    return `${this.name} requires a format like 0.00. `;
  }

  lessThanOrEqualFail(errors) {
    return `${this.name} must have a value less than or equal to ${errors.lessThanOrEqualFail.number}. `;
  }

  pattern(errors) {
    if (errors.pattern.requiredPattern === '^https?://.+$') {
      return `${this.name} requires a valid URL and must include http://.`;
    }
  }
}
