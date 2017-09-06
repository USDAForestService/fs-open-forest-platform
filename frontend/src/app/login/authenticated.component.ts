import { AuthenticationService } from '../_services/authentication.service';
import { AuthGuard } from '../_services/auth.guard';
import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authenticated',
  templateUrl: './authenticated.component.html'
})
export class AuthenticatedComponent {
  @Input() userEmail: string;

  constructor(
    private authenticationService: AuthenticationService,
    private authGuard: AuthGuard,
    private router: Router
  ) {}

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['']);
  }
}
