/* tslint:disable:no-shadowed-variable prefer-const */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../../environments/environment';
import { forkJoin } from 'rxjs/observable/forkJoin';
import * as moment from 'moment-timezone';

@Injectable()
export class ChristmasTreesService {
  private endpoint = environment.apiUrl + 'forests/';
  private CUTTING_AREA_KEYS = ['elkCreek', 'redFeatherLakes', 'sulphur', 'canyonLakes'];

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(this.endpoint);
  }

  getOne(id) {
    return this.http.get<any>(this.endpoint + id).flatMap(forest =>
      this.getJSON(forest.forestAbbr).map(forestJSON => {
        forest.species = forestJSON.treeSpecies;
        return forest;
      })
    );
  }

  getForestWithContent(id) {
    let content;
    return this.http.get<any>(this.endpoint + id).flatMap(forest =>
      this.joinMdRequests(forest).flatMap(content =>
        this.getJSON(forest.forestAbbr).map(forestJSON => {
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

  /**
   * configure each markdown file that will be added to the forest.content
   */
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
      howToPlanYourTrip: `/assets/content/${forest.forestAbbr}/trip-planning/how-to-plan-your-trip.md`,
      rules: `/assets/content/${forest.forestAbbr}/rules-to-know/rules.md`,
      permitRules: `/assets/content/common/permit-rules.md`
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

  parseCuttingAreaMarkdown(text, forest) {
    for (const key of this.CUTTING_AREA_KEYS) {
      if (text.indexOf(key) > -1) {
        const jsonKey = key.toUpperCase();
        const cuttingAreas = forest.cuttingAreas;
        if (cuttingAreas[jsonKey] && cuttingAreas[jsonKey].startDate) {
          text = text
            .replace(
              '{{' + key + 'Date}}',
              this.formatCuttingAreaDate(forest, cuttingAreas[jsonKey].startDate, cuttingAreas[jsonKey].endDate)
            )
            .replace(
              '{{' + key + 'Time}}',
              this.formatCuttingAreaTime(forest, cuttingAreas[jsonKey].startDate, cuttingAreas[jsonKey].endDate)
            );
        }
      }
    }

    return text;
  }

  formatCuttingAreaDate(forest, startDate, endDate) {
    const start = moment(startDate).tz(forest.timezone);
    const end = moment(endDate).tz(forest.timezone);
    const startFormat = 'MMM. D -';
    let endFormat = ' D, YYYY';

    if (start.month() !== end.month()) {
      endFormat = ' MMM. D, YYYY';
    }
    return start.format(startFormat) + end.format(endFormat);
  }

  formatCuttingAreaTime(forest, startDate, endDate) {
    const start = moment(startDate)
      .tz(forest.timezone)
      .format('h:mm a - ');
    return (
      start +
      moment(endDate)
        .tz(forest.timezone)
        .format('h:mm a.')
    );
  }

  updateMarkdownText(markdownService, forest) {
    markdownService.renderer.text = (text: string) => {
      const replaceArray = Object.keys(forest);
      if (forest && text.indexOf('{{') > -1) {
        for (let i = 0; i < replaceArray.length; i++) {
          text = text.replace(new RegExp('{{' + replaceArray[i] + '}}', 'gi'), forest[replaceArray[i]]);
          if (forest.cuttingAreas) {
            text = this.parseCuttingAreaMarkdown(text, forest); // cutting areas are handled special from other variables
          }
        }
      }
      return text;
    };

    markdownService.renderer.heading = (text, level) => {
      return `<h${level}>${text}</h${level}>`;
    };
  }
}
