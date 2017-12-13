import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { UtilService } from './util.service';

@Injectable()
export class AuthenticationService {
  private endpoint = environment.apiUrl;
  user: any;

  constructor(private http: Http, private router: Router, public util: UtilService) {}

  getAuthenticatedUser() {
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
    return this.http
      .get(this.endpoint + 'auth/user', { withCredentials: true })
      .map((res: Response) => {
        return res.json();
      })
      .catch(this.util.handleError);
  }

  getUser() {
    return this.user;
  }

  removeUser() {
    this.user = null;
  }
}
