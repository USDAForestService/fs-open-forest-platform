
import {of as observableOf,  Observable ,  forkJoin } from 'rxjs';

import {catchError} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { UtilService } from '../../_services/util.service';
import * as moment from 'moment/moment';

@Injectable()
export class ChristmasTreesApplicationService {
  private endpoint = environment.apiUrl + 'forests/christmas-trees';
  private adminEndpoint = environment.apiUrl + 'admin/christmas-trees';

  constructor(private http: HttpClient, public router: Router, public util: UtilService) {}

  /**
   * @returns Post Christmas tree application
   */
  create(body, multipart = false) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    if (multipart) {
      headers = new HttpHeaders().set('Content-Type', 'application/json').set('enctype', 'multipart/form-data');
    }

    const options = {
      withCredentials: true,
      headers: headers
    };

    return this.http.post(`${this.endpoint}/permits`, body, options).pipe(catchError(this.util.handleError));
  }

  /**
   * @returns Update Christmas tree application
   */
  updatePermit(id, status, token) {
    let params = {};
    if (token) {
      params = { params: new HttpParams().set('t', token) };
    }
    const body = { permitId: id, status: status };
    return this.http.put(`${this.endpoint}/permits`, body, params).pipe(catchError(this.util.handleError));
  }

  /**
   * @returns Get permit
   */
  getPermit(id, token) {
    let params = {};
    if (token) {
      params = { params: new HttpParams().set('t', token) };
    }
    return this.http.get(`${this.endpoint}/permits/${id}`, params).pipe(catchError(this.util.handleError));
  }

  /**
   * @returns Printable permit, with or without the rules
   */
  getPrintablePermit(id, includeRules = false) {
    const requests = [];
    requests.push(this.getPermitRequest(id, false));
    if (includeRules) {
      requests.push(this.getPermitRequest(id, true));
    }
    return forkJoin(requests);
  }

  /**
   * @returns Get printable permit, with or without the rules
   */
  getPermitRequest(id, rules = false) {
    let queryParam = 'permit=true';
    if (rules) {
      queryParam = 'rules=true';
    }
    return this.http.get(`${this.endpoint}/permits/${id}/print?${queryParam}`).pipe(catchError(this.util.handleError));
  }

  /**
   * @returns Permits by date range and specific to forest
   */
  getAllByDateRange(forestId, startDate, endDate) {
    const params = new HttpParams()
      .set('forestId', forestId)
      .set('startDate', startDate)
      .set('endDate', endDate);

    return this.http
      .get(`${this.adminEndpoint}/permits/summary`, { withCredentials: true, params }).pipe(
      catchError(this.util.handleError));
  }

  /**
   * @returns Permit by permit number
   */
  getReportByPermitNumber(permitNumber) {
    return this.http
      .get(`${this.adminEndpoint}/permits/${permitNumber}`, { withCredentials: true }).pipe(
      catchError(this.util.handleError));
  }

  /**
   * @returns Update season dates for forest
   */
  updateSeasonDates(forestId, startDate, endDate) {
    const body = { startDate: startDate, endDate: endDate };
    return this.http
      .put(`${this.adminEndpoint}/forests/${forestId}`, body, { withCredentials: true }).pipe(
      catchError(this.util.handleError));
  }

  /**
   * @returns Update distrct dates for forest district
   */

  //  double check before commit, should be good though
  updateDistrictDates(forest, districtName, startDate, endDate) {
    const cuttingAreas = Object.assign({}, forest.cuttingAreas);
    const startDateTime = new Date(startDate);
    const endDateTime = new Date(endDate)
    const tzStartDate = moment(startDateTime).format('YYYY-MM-DD HH:mm:ss');
    const tzEndDate = moment(endDateTime).format('YYYY-MM-DD HH:mm:ss');
    cuttingAreas[districtName].startDate = tzStartDate;
    cuttingAreas[districtName].endDate = tzEndDate;

    const body = { cuttingAreas: cuttingAreas };
    console.log(body);
    return this.http
      .put(`${this.adminEndpoint}/forests/${forest.id}`, body, { withCredentials: true }).pipe(
      catchError(this.util.handleError));
  }

  /**
   * @returns Error Observable
   */
  resolverError(errors: any[], route) {
    for (const error of errors) {
      if (error && error.status === 404) {
        this.router.navigate([route]);
      }
      return observableOf({ error: error });
    }
    return observableOf(errors);
  }
}
