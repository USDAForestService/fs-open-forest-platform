import { Injectable } from '@angular/core';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

import { UtilService } from './util.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ApplicationService {
  private endpoint = environment.apiUrl + 'permits/applications';

  constructor(private http: HttpClient, public router: Router, public util: UtilService) {}

  create(body, type, multipart = false) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    if (multipart) {
      headers = new HttpHeaders().set('Content-Type', 'application/json').set('enctype', 'multipart/form-data');
    }
    const options = {
      headers: headers,
      withCredentials: true
    };

    return this.http.post(this.endpoint + type, body, options).catch(this.util.handleError);
  }

  get(params = '') {
    return this.http.get(this.endpoint + params, { withCredentials: true }).catch(this.util.handleError);
  }

  getOne(id, params = '') {
    return this.http.get(this.endpoint + params + id, { withCredentials: true }).catch(this.util.handleError);
  }

  update(body, type) {
    const bodyString = JSON.stringify(body);
    const options = {
      withCredentials: true,
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };
    return this.http
      .put(`${this.endpoint}/special-uses/${type}/${body.appControlNumber}`, body, options)
      .catch(this.util.handleError);
  }

  handleStatusCode(status) {
    if (status === 403) {
      this.router.navigate(['access-denied']);
    }
  }
}
