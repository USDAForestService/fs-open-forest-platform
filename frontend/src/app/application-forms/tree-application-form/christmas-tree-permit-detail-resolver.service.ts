import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { ChristmasTreesApplicationService } from '../../trees/_services/christmas-trees-application.service';

@Injectable()
export class ChristmasTreePermitDetailResolver implements Resolve<any> {
  constructor(private service: ChristmasTreesApplicationService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const id = route.paramMap.get('paygovId');
    const forest = route.paramMap.get('id');

    return this.service
      .getDetails(id)
      .map(data => {
        if (data) {
          return data;
        }
      })
      .catch(errors => {
        if (errors.length) {
          for (const error of errors) {
            if (error.status === 404) {
              this.router.navigate([`applications/christmas-trees/forests/${forest}/new`]);
            }
            return Observable.of({ error: error });
          }
        }
        return Observable.of(errors);
      });
  }
}
