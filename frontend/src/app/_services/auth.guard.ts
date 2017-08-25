import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

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
      if (localStorage.getItem('currentUser')) {
        return true;
      }
      this.router.navigate(['/login', 'user']);
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
