import { AuthenticationService } from '../_services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logged-in',
  template: ''
})
export class LoggedInComponent implements OnInit {
  constructor(private router: Router, private authentication: AuthenticationService) {}

  /**
   * Redirect to the requesting url after login.
   * Redirect to /admin/applications if admin user and no requesting url
   * Redirect to homepage if no requesting url and are typical user
   */
  ngOnInit() {
    this.authentication.getAuthenticatedUser(true).subscribe((user: any) => {
      const requestingUrl = localStorage.getItem('requestingUrl');
      if (requestingUrl) {
        localStorage.removeItem('requestingUrl');
        return this.router.navigate([requestingUrl]);
      } else if (user && user.role === 'admin') {
        this.router.navigate(['/admin/applications']);
      } else {
        this.router.navigate(['/']);
      }
    });
  }
}
