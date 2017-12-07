import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { ChristmasTreesApplicationService } from '../../trees/_services/christmas-trees-application.service';

@Injectable()
export class ChristmasTreePermitResolver implements Resolve<any> {
  constructor(private service: ChristmasTreesApplicationService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const id = route.paramMap.get('permitId');

    return this.service.getOne(id).take(1).map(data => {
      if (data) {
        return data.permit;
      } else {
        this.router.navigate(['/']);
        return null;
      }
    });
  }
}
