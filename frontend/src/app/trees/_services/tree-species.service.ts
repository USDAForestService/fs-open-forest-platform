import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TreeSpeciesService {
  constructor(private http: HttpClient) {}

  public getJSON(forest): Observable<any> {
    return this.http.get('assets/config/christmasTreesSpecies-' + forest + '.json');
  }
}
