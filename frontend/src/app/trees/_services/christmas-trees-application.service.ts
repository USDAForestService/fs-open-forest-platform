import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { UtilService } from '../../_services/util.service';

@Injectable()
export class ChristmasTreesApplicationService {
  private endpoint = environment.apiUrl + 'forests/christmas-trees/permits';

  constructor(private http: Http, public router: Router, public util: UtilService) {}

  create(body, multipart = false) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    if (multipart) {
      headers = new Headers({ 'Content-Type': 'application/json', enctype: 'multipart/form-data' });
    }
    const options = new RequestOptions({ headers: headers });

    return this.http
      .post(this.endpoint, body, options)
      .map((res: Response) => res.json())
      .catch(this.util.handleError);
  }

  cancelOldApp(id) {
    const body = { permitId: id };
    return this.http
      .post(`${environment.apiUrl}forests/christmas-trees/permits/cancel`, body)
      .map((res: Response) => {
        res.json();
      })
      .catch(this.util.handleError);
  }

  getOne(id) {
    return this.http
      .get(`${this.endpoint}/${id}`, { withCredentials: true })
      .map((res: Response) => res.json())
      .catch(this.util.handleError);
  }

  getDetails(id) {
    return this.http
      .get(`${this.endpoint}/${id}/details`, { withCredentials: true })
      .map((res: Response) => res.json())
      .catch(this.util.handleError);
  }

  handleStatusCode(status) {
    if (status === 403) {
      this.router.navigate(['access-denied']);
    }
  }

  resolverError(errors, route) {
    if (errors.length) {
      for (const error of errors) {
        if (error.status === 404) {
          this.router.navigate([route]);
        }
        return Observable.of({ error: error });
      }
    }
    return Observable.of(errors);
  }
}
