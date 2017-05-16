import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { NoncommercialGroup } from './_models/noncommercial-group';

@Injectable()
export class ApplicationNoncommercialGroupService {

  private postEndpoint = 'https://fs-intake-api-staging.app.cloud.gov/permits/applications/special-uses/noncommercial/';

  constructor (private http: Http) {}

  // create(noncommercialGroup: NoncommercialGroup): Observable<NoncommercialGroup> {
  // create(noncommercialGroup: NoncommercialGroup): Observable<NoncommercialGroup> {
  //   let headers = new Headers({ 'Content-Type': 'application/json' });
  //   let options = new RequestOptions({ headers: headers });
  //
  //   return this.http.post(this.postEndpoint, {noncommercialGroup}, options)
  //     .map(this.extractData)
  //     .catch(this.handleError);
  // }

  // create(noncommercialGroup: NoncommercialGroup): Observable<NoncommercialGroup> {
  create(data) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.postEndpoint, data, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
