import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html'
})
export class ErrorMessageComponent {
  @Input() control: FormControl;
  @Input() id: string;
  @Input() name: string;

  parseErrors(errors) {
    let message = '';
    if (errors.email) {
      message += `${this.name} requires a valid email address. `;
    }
    if (errors.required) {
      message += `${this.name} is required. `;
    }
    if (errors.minlength) {
      message += `${this.name} requires a minimum of ${errors.minlength.requiredLength} characters. `;
    }
    if (errors.maxlength) {
      message += `${this.name} allows a maximum of ${errors.maxlength.requiredLength} characters. `;
    }
    if (errors.alphanumericRequirement) {
      message += `${this.name} requires at least one alphanumeric character. `;
    }
    if (errors.pattern && errors.pattern.requiredPattern === '^https?://.+$') {
      message += `${this.name} requires a valid URL and must include http://.`;
    }
    return message;
  }
}
