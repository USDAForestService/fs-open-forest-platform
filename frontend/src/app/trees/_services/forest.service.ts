import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class ForestService {
  private endpoint = environment.apiUrl + 'forests/';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(this.endpoint);
  }
}
