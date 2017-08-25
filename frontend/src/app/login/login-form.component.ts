import { AuthenticationService } from '../_services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent implements OnInit {
  user: FormGroup;
  referrer: string;
  type: string;

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {

    this.user = this.formBuilder.group({
      username: ['username', [Validators.required]],
      password: ['password', [Validators.required]]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.type = params['type'];
    });
  }

  login() {
    this.authenticationService.login(this.user.get('username').value, this.user.get('password').value, this.type);
    this.router.navigate([localStorage.getItem('requestingUrl')]);
  }
}
