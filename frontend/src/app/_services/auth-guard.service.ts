import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authentication: AuthenticationService) {}

  canActivate(route: ActivatedRouteSnapshot) {
    return this.authentication.getAuthenticatedUser().map((user: any) => {
      return this.validateUser(user, route);
    });
  }

  validateUser(user, route) {
    const requestingUrl = route['_routeConfig'].path;
    localStorage.setItem('requestingUrl', requestingUrl);
    const isAdminRoute = requestingUrl.split('/')[0] === 'admin';
    let authorized = false;
    if (user && user.email && user.role) {
      authorized = true;
      if (isAdminRoute && user.role === 'admin') {
        authorized = true;
      } else if (isAdminRoute && user.role !== 'admin') {
        authorized = false;
      }
    } else if (isAdminRoute) {
      this.redirect(environment.apiUrl + 'auth/eauth/login');
    } else {
      this.redirect(environment.apiUrl + 'auth/login-gov/openid/login');
    }
    return authorized;
  }

  redirect(url) {
    window.location.href = url;
  }
}
