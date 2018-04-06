import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tree-map-details',
  templateUrl: './christmas-tree-map-details.component.html'
})
export class ChristmasTreeMapDetailsComponent implements OnInit {
  forestId: any;
  mapId: any;
  constructor(private route: ActivatedRoute) { }

  /**
   * Set data from route resolver
   */
  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id'] && params['mapId']) {
        this.forestId = params['id'];
        this.mapId = params['mapId'];
      }
    });
  }
}
