
import {of as observableOf,  Observable } from 'rxjs';

import {catchError} from 'rxjs/operators';


import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './_services/authentication.service';


@Injectable()
export class UserResolver implements Resolve<any> {
  constructor(private service: AuthenticationService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.service.getAuthenticatedUser().pipe(catchError(err => {
      return observableOf(null);
    }));
  }
}
