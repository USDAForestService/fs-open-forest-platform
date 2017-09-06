import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
  constructor() {}

  login(username: string, password: string, type: string) {
    if (type === 'user') {
      localStorage.setItem('currentUser', JSON.stringify({ username: username }));
    } else if (type === 'admin') {
      localStorage.setItem('adminUser', JSON.stringify({ username: username }));
    }
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('adminUser');
  }
}
