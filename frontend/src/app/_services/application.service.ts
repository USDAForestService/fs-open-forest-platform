import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

import { SpecialUseApplication } from '../_models/special-use-application';

@Injectable()
export class ApplicationService {

  private endpoint = environment.apiUrl + 'permits/applications';

  constructor (private http: Http) {}

  create(body, type, multipart = false) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    if (multipart) {
      headers = new Headers({ 'Content-Type': 'application/json', 'enctype': 'multipart/form-data' });
    }
    const options = new RequestOptions({ headers: headers });

    return this.http.post(this.endpoint + '' + type, body, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  get(params = '') {
    return this.http.get(this.endpoint + '' + params)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  getOne(id) {
    return this.http.get(this.endpoint + '/' + id)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  update(body: SpecialUseApplication): Observable<SpecialUseApplication[]> {
    const bodyString = JSON.stringify(body);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.put(this.endpoint + '/' + body.appControlNumber, body, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
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
