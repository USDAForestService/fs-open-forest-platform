import { Component, OnInit } from '@angular/core';
import { ChristmasTreesInfoService } from '../trees/_services/christmas-trees-info.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  forests: any;
  selectedForest = null;

  constructor(
    private christmasTreesInfoService: ChristmasTreesInfoService,
  ) {
  }

  ngOnInit() {
    this.christmasTreesInfoService.getAll().subscribe(res => {
      this.forests = res;
    });
  }
}

