/* tslint:disable:no-shadowed-variable prefer-const */


import {mergeMap, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable ,  forkJoin } from 'rxjs';
import { environment } from '../../../environments/environment';
import * as moment from 'moment/moment';

@Injectable()
export class FirewoodInfoService {
  private endpoint = environment.apiUrl + 'forests/';
  private CUTTING_AREA_KEYS = ['ELKCREEK', 'REDFEATHERLAKES', 'SULPHUR', 'CANYONLAKES'];

  constructor(private http: HttpClient) {}

  /**
   * @returns all forests
   */
  getAll() {
    return this.http.get(this.endpoint);
  }

  /**
   * @returns forest by id
   */
  getOne(id) {
    return this.http.get(this.endpoint + id);
  }

  /**
   * @returns forest by id with markdown content
   */
  getForestWithContent(id) {
    return this.http.get(this.endpoint + id);
  }

}
