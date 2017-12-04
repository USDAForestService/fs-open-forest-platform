import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { TreesService } from '../../_services/trees.service';

@Injectable()
export class ForestResolver implements Resolve<any> {
  constructor(private service: TreesService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const id = route.paramMap.get('id');

    return this.service.getOne(id).take(1).map(data => {
      if (data) {
        return data.forest;
      } else {
        // This should go to forests selector
        this.router.navigate(['/']);
        return null;
      }
    });
  }
}
