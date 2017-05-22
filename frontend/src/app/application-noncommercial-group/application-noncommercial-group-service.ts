import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ApplicationNoncommercialGroupService {

  private postEndpoint = 'https://fs-intake-api-staging.app.cloud.gov/permits/applications/special-uses/noncommercial/';

  constructor (private http: Http) {}

  create(data) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.post(this.postEndpoint, data, options)
      .map(this.extractData)
      .catch(this.handleError);
    //  .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  private extractData(res: Response) {
    const body = res.json();
    return body.data || { };
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    let err: any;
    if (error instanceof Response) {
      const body = error.json() || '';
      // err = body.error || JSON.stringify(body);
      err = body.errors;
    //  errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(err);
    return Observable.throw(err);
  }

}
