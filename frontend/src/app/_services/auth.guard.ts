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
    if (requestingUrl.split('/')[0] === 'admin') {
      if (localStorage.getItem('adminUser')) {
        return true;
      }
      this.router.navigate(['/login', 'admin']);
      return false;
    } else {
      let IsAuthenticated = this.authentication.getAuthenticatedUser().subscribe((email: any) => {
        if (email) {
          return true;
        } else {
          window.location.href = environment.apiUrl + 'auth/login-gov/openid/login';
          return false;
        }
      });
      return IsAuthenticated ? true : false;
    }
  }
}
