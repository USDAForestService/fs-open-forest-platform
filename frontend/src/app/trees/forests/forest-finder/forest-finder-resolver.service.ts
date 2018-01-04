import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { ForestService } from '../../_services/forest.service';

@Injectable()
export class ForestFinderResolver implements Resolve<any> {
  constructor(private service: ForestService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const trees = this.service.getAll();
    console.log(trees);
    return trees;
    // .map(data => {
    //   if (data) {
    //     return data;
    //   } else {
    //     return null;
    //   }
    // });
  }
}

// const result = this.service.getOne(id, token).catch(err => {
//   return this.service.resolverError(err, `applications/christmas-trees/forests/${forest}/new`);
// });
