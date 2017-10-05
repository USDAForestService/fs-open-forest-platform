import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

import { SpecialUseApplication } from '../_models/special-use-application';

@Injectable()
export class ApplicationService {
  private endpoint = environment.apiUrl + 'permits/applications';

  constructor(private http: Http, private router: Router) {}

  create(body, type, multipart = false) {
    const headers = this.getDefaultHeaders();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers, withCredentials: true });

    return this.http
      .post(this.endpoint + type, body, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  get(params = '') {
    return this.http
      .get(this.endpoint + params, { headers: this.getDefaultHeaders(), withCredentials: true })
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  getOne(id, params = '') {
    return this.http
      .get(this.endpoint + params + id, { headers: this.getDefaultHeaders(), withCredentials: true })
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  update(body: SpecialUseApplication, type): Observable<SpecialUseApplication[]> {
    const bodyString = JSON.stringify(body);
    const headers = this.getDefaultHeaders();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers, withCredentials: true });

    return this.http
      .put(this.endpoint + '/special-uses/' + type + '/' + body.appControlNumber, body, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  getDefaultHeaders() {
    const headers = new Headers();
    if (localStorage.getItem('token')) {
      headers.append('x-access-token', localStorage.getItem('token'));
    }
    return headers;
  }

  handleStatusCode(status) {
    if (status === 403) {
      this.router.navigate(['access-denied']);
    }
    return;
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
