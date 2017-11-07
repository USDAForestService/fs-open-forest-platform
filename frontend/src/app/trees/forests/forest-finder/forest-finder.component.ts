import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ForestService } from '../../_services/forest.service';
import { RemovePuncPipe } from './remove-punc.pipe';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-forest-finder',
  templateUrl: './forest-finder.component.html',
  providers: [ RemovePuncPipe ]
})
export class ForestFinderComponent implements OnInit {

  forests = [];
  results: any = [{id: 4, description: 'Shoshone | Montana, Wyoming | Cody, WY, Jackson, WY'},
    {id: 3, description: 'Mt. Hood | Oregon | Portland, OR'}, {id: 2, description: 'Flathead | Montana | Kalispell, MT'},
    {id: 1, description: 'Arapaho & Roosevelt | Colorado | Fort Collins, CO'}];

  constructor(private route: ActivatedRoute, private service: ForestService, private router: Router) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.forests = data.forests;
    });
  }

  goToForest(forestId: number): void{
    const navTo = '/xmas-trees/forests/' + forestId + '/tree-guidelines';
    this.router.navigate([navTo]);
  }

  forestSearchResults(keyword: any) {
    const filteredResults = this.results.filter(el => el.description.toUpperCase().indexOf(keyword.toUpperCase()) !== -1);
    return Observable.of(filteredResults);
  }

  forestListFormatter = (data: any) => {
    return `${data.description}`;
  }

}
