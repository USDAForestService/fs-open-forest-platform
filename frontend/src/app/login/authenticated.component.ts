import { AuthenticationService } from '../_services/authentication.service';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';

@Component({
  selector: 'app-authenticated',
  templateUrl: './authenticated.component.html'
})
export class AuthenticatedComponent {
  constructor(public authentication: AuthenticationService, private router: Router, private http: Http) {}

  login() {
    window.location.href = environment.apiUrl + 'auth/login-gov/openid/login';
  }

  logout(e: Event) {
    e.preventDefault();
    const status = { message: 'You have successfully logged out of Forest Service permits.', header: '' };
    localStorage.setItem('status', JSON.stringify(status));
    localStorage.removeItem('requestingUrl');
    this.authentication.removeUser();
    window.location.href = environment.apiUrl + 'auth/logout';
  }
}
