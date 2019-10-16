/* tslint:disable:no-shadowed-variable prefer-const */


import {mergeMap, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable ,  forkJoin } from 'rxjs';
import { environment } from '../../../environments/environment';
import * as moment from 'moment/moment';

@Injectable()
export class FeedbackService {
  private endpoint = environment.apiUrl + 'feedback/';

  constructor(private http: HttpClient) {}

  // create an openforest feedback entry
  create(body) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    let newFeedback = {
      email: body.email,
      feedback: body.feedback,
      forests: []
    }

    const options = {
      headers: headers,
      withCredentials: true
    };

    return this.http.post(this.endpoint + 'create', newFeedback, options);
  }

  /**
   * @returns all feedback
   */
  getAll() {
    console.log('getAll from frontend')
    return this.http.get(this.endpoint);
  }

  /**
   * @returns user by id
   */
  getOne(id) {
    return this.http.get<any>(this.endpoint + id);
  }

  // delete openforest user
  delete(id) {
    return this.http.get(this.endpoint + id + '/delete')
  }

}
