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
    if (errors && errors.email) {
      message += `${this.name} requires a valid email address. `;
    }
    if (errors && errors.required) {
      message += `${this.name} is required. `;
    }
    if (errors && errors.minlength) {
      message += `${this.name} requires a minimum of ${errors.minlength.requiredLength} characters. `;
    }
    if (errors && errors.maxlength) {
      message += `${this.name} allows a maximum of ${errors.maxlength.requiredLength} characters. `;
    }
    if (errors && errors.alphanumericRequirement) {
      message += `${this.name} requires at least one alphanumeric character. `;
    }
    if (errors && errors.applicationTypeRequirement) {
      message += `${this.name} has an incorrect application type. `;
    }
    if (errors && errors.numberRequirement) {
      message += `${this.name} allows numbers only. `;
    }
    if (errors && errors.stateRequirement) {
      message += `${this.name} requires a valid capitalized state abbreviation. `;
    }
    if (errors && errors.urlRequirement) {
      message += `${this.name} requires a valid URL. `;
    }
    if (errors && errors.currencyRequirement) {
      message += `${this.name} requires a format like 0.00. `;
    }
    if (errors && errors.lessThanOrEqualFail) {
      message += `${this.name} must have a value less than or equal to ${errors.lessThanOrEqualFail.number}. `;
    }
    if (errors && errors.pattern && errors.pattern.requiredPattern === '^https?://.+$') {
      message += `${this.name} requires a valid URL and must include http://.`;
    }
    return message;
  }
}
