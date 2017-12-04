import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ForestService } from '../../_services/forest.service';
import { RemovePuncPipe } from './remove-punc.pipe';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-forest-finder',
  templateUrl: './forest-finder.component.html',
  providers: [RemovePuncPipe]
})
export class ForestFinderComponent implements OnInit {
  forests = [];
  selectedForest = null;
  itemsPerRow = 2;
  rows: any;

  constructor(private route: ActivatedRoute, private service: ForestService, private router: Router) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.forests = data.forests;
      if (data.forests) {
        this.rows = Array.from(Array(Math.ceil(data.forests.length / this.itemsPerRow)).keys());
      }
    });
  }

  goToForest(forestAbbr: string): void {
    const navTo = '/christmas-trees/forests/' + forestAbbr + '/tree-guidelines';
    this.router.navigate([navTo]);
  }

  forestSearchResults(keyword: any) {
    if (this.forests) {
      const filteredResults = this.forests.filter(
        el => el.description.toUpperCase().indexOf(keyword.toUpperCase()) !== -1
      );
      return Observable.of(filteredResults);
    }
  }

  forestListFormatter = (data: any) => {
    return `${data.description}`;
  };
}
