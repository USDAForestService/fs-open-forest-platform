import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable()
export class ForestService {
  private endpoint = environment.apiUrl + 'forests/';

  constructor(private http: Http, private router: Router) {}

  getAll() {
    return this.http
      .get(this.endpoint, { withCredentials: true })
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    let errors: any;
    if (error instanceof Response) {
      if (error.status) {
        errors = [error.status];
      } else {
        const body = error.json() || '';
        errors = body.errors;
      }
    } else {
      errors = ['Server error'];
    }
    return Observable.throw(errors);
  }
}
