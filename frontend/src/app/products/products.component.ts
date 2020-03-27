import { Component, OnInit } from '@angular/core';
import { ChristmasTreesInfoService } from '../trees/_services/christmas-trees-info.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  forests: any;
  selectedForest = null;
  testForest: any;

  constructor(
    private service: ChristmasTreesInfoService,
  ) {
  }

  ngOnInit() {
    this.service.getAll().subscribe(res => {
      this.forests = res;
      console.log(this.forests)
    });
  }
}

