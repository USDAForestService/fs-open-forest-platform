import { Component, OnInit } from '@angular/core';
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
  ) {
  }

  ngOnInit() {
  }

  goToForest(forest) {
    if (forest) {
      const navTo = '/products/' + forest.forestAbbr;
      this.router.navigate([navTo]);
    }
  }
}
