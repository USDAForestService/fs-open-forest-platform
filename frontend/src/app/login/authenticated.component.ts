import { AuthenticationService } from '../_services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-authenticated',
  templateUrl: './authenticated.component.html'
})
export class AuthenticatedComponent implements OnInit {
  constructor(public authentication: AuthenticationService, private activatedRoute: ActivatedRoute, private router: Router) {}

  private requiresLogin = true;

  login() {
    window.location.href = environment.apiUrl + 'auth/login-gov/openid/login';
  }

  logout(e: Event) {
    e.preventDefault();
    const status = { message: 'You have successfully logged out of Forest Service permits.', header: '' };
    localStorage.setItem('status', JSON.stringify(status));
    localStorage.removeItem('requestingUrl');
    localStorage.removeItem('token');
    this.authentication.removeUser();
    window.location.href = environment.apiUrl + 'auth/logout';
  }

  ngOnInit() {
    this.router
      .events
      .filter(e => e instanceof NavigationEnd)
      .map(() => {
        let route = this.activatedRoute.firstChild;
        let child = route;

        while (child) {
          if (child.firstChild) {
            child = child.firstChild;
            route = child;
          } else {
            child = null;
          }
        }

        return route;
      })
      .mergeMap(route => route.data)
      .subscribe(data => {
        this.requiresLogin = data.requireLogin
      });
  }
}
