import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChristmasTreeMapDetailsService } from './christmas-tree-map-details.service';

@Component({
  selector: 'app-tree-map-details',
  templateUrl: './christmas-tree-map-details.component.html'
})
export class ChristmasTreeMapDetailsComponent implements OnInit{
  mapLocation: any;
  mapDescriptionPieces: any[];
  mapId: any;
  constructor(
    private mapDetailService: ChristmasTreeMapDetailsService,
    private route: ActivatedRoute
    ) {

  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id'] && params['mapId']) {
        const id = params['id'];
        this.mapId = params['mapId'];
        this.mapDetailService.getJSON().subscribe(detailData => {
          this.mapLocation = detailData[id][this.mapId]['map'];
          this.mapDescriptionPieces = detailData[id][this.mapId]['description'].split('\n');
        });
      }
    });
  }
}
