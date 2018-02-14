import { Injectable } from '@angular/core';
import { HttpParams, HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
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
  private adminEndpoint = environment.apiUrl + 'admin/christmas-trees/permits';

  constructor(private http: HttpClient, public router: Router, public util: UtilService) {}

  create(body, multipart = false) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    if (multipart) {
      headers = new HttpHeaders().set('Content-Type', 'application/json').set('enctype', 'multipart/form-data');
    }

    const options = {
      withCredentials: true,
      headers: headers
    };

    return this.http
      .post(this.endpoint, body, options)
      .catch(this.util.handleError);
  }

  cancelOldApp(id) {
    const body = { permitId: id, status: 'Cancelled' };
    return this.http
      .put(`${environment.apiUrl}forests/christmas-trees/permits`, body)
      .catch(this.util.handleError);
  }

  getOne(id, token) {
    return this.http.get(`${this.endpoint}/${id}`, { params: new HttpParams().set('t', token) });
  }

  getDetails(id) {
    return this.http
      .get(`${this.endpoint}/${id}/details`)
      .catch(this.util.handleError);
  }

  getAllByDateRange(forestId, startDate, endDate) {
    return this.http
      .get(`${this.adminEndpoint}/${forestId}/${startDate}/${endDate}`, { withCredentials: true })
      .catch(this.util.handleError);
  }

  getReportByPermitNumber(permitNumber) {
    return this.http.get(`${this.adminEndpoint}/${permitNumber}`, { withCredentials: true })
      .catch(this.util.handleError);
  }

  handleStatusCode(status) {
    if (status === 403) {
      this.router.navigate(['access-denied']);
    }
  }

  resolverError(errors, route) {
    for (const error of errors) {
      if (error && error.status === 404) {
        this.router.navigate([route]);
      }
      return Observable.of({ error: error });
    }
    return Observable.of(errors);
  }
}
