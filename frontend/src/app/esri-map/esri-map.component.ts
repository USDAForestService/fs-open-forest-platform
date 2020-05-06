import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { loadModules } from 'esri-loader';

@Component({
  selector: 'app-esri-map',
  templateUrl: './esri-map.component.html',
  styleUrls: ['/esri-map.component.scss']
})

export class EsriMapComponent implements OnInit {

  @ViewChild('mapViewNode') private mapViewEl: ElementRef;

  constructor() { }

  ngOnInit() {
    loadModules([
      'esri/Map',
      'esri/views/MapView'
    ])
      .then(([EsriMap, EsriMapView]) => {
        const map = new EsriMap({
          basemap: 'topo-vector'
        });

        const mapView = new EsriMapView({
          container: this.mapViewEl.nativeElement,
          center: [-98, 38],
          zoom: 5,
          map: map
        });
      })
      .catch(err => {
        console.error(err);
      });
  }
}
