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
        forestName: 'Forest x',
        forestUrl: 'http://www.forest.com',
        treeHeight: 12,
        stumpHeight: 6,
        stumpDiamerter: 6,
        notes: 'test',
        species: [
          { id: '1', name: 'Noble Fir', description: 'long needles', photos: 'url', status: 'Recommended' },
          { id: '2', name: 'Yew', description: 'long needles', photos: 'url', status: 'Not allowed' },
          { id: '3', name: 'Spruce', description: 'long needles', photos: 'url', status: 'Not Recommended' }
        ] // Status is in join table
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

  getTreeInfo() {
    return [
      { step: 1, title: 'General Guidelines', content: `<p>Content goes here</p>` },
      {
        step: 2,
        title: 'Tree selection',
        content: `Content goes here`,
        subsections: [
          { step: 1, title: 'Types of trees', content: '<p>Content goes here</p>' },
          { step: 2, title: 'Finding your tree', content: '<p>Content goes here</p>' }
        ]
      },
      {
        step: 3,
        title: 'Cutting instructions',
        content: `Content goes here`,
        subsections: [
          { step: 1, title: 'Cutting/cleanup', content: '<p>Content goes here</p>' },
          { step: 2, title: 'Tools', content: '<p>Content goes here</p>' },
          { step: 3, title: 'Measurements', content: '<p>Content goes here</p>' },
          { step: 4, title: 'Cutting/cleanup', content: '<p>Content goes here</p>' }
        ]
      },
      { step: 4, title: 'Trip planning', content: `<p>Content goes here</p>` },
      { step: 5, title: 'Safety first', content: `<p>Content goes here</p>` },
      { step: 6, title: 'Contact information', content: `<p>Content goes here</p>` }
    ];
  }
}
