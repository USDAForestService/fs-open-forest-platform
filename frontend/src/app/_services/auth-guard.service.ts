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
    localStorage.removeItem('requestingUrl');
    const requestingUrl = route['_routeConfig'].path;
    const isAdminRoute = requestingUrl.split('/')[0] === 'admin';
    let authorized = false;
    if (user && user.email && user.role) {
      authorized = true;
      if (isAdminRoute && user.role === 'admin') {
        authorized = true;
      } else if (isAdminRoute && user.role !== 'admin') {
        authorized = false;
        this.navigate(['/access-denied']);
      }
    } else if (isAdminRoute) {
      localStorage.setItem('requestingUrl', requestingUrl);
      this.redirect(environment.apiUrl + 'auth/usda-eauth/saml/login');
    } else {
      localStorage.setItem('requestingUrl', requestingUrl);
      this.redirect(environment.apiUrl + 'auth/login-gov/openid/login');
    }
    return authorized;
  }

  navigate(route) {
    this.router.navigate(route);
  }

  redirect(url) {
    window.location.href = url;
  }
}
