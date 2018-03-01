import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChristmasTreesService } from '../../_services/christmas-trees.service';
import { RemovePuncPipe } from './remove-punc.pipe';
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

  constructor(private route: ActivatedRoute, private service: ChristmasTreesService, private router: Router) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.forests = data.forests;
      if (data.forests) {
        this.rows = Array.from(Array(Math.ceil(data.forests.length / this.itemsPerRow)).keys());
      }
    });
  }

  goToForest(forestAbbr: string): void {
    const navTo = '/christmas-trees/forests/' + forestAbbr;
    this.router.navigate([navTo]);
  }
}
