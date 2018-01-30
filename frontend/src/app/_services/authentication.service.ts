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

  getAuthenticatedUser() {
    if (this.user) {
      return Observable.of(this.user);
    }

    return this.isAuthenticated().map(
      (user: any) => {
        if (user) {
          this.user = user;
          return this.user;
        }
      },
      (e: any) => {
        console.error(e);
      }
    );
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
    return this.user;
  }

  removeUser() {
    this.user = null;
  }
}
