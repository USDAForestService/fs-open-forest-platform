import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
  constructor() {}

  login(username: string, password: string) {
    localStorage.setItem('currentUser', JSON.stringify({ username: username }));
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }
}
