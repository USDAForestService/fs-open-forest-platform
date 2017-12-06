import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable()
export class ChristmasTreesApplicationService {
  private endpoint = environment.apiUrl + 'forests/christmas-trees/applications';

  constructor(private http: Http, public router: Router) {}

  create(body, multipart = false) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    if (multipart) {
      headers = new Headers({ 'Content-Type': 'application/json', enctype: 'multipart/form-data' });
    }
    const options = new RequestOptions({ headers: headers });

    return this.http
      .post(this.endpoint, body, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  handleStatusCode(status) {
    if (status === 403) {
      this.router.navigate(['access-denied']);
    }
  }

  private handleError(error: Response | any) {
    let errors: any = [];
    if (error instanceof Response) {
      const body = error.json() || '';
      errors = body.errors;
      if (error.status) {
        switch (error.status) {
          case 400:
            const body = error.json() || '';
            errors = body.errors;
            break;
          case 401:
            errors = [{message: 'Please log in.'}];
            break;
          case 403:
            errors = [{message: 'Access denied.'}];
            break;
          case 404:
            errors = [{message: 'The requested application is not found.'}];
            break;
          case 500:
            errors = [];
            break;
        }
      }
    }
    return Observable.throw(errors);
  }
}
