
import {of as observableOf,  Observable } from 'rxjs';

import {catchError} from 'rxjs/operators';


import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { FirewoodInfoService } from '../../_services/firewood-info.service';

@Injectable()
export class FSForestResolver implements Resolve<any> {
  constructor(private service: FirewoodInfoService) {}

  /**
   *  @returns forest with markdown content
   */
  resolve(): Observable<any> {
    return this.service.getAll().pipe(catchError(err => {
      return observableOf(null);
    }));
  }
}
