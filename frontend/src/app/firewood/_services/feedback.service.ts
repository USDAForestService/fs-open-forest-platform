/* tslint:disable:no-shadowed-variable prefer-const */


import {mergeMap, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable ,  forkJoin } from 'rxjs';
import {catchError} from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import * as moment from 'moment/moment';
import { UtilService } from '../../_services/util.service';
import { QuantityComponent } from 'app/application-forms/fields/quantity.component';

@Injectable()
export class FeedbackService {
  private endpoint = environment.apiUrl + 'fsforests/firewood-permits/';

  constructor(private http: HttpClient, public util: UtilService) {}

  // create a feedback entry
  create(body) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    let newFeedbackEntry = {
      emailAddress: body.emailAddress,
      firstName: body.firstName,
      lastName: body.lastName,
      forestId: body.forestId,
    };

    const options = {
      headers: headers
    };

    return this.http.post(this.endpoint, newFeedbackEntry, options);
  }

  // get all feedback
  getAll() {
    return this.http.get(this.endpoint);
  }

}
