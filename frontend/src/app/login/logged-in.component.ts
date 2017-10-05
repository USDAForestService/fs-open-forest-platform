import { AuthenticationService } from '../_services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-logged-in',
  template: ''
})
export class LoggedInComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authentication: AuthenticationService
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      localStorage.setItem('token', params['token']);
    });

    this.authentication.getAuthenticatedUser().subscribe((user: any) => {
      const requestingUrl = localStorage.getItem('requestingUrl');
      if (requestingUrl) {
        localStorage.removeItem('requestingUrl');
        return this.router.navigate([requestingUrl]);
      } else if (user.role === 'admin') {
        this.router.navigate(['/admin/applications']);
      } else {
        this.router.navigate(['/']);
      }
    });
  }
}
