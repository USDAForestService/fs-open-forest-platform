/* tslint:disable:no-shadowed-variable prefer-const */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../../environments/environment';
import { forkJoin } from 'rxjs/observable/forkJoin';

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

  getForestWithContent(id) {
    let content;
    return this.http.get<any>(this.endpoint + id)
      .flatMap(forest =>
        this.joinMdRequests(forest)
      .flatMap(content =>
        this.getJSON(forest.forestAbbr)
          .map((forestJSON) => {
            forest.species = forestJSON.treeSpecies;
            forest.content = this.nameMdArray(content, forest);
            return forest;
          })
      )
    );
  }

  getJSON(forest): Observable<any> {
    return this.http.get('assets/config/christmasTreesForests-' + forest + '.json');
  }

  getText(url) {
    return this.http.get(url, { responseType: 'text' });
  }

  nameMdArray(content, forest) {
    const files = {};
    let i = 0;
    for (let key in this.getMdUrls(forest)) {
      if (key) {
        files[key] = content[i];
        i++;
      }
    }
    return files;
  }

  joinMdRequests(forest) {
    const mdFiles = this.getMdFiles(forest);
    const requests = Object.keys(mdFiles).map(val => mdFiles[val]);
    return forkJoin(requests);
  }

  getMdUrls(forest) {
    return {
      contactUs: `/assets/content/${forest.forestAbbr}/contact-information/contact-us.md`,
      beforeYouCut: `/assets/content/${forest.forestAbbr}/cutting-instructions/before-you-cut.md`,
      whenYouCut: `/assets/content/${forest.forestAbbr}/cutting-instructions/when-you-cut.md`,
      cuttingYourTree: `/assets/content/${forest.forestAbbr}/rules-to-know/cutting-your-tree.md`,
      prohibitedRules: `/assets/content/${forest.forestAbbr}/rules-to-know/prohibited-rules.md`,
      seasonDatesAdditionalInformation: `/assets/content/${forest.forestAbbr}/season-dates/additional-information.md`,
      treeLocationsAllowed: `/assets/content/${forest.forestAbbr}/tree-locations/allowed.md`,
      treeLocationsProhibited: `/assets/content/${forest.forestAbbr}/tree-locations/prohibited.md`,
      howToPlanYourTrip: `/assets/content/${forest.forestAbbr}/trip-planning/how-to-plan-your-trip.md`
    };
  }

  getMdFiles(forest) {
    let result = {};
    const urls = this.getMdUrls(forest);
    for (let url in urls) {
      if (url) {
        result[url] = this.getText(urls[url]);
      }
    }

    return result;
  }
}
