import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from './_services/authentication.service';


@Injectable()
export class UserResolver implements Resolve<any> {
  constructor(private service: AuthenticationService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.service.getAuthenticatedUser(false).catch(err => {
      return Observable.of(null);
    });
  }
}
