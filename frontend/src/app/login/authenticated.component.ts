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
  @Input() userEmail: string;
  @Output() status: EventEmitter<any> = new EventEmitter<any>();

  constructor(private authenticationService: AuthenticationService, private router: Router, private http: Http) {}

  login() {
    window.location.href = environment.apiUrl + 'auth/login-gov/openid/login';
  }

  logout(e: Event) {
    e.preventDefault();
    this.authenticationService.logout().subscribe(() => {
      this.status.emit({ message: 'You have successfully logged out of Forest Service permits.', header: '' });
      this.userEmail = '';
      this.router.navigate(['']);
    });
  }
}
