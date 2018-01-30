import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { ActivatedRoute, CanActivate, Router } from '@angular/router';
import { UtilService } from './util.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticationService {
  private endpoint = environment.apiUrl;
  user: any;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, public util: UtilService) {}

  getAuthenticatedUser(doLogin = true) {
    let user = this.getUser();
    if (user) {
      return Observable.of(user);
    }

    if (doLogin) {
      return this.isAuthenticated().map(
        (user: any) => {
          if (user) {
            this.setUser(user);
            return this.getUser();
          }
        },
        (e: any) => {
          console.error(e);
        }
      );
    } else {
      return Observable.of(null); //no user but don't login
    }
  }

  isAdmin() {
    return this.user.role === 'admin';
  }

  isAuthenticated() {
    return this.http.get(this.endpoint + 'auth/user',
      { withCredentials: true })
      .catch(this.util.handleError);
  }

  getUser() {
    if (this.user) {
      return this.user;
    } else {
      //check local storage
      try {
        this.user = JSON.parse(localStorage.getItem('user'));
        return this.user;
      } catch {
        return null;
      }
    }
  }

  setUser(user) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  removeUser() {
    this.user = null;
  }
}
