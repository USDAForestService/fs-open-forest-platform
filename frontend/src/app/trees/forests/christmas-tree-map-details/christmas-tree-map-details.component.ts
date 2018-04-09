import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-tree-map-details',
  templateUrl: './christmas-tree-map-details.component.html'
})
export class ChristmasTreeMapDetailsComponent implements OnInit {
  forestId: any;
  mapId: any;
  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
  ) {}

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

    this.route.data.subscribe(data => {
      if (data.forest && this.mapId) {
        this.titleService.setTitle('Map details for ' + data.forest.forestName + ' ' + this.mapId + ' cutting area or ranger district | U.S. Forest Service Christmas Tree Permitting');
      }
    });

  }
}
