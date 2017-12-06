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
import { UtilService } from './util.service';

@Injectable()
export class ApplicationService {
  private endpoint = environment.apiUrl + 'permits/applications';

  constructor(private http: Http, public router: Router, public util: UtilService) {}

  create(body, type, multipart = false) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    if (multipart) {
      headers = new Headers({ 'Content-Type': 'application/json', enctype: 'multipart/form-data' });
    }
    const options = new RequestOptions({ headers: headers, withCredentials: true });

    return this.http
      .post(this.endpoint + type, body, options)
      .map((res: Response) => res.json())
      .catch(this.util.handleError);
  }

  get(params = '') {
    return this.http
      .get(this.endpoint + params, { withCredentials: true })
      .map((res: Response) => res.json())
      .catch(this.util.handleError);
  }

  getOne(id, params = '') {
    return this.http
      .get(this.endpoint + params + id, { withCredentials: true })
      .map((res: Response) => res.json())
      .catch(this.util.handleError);
  }

  update(body, type) {
    const bodyString = JSON.stringify(body);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers, withCredentials: true });

    return this.http
      .put(`${this.endpoint}/special-uses/${type}/${body.appControlNumber}`, body, options)
      .map((res: Response) => res.json())
      .catch(this.util.handleError);
  }

  handleStatusCode(status) {
    if (status === 403) {
      this.router.navigate(['access-denied']);
    }
  }

}
