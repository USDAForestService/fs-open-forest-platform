import { AuthenticationService } from '../_services/authentication.service';
import { AuthGuard } from '../_services/auth.guard';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html'
})
export class LogoutComponent implements OnInit {
  isAuthenticated: boolean;

  constructor(private authenticationService: AuthenticationService, private authGuard: AuthGuard) {}

  ngOnInit() {
    this.isAuthenticated = this.authGuard.isLoggedIn();
  }

  logout() {
    this.authenticationService.logout();
    this.isAuthenticated = this.authGuard.isLoggedIn();
  }
}
