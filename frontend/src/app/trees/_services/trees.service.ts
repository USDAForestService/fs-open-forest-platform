import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TreesService {
  private endpoint = environment.apiUrl + 'forests/';

  constructor(private http: HttpClient) {}

  getOne(id) {
    return this.http.get<any>(this.endpoint + id)
      .map(data => {
        if (data && !environment.production) {
          for (const key in environment['forestOverrides']) {
            if (environment.hasOwnProperty('forestOverrides')) {
              for (const attrname in environment['forestOverrides'][key]) {
                if ((data.id + '') === key) {
                  data[attrname] = environment['forestOverrides'][key][attrname];
                }
              }
            }
          }
        }
      return data;
    });
  }
}
