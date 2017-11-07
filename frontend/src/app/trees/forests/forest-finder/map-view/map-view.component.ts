import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html'
})
export class MapViewComponent implements OnInit {
  @Input() forests: any;
  itemsPerRow: number;
  rows: any;

  ngOnInit() {
    this.itemsPerRow = 2
    this.rows = Array.from(Array(Math.ceil(this.forests.length / this.itemsPerRow)).keys())
  }

}
