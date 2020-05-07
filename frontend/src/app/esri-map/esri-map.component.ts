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
      'esri/layers/GeoJSONLayer',
    ])
      .then(([EsriMap, MapView, GeoJSONLayer]) => {
        const map = new EsriMap({
          basemap: 'topo',
        });

        const mapView = new MapView({
          container: this.mapViewEl.nativeElement,
          center: [-98, 38],
          zoom: 5,
          map: map
        });

      const geoJson = new GeoJSONLayer({
        url: 'https://opendata.arcgis.com/datasets/06ed165cbff74a819a1139d43067a5c1_1.geojson',
        // Enable renderer to outline forests
        renderer: {
          type: 'simple',
          symbol: {
            type: 'simple-line',
            color: 'green',
            width: '2px'
          }
        },
        popupTemplate: {  // Enable a popup
          title: '{COMMONNAME}', // Show attribute value
          content: 'This forest is in region {REGION}.'  // Display text in pop-up
        }
      });

      map.add(geoJson);

      })
      .catch(err => {
        console.error(err);
      });
  }
}
