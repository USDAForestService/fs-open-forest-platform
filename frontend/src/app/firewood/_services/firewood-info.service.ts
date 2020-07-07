/* tslint:disable:no-shadowed-variable prefer-const */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class FirewoodInfoService {
  private endpoint = environment.apiUrl + 'forests/';

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
