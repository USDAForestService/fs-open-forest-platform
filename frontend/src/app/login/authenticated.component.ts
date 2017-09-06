import { AuthenticationService } from '../_services/authentication.service';
import { AuthGuard } from '../_services/auth.guard';
import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

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

  login() {
    window.location.href = environment.apiUrl + 'auth/login-gov/openid/login';
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['']);
  }
}
