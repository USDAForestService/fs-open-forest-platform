import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html'
})
export class MapViewComponent implements OnInit {
  @Input() forests: any;

  ngOnInit() {
  }

}
