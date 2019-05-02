import { mergeMap, map, filter } from 'rxjs/operators';
import { AuthenticationService } from '../_services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { UtilService } from '../_services/util.service';

const LOGIN_URL = `${environment.apiUrl}auth/public/login`;
const LOGOUT_URL = `${environment.apiUrl}auth/logout`;

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
  specialUse = false;
  useRoute;

  constructor(
    public authentication: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public util: UtilService
  ) {}

  /**
   * Set message indicating user is being redirect to login.gov.
   * Redirect user to login.gov
   */
  login() {
    this.util.setLoginRedirectMessage();
    setTimeout(() => {
      this.util.navigateExternal(LOGIN_URL);
    }, 1000);
  }

  /**
   * Logout user and redirect to homepage.
   * Remove local storage items.
   */
  logout(e: Event) {

    e.preventDefault();
    const status = {
      message: 'You have successfully logged out of Forest Service permits.',
      header: ''
    };
    localStorage.setItem('status', JSON.stringify(status));
    localStorage.removeItem('requestingUrl');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.user = null;

    this.authentication.removeUser().subscribe(user => {
      if (user != null) {
        this.util.navigateExternal(LOGOUT_URL);
      } else {
        this.router.navigate(['/']);
      }
    });
    }

  /**
   * determine if SUDS login displays in header
   */
  setShowSUDS(user) {
    this.showSUDS =
      user &&
      user.role === 'admin' &&
      (!user.forests || user.forests.length === 0);
  }

  /**
   * determine user role, and display applications if correct role
   * set route for viewing applications
   */
  adminOrUser() {
    if ( this.user && (this.user.role === 'admin' || this.user.role === 'user') && this.specialUse) {
      return true;
    }
    return false;
  }

  setRoute(user) {
    user.role === 'admin' ? this.useRoute = '/admin/applications' : this.useRoute = '/user/applications';
  }

  /**
   * Add user to route for display login on every NavigationEnd
   */
  ngOnInit() {
    this.router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
        map(() => {
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
        }),
        mergeMap(route => route.data)
      )
      .subscribe(data => {
        this.user = data.user ? data.user : null;
        this.setShowSUDS(this.user);
        if (this.user) {
          this.setRoute(this.user);
        }
        this.displayLogin = data.displayLogin;
        this.showAdminNav = data.showAdmin;
        this.specialUse = data.specialUse;
      });
  }
}
