import { Component, Input } from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';

@Component({
  selector: 'app-button',
  templateUrl: './app-button.component.html'
})
export class AppButtonComponent {
  @Input() link: string;
  @Input() buttonText: string;

  constructor(public authentication: AuthenticationService) {}
}
