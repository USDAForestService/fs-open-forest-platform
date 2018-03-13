import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MapDetailsService {
  MAP_DETAILS_FILE_URL = 'assets/config/map-details.json';

  constructor(private http: HttpClient) {
    let obj;
    this.getJSON().subscribe(data => (obj = data));
  }

  public getJSON(): Observable<any> {
    return this.http.get(this.MAP_DETAILS_FILE_URL);
  }
}
