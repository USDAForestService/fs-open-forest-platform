import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {
  private endpoint = environment.apiUrl;
  user: any;

  constructor(private http: Http, private router: Router) {}

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
      .catch(this.handleError);
  }

  getUser() {
    return this.user;
  }

  logout() {
    this.user = null;
    this.router.navigate([this.endpoint + 'auth/logout']);
  }

  private handleError(error: Response | any) {
    let errors: any;
    if (error instanceof Response) {
      if (error.status !== 401) {
        const body = error.json() || '';
        errors = body.errors;
        return Observable.throw(errors);
      }
    }
    return Observable;
  }
}
