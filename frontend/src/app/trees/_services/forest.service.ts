import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../../environments/environment';

@Injectable()
export class ForestService {
  private endpoint = environment.apiUrl + 'forests/';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(this.endpoint);
  }

  getOne(id) {
    return this.http.get<any>(this.endpoint + id)
      .flatMap(forest =>
        this.getJSON(forest.forestAbbr)
      .map(forestJSON => {
        forest.species = forestJSON.treeSpecies;
        return forest;
      }));
  }

  getJSON(forest): Observable<any> {
    return this.http.get('assets/config/christmasTreesForests-' + forest + '.json');
  }
}
