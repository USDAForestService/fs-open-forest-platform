import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ForestService } from '../../_services/forest.service';
import { RemovePuncPipe } from './remove-punc.pipe';

@Component({
  selector: 'app-forest-finder',
  templateUrl: './forest-finder.component.html',
  providers: [ RemovePuncPipe ]
})
export class ForestFinderComponent implements OnInit {

  forests = [];

  constructor(private route: ActivatedRoute, private service: ForestService, private router: Router) {}

  ngOnInit() {

    this.route.data.subscribe(data => {
      this.forests = data.forests;
    });
  }

  dropDownClick(forestID: number): void{
    const navTo = '/xmas-trees/forests/' + forestID + '/tree-guidelines';
    this.router.navigate([navTo]);
  }

}