import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

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
      message = this.appendErrorToMessage(errors, message);
    }
    return message;
  }

  private appendErrorToMessage(errors, message) {
    for (const error in errors) {
      if (typeof this[error] === 'function') {
        message += this[error](errors);
      }
    }
    return message;
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

  numberDashSlashRequirement(errors) {
    return `${this.name} allows numbers, dashes, and slashes only. `;
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
    return `${this.name} must have a value greater than or equal to ${
      errors.lessThanOrEqualFail.minNumber
    } and less than or equal to ${errors.lessThanOrEqualFail.number}. `;
  }

  minMaxCordsFail(errors) {
    return `${this.name} must be between ${errors.minMaxCordsFail.minNumber} and ${errors.minMaxCordsFail.number} cords.`;
  }

  min(errors) {
    return `${this.name} must have a value greater than or equal to ${errors.min.min}. `;
  }

  max(errors) {
    return `${this.name} must have a value less than or equal to ${errors.max.max}. `;
  }

  startDateAfterEndDate(errors) {
    return `Start date and time must be before end date and time. `;
  }

  startDateInFuture(errors) {
    return `Start date and time must be in the future. `;
  }

  invalidDate(errors) {
    return `${this.name} is invalid. `;
  }

  notEnoughAttendees(errors) {
    return `It appears you have entered fewer than 75 total attendees. For fewer than 75 people, a permit is not required. Contact your local office for more information.`;
  }

  emailConfirmationRequirement(errors) {
    return `Email confirmation does not match email.`;
  }

  pattern(errors) {
    let result = '';
    if (errors.pattern.requiredPattern === '^https?://.+$') {
      result = `${this.name} requires a valid URL and must include http://.`;
    } else if (errors.pattern.requiredPattern === '^(0?[1-9]|1[0-9]|2[0-9]|3[01])$') {
      result = `${this.name} requires a 1 or 2 digit number. `;
    } else if (errors.pattern.requiredPattern === '^(0?[1-9]|1[012])$') {
      result = `${this.name} requires a 1 or 2 digit number that is less than 13. `;
    } else if (errors.pattern.requiredPattern === '^([0-9]{4})$') {
      result = `${this.name} requires a 4 digit number. `;
    } else if (errors.pattern.requiredPattern === '/^[0-9]{8}$/') {
      result = `${this.name} requires an 8 digit number. `;
    } else if (errors.pattern.requiredPattern === '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$') {
      result = `${this.name} requires a valid email address— i.e. you@email.com `;
    }
    return result;
  }

  phoneNumberMinRequirement(errors) {
    return `${this.name} requires a minimum of 10 characters. ex: 5551234567`;
  }

  phoneNumberMaxRequirement(errors) {
  return `${this.name} allows a maximum of 10 characters. ex: 5551234567`;
  }

}
