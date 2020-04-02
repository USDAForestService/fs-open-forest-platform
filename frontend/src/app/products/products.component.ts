import { Component, OnInit } from '@angular/core';
import { ChristmasTreesInfoService } from '../trees/_services/christmas-trees-info.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  forests: any;
  selectedForest = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private christmasTreesInfoService: ChristmasTreesInfoService,
  ) {
  }

  ngOnInit() {
    this.christmasTreesInfoService.getAll().subscribe(res => {
      this.forests = res;
    });
  }

  goToForest(forest) {
    if (forest) {
      const navTo = '/products/' + forest.forestAbbr;
      this.router.navigate([navTo]);
    } 
  }
}

