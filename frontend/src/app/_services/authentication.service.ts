import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {
  private endpoint = environment.apiUrl;
  private user: any;

  constructor(private http: Http) {}

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

  login(username: string, password: string, type: string) {
    if (type === 'user') {
      localStorage.setItem('currentUser', JSON.stringify({ username: username }));
    } else if (type === 'admin') {
      localStorage.setItem('adminUser', JSON.stringify({ username: username }));
    }
  }

  logout() {
    return this.http.get(this.endpoint + 'auth/logout', { withCredentials: true });
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
