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
  constructor(private http: Http, private router: Router) {}

  getOne(id) {
    return new Promise((resolve, reject) => {
      resolve({
        id: id,
        treeHeight: 15,
        stumpHeight: 6,
        stumpDiamerter: 10,
        species: [{ name: 'Spruce', status: 'recommended', description: 'long needles' }]
      });
    });
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
}
