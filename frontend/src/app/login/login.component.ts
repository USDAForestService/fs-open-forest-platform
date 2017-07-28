import { AuthenticationService } from '../_services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  user: FormGroup;
  referrer: string;

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.user = this.formBuilder.group({
      username: ['username', [Validators.required]],
      password: ['password', [Validators.required]]
    });
  }

  ngOnInit() {
    console.log(document.referrer);
  }

  login() {
    this.authenticationService.login(this.user.get('username').value, this.user.get('password').value);
    this.router.navigate([localStorage.getItem('requestingUrl')]);
  }
}
