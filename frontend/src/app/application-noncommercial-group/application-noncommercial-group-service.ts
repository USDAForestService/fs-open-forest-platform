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

  create(noncommercialGroup: NoncommercialGroup): Observable<NoncommercialGroup> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.postEndpoint, noncommercialGroup, options)
      .map((r: Response) => r.json());
  }

}
