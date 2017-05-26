import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ApplicationService {

//  private endpoint = 'https://fs-intake-api-staging.app.cloud.gov/permits/applications';
  private endpoint = 'http://localhost:8080/permits/applications';

  constructor (private http: Http) {}

  create(data, type) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.post(this.endpoint + '' + type, data, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  get(params = '') {
    return this.http.get(this.endpoint + '' + params)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    const body = res.json();
    return body.data || { };
  }

  private handleError (error: Response | any) {
    let errors: any;
    if (error instanceof Response) {
      const body = error.json() || '';
      errors = body.errors;
    } else {
      errors = ['Server error'];
    }
    console.error(errors);
    return Observable.throw(errors);
  }
}
