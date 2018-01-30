import { AuthenticationService } from '../_services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logged-in',
  template: ''
})
export class LoggedInComponent implements OnInit {
  constructor(private router: Router, private authentication: AuthenticationService) {}

  ngOnInit() {
    this.authentication.getAuthenticatedUser().subscribe((user: any) => {
      const requestingUrl = localStorage.getItem('requestingUrl');

      if (user) {
        this.authentication.setUser(user);
      }

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
