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

    let isAuthenticated = this.authentication.getAuthenticatedUser().subscribe((user: any) => {
      if (user) {
        if (isAdminRoute && user.role === 'admin') {
          return true;
        } else if (isAdminRoute && user.role !== 'admin') {
          return false;
        }
        return true;
      } else if (isAdminRoute) {
        //admin login
        window.location.href = environment.apiUrl + 'auth/eauth/login';
      } else {
        window.location.href = environment.apiUrl + 'auth/login-gov/openid/login';
      }
      return false;
    });
    console.log(isAuthenticated);
    return isAuthenticated ? true : false;
  }
}
