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
  showAdminNav = false;
  showSUDS = false;

  constructor(
    public authentication: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public util: UtilService,
    private winRef: WindowRef
  ) {}

  /**
   * Set message indicating user is being redirect to login.gov.
   * Redirect user to login.gov
   */
  login() {
    this.util.setLoginRedirectMessage();
    setTimeout(() => {
      this.winRef.getNativeWindow().location.href = environment.apiUrl + 'auth/login-gov/openid/login';
    }, 1000);
  }

  /**
   * Logout user and redirect to homepage.
   * Remove local storage items.
   */
  logout(e: Event) {
    e.preventDefault();
    const status = { message: 'You have successfully logged out of Forest Service permits.', header: '' };
    localStorage.setItem('status', JSON.stringify(status));
    localStorage.removeItem('requestingUrl');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.user = null;

    this.authentication.removeUser().subscribe(user => {
      if (user != null) {
        this.winRef.getNativeWindow().location.href = environment.apiUrl + 'auth/logout';
      } else {
        this.router.navigate(['/']);
      }
    });

  }

  /**
   * determine if SUDS login displays in header
   */
  setShowSUDS(user) {
    this.showSUDS = user && user.role === 'admin' && (!user.forests || user.forests.length === 0);
  }
  /**
   * Add user to route for display login on every NavigationEnd
   */
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
        this.setShowSUDS(this.user);
        this.displayLogin = data.displayLogin;
        this.showAdminNav = data.showAdmin;
      });
  }
}
