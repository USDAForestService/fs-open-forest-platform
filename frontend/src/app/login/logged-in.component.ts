import { AuthenticationService } from '../_services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-logged-in',
  template: ''
})
export class LoggedInComponent implements OnInit {
  constructor(private router: Router, private authentication: AuthenticationService) {}

  ngOnInit() {
    const requestingUrl = localStorage.getItem('requestingUrl');
    const user = this.authentication.getUser();

    if (requestingUrl) {
      localStorage.removeItem('requestingUrl');
      this.router.navigate([requestingUrl]);
    } else if (user.role === 'admin') {
      this.router.navigate(['/admin/applications']);
    } else {
      this.router.navigate(['/']);
    }
  }
}
