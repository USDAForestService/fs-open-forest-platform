import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { environment } from '../../environments/environment';
import { UtilService } from './util.service';

@Injectable()
export class AccessControlService implements CanActivate {
  constructor(private router: Router, private authentication: AuthenticationService, public util: UtilService) {}

  /**
   * Determine if user can access the route
   * @param route  Requested route.
   * @returns      boolean
   */
  canActivate(route: ActivatedRouteSnapshot) {
    // force login and dont use cached user for authenticated routes
    return this.authentication.getAuthenticatedUser(true).map((user: any) => {
      return this.validateUser(user, route);
    });
  }

  /**
   * Get user role, and determine if they have access to the route, if not send to access denied page.
   * If route requires authenticated and user is not authenticated, send to authentication.
   * @param user  Current user.
   * @param route  Requested route.
   * @returns      boolean
   */
  validateUser(user, route) {
    localStorage.removeItem('requestingUrl');
    const requestingUrl = window.location.pathname;
    let isAdminRoute = false;
    if (route.data) {
      isAdminRoute = route.data.admin;
    }
    let authorized = false;
    if (user && user.role) {
      authorized = true;
      if (isAdminRoute && user.role !== 'admin') {
        authorized = false;
        this.navigate(['/access-denied']);
      }
    } else {
      this.sendToAuthentication(isAdminRoute, requestingUrl);
    }
    return authorized;
  }

  /**
   * Send user to correct authentication url based on route type, admin vs. basic
   * @param isAdminRoute
   * @param requestingUrl
   */
  sendToAuthentication(isAdminRoute: boolean, requestingUrl: string) {
    localStorage.setItem('requestingUrl', requestingUrl);
    let authEndpoint = 'login-gov/openid/login';
    if (isAdminRoute) {
      authEndpoint = 'usda-eauth/saml/login';
    }
    this.util.setLoginRedirectMessage();
    setTimeout(() => {
      this.redirect(environment.apiUrl + 'auth/' + authEndpoint);
    }, 1000);
  }

  /**
   * Navigate to route
   */
  navigate(route) {
    this.router.navigate(route);
  }

  /**
   * Redirect to url
   */
  redirect(url) {
    window.location.href = url;
  }
}
