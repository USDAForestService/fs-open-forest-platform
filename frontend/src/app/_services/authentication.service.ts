import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { UtilService } from './util.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticationService {
  private endpoint = environment.apiUrl;
  user: any;

  constructor(private http: HttpClient, public util: UtilService) {}

  /**
   * Get the authenticated user.
   * @returns      User, if user exists
   */
  getAuthenticatedUser(doLogin = false) {
    const user = this.getUser();

    if (doLogin) {
      return this.isAuthenticated().map(
        (result: any) => {
          if (result) {
            this.setUser(result);
            return this.getUser();
          } else {
            this.removeUser();
          }
        },
        (e: any) => {
          this.removeUser();
          console.error(e);
        }
      );
    } else if (user) {
        return Observable.of(user);
    } else {
      return Observable.of(null); // no user but don't login
    }
  }

  /**
   * Check if user is admin.
   */
  isAdmin() {
    return this.user.role === 'admin';
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    return this.http.get(this.endpoint + 'auth/user', { withCredentials: true }).catch(this.util.handleError);
  }

  /**
   * Return user if user is set, or try to get user from local storage
   */
  getUser() {
    if (this.user) {
      return this.user;
    } else {
      // check local storage
      try {
        this.user = JSON.parse(localStorage.getItem('user'));
        return this.user;
      } catch (e) {
        return null;
      }
    }
  }

  /**
   * Set the user to current scope and local storage.
   */
  setUser(user) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  /**
   * Remove user from scope and local storage.
   */
  removeUser() {
    this.user = null;
    return this.isAuthenticated().map(user => {
      if (user) {
        localStorage.removeItem('user');
      }
      return user;
    });


  }
}
