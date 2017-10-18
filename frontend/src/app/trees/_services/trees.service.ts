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
      { step: 0, title: 'General Guidelines' },
      {
        step: 1,
        title: 'Tree selection',
        subsections: [{ step: 0, title: 'Types of trees' }]
      },
      {
        step: 2,
        title: 'Cutting instructions',
        subsections: [{ step: 0, title: 'Tools' }, { step: 1, title: 'Cutting and cleanup' }]
      },
      { step: 3, title: 'Trip planning' },
      { step: 4, title: 'Safety first' },
      { step: 5, title: 'Contact information' }
    ];
  }
}
