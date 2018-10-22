import { Component, Input } from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';

@Component({
  selector: 'app-button',
  templateUrl: './app-button.component.html'
})
export class AppButtonComponent {
  @Input() link: string;
  @Input() buttonText: string;
  @Input() btnAlt: false;

  constructor(public authentication: AuthenticationService) {}

  setRequestingUrl() {
    if (!this.authentication.user) {
      localStorage.setItem('requestingUrl', this.link);
    }
  }
}
