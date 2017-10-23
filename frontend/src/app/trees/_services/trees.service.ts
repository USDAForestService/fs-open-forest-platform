import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable()
export class TreesService {
  private endpoint = environment.apiUrl + 'forests/';

  constructor(private http: Http, private router: Router) {}

  getOne(id) {
    return this.http
      .get(this.endpoint + id + '/regulations', { withCredentials: true })
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    let errors: any;
    if (error instanceof Response) {
      if (error.status) {
        errors = [error.status];
      } else {
        const body = error.json() || '';
        errors = body.errors;
      }
    } else {
      errors = ['Server error'];
    }
    return Observable.throw(errors);
  }

  getSectionInfo() {
    return [
      { step: 0, title: 'Guidelines' },
      { step: 1,
        title: 'Where to Find Your Tree',
        subsections: [{ step: 0, title: 'Districts and maps' }, { step: 1, title: 'Prohibited areas' }, { step: 2, title: 'Places to try' }]
      },
      {
        step: 2,
        title: 'Tree selection',
        subsections: [{ step: 0, title: 'Tree selection' }, { step: 1, title: 'Types of trees' }]
      },
      {
        step: 3,
        title: 'Tree Cutting',
        subsections: [{ step: 0, title: 'Before you cut' }, { step: 1, title: 'When you cut' }, { step: 2, title: 'After you cut' }]
      },
      { step: 4, title: 'Trip planning' },
      { step: 5, title: 'Safety first' },
      { step: 6, title: 'Contact information' }
    ];
  }
}
