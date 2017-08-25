import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot) {
    const requestingUrl = route['_routeConfig'].path;
    localStorage.setItem('requestingUrl', requestingUrl);

    if (localStorage.getItem('currentUser')) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

  isLoggedIn() {
    if (localStorage.getItem('currentUser')) {
      return true;
    }
    return false;
  }
}
