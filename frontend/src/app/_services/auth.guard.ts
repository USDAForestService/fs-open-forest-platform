import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authentication: AuthenticationService) {}

  canActivate(route: ActivatedRouteSnapshot) {
    let isLoggedInToFrontend = false;
    this.authentication.getAuthenticatedUser().subscribe((email: any) => {
      if (email) {
        isLoggedInToFrontend = true;
      }
    });
    const requestingUrl = route['_routeConfig'].path;
    localStorage.setItem('requestingUrl', requestingUrl);
    if (requestingUrl.split('/')[0] === 'admin') {
      if (localStorage.getItem('adminUser')) {
        return true;
      }
      this.router.navigate(['/login', 'admin']);
      return false;
    } else {
      if (isLoggedInToFrontend) {
        return true;
      }
      this.router.navigate(['https://fs-intake-api-login-test.app.cloud.gov/auth/login-gov/openid/login']);
      return false;
    }
  }

  isLoggedIn() {
    if (localStorage.getItem('currentUser')) {
      return true;
    }
    return false;
  }

  isAdmin() {
    if (localStorage.getItem('adminUser')) {
      return true;
    }
    return false;
  }
}
