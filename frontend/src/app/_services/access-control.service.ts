
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { environment } from '../../environments/environment';
import { UtilService } from './util.service';

const LOGIN_URL = `${environment.apiUrl}auth/public/login`;

@Injectable()
export class AccessControlService implements CanActivate {
  constructor(private authentication: AuthenticationService, public util: UtilService) {}

  /**
   * Determine if user can access the route
   * @returns boolean
   */
  canActivate() {
    // force login and dont use cached user for authenticated routes
    return this.authentication.getAuthenticatedUser(true).pipe(map((user: any) => {
      return this.validateUser(user);
    }));
  }

  /**
   * Get user role, and determine if they have access to the route, if not, send to authentication.
   * @param user  Current user.
   * @returns      boolean
   */
  validateUser(user) {
    localStorage.removeItem('requestingUrl');

    if (user && user.role === 'user') {
      return true;
    }

    this.sendToAuthentication();
    return false;
  }

  /**
   * Send user to authentication url
   */
  sendToAuthentication() {
    const requestingUrl = window.location.pathname;
    localStorage.setItem('requestingUrl', requestingUrl);
    this.util.setLoginRedirectMessage();
    setTimeout(() => {
      this.util.navigateExternal(LOGIN_URL);
    }, 1000);
  }
}
