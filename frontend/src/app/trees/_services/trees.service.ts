import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class TreesService {
  private endpoint = environment.apiUrl + 'forests/';

  constructor(private http: HttpClient) {}

  getOne(id) {
    return this.http.get(this.endpoint + id);
  }
}
