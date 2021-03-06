/* tslint:disable:no-shadowed-variable prefer-const */


import {mergeMap, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable ,  forkJoin } from 'rxjs';
import {catchError} from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import * as moment from 'moment/moment';
import { UtilService } from '../../_services/util.service';

@Injectable()
export class FeedbackService {
  private endpoint = environment.apiUrl + 'feedback/';

  constructor(private http: HttpClient, public util: UtilService) {}

  // create a feedback entry
  create(body) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    let newFeedbackEntry = {
      message: body.message,
      forests: body.forests
    };

    const options = {
      headers: headers
    };

    return this.http.post(this.endpoint + 'create', newFeedbackEntry, options);
  }

  // get all feedback
  getAll() {
    return this.http.get(this.endpoint);
  }

}
