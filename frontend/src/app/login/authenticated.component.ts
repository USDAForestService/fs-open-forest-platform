import { AuthenticationService } from '../_services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { WindowRef } from '../_services/native-window.service';
import { UtilService } from '../_services/util.service';

@Component({
  selector: 'app-authenticated',
  templateUrl: './authenticated.component.html'
})
export class AuthenticatedComponent implements OnInit {
  displayLogin = true;
  userIdentifier;
  user;

  constructor(
    public authentication: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public util: UtilService,
    private winRef: WindowRef
  ) {}

  login() {
    this.util.setLoginRedirectMessage();
    setTimeout(() => {
      window.location.href = environment.apiUrl + 'auth/login-gov/openid/login';
    }, 1000);
  }

  logout(e: Event) {
    e.preventDefault();
    const status = { message: 'You have successfully logged out of Forest Service permits.', header: '' };
    localStorage.setItem('status', JSON.stringify(status));
    localStorage.removeItem('requestingUrl');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.authentication.removeUser();
    this.user = null;
    this.winRef.getNativeWindow().location.href = environment.apiUrl + 'auth/logout';
  }

  formatUserIdentifier(user) {
    if(user.role === 'admin') {
      return this.user.eauthId.toLowerCase().replace("_", " ").replace(/\b\w/g, first => first.toLocaleUpperCase());
    } else {
      return this.user.email;
    }
  }

  ngOnInit() {
    this.router.events
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
        this.user = data.user ? data.user : null;
        this.userIdentifier = this.formatUserIdentifier(this.user);
        this.displayLogin = data.displayLogin;
      });
  }
}
