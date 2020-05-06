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
      'esri/views/MapView',
      'esri/layers/WMSLayer'
    ])
      .then(([EsriMap, MapView, WMSLayer]) => {
        const map = new EsriMap({
          basemap: 'topo',
        });

        const mapView = new MapView({
          container: this.mapViewEl.nativeElement,
          center: [-98, 38],
          zoom: 5,
          map: map
        });

      const wmsForest = new WMSLayer({
        url: 'https://apps.fs.usda.gov/arcx/services/EDW/EDW_ForestCommonNames_01/MapServer/WMSServer?request=GetCapabilities&service=WMS',
      });

      map.add(wmsForest);

      })
      .catch(err => {
        console.error(err);
      });
  }
}
