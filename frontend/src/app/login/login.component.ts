import { AuthenticationService } from '../_services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  user: FormGroup;

  constructor(private authenticationService: AuthenticationService, private formBuilder: FormBuilder) {
    this.user = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {}

  login() {
    this.authenticationService.login(this.user.get('username').value, this.user.get('password').value);
  }
}
