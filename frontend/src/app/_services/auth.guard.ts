import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authentication: AuthenticationService) {}

  canActivate(route: ActivatedRouteSnapshot) {
    const requestingUrl = route['_routeConfig'].path;
    localStorage.setItem('requestingUrl', requestingUrl);

    let isAdminRoute = requestingUrl.split('/')[0] === 'admin';

    let authorized = false;

    return this.authentication.getAuthenticatedUser().map((user: any) => {
      if (user) {
        authorized = true;
        if (isAdminRoute && user.role === 'admin') {
          authorized = true;
        } else if (isAdminRoute && user.role !== 'admin') {
          authorized = false;
        }
      } else if (isAdminRoute) {
        //admin login
        window.location.href = environment.apiUrl + 'auth/eauth/login';
      } else {
        window.location.href = environment.apiUrl + 'auth/login-gov/openid/login';
      }
      return authorized;
    });
  }
}
