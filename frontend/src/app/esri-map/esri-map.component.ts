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
      'esri/widgets/Search',
      // 'esri/layers/CSVLayer',
      // 'esri/renderers/UniqueValueRenderer',
      // 'esri/layers/WMSLayer'
    ])
      .then(([EsriMap, MapView, GeoJSONLayer, Search]) => {
        const map = new EsriMap({
          basemap: 'topo',
        });

        const mapView = new MapView({
          container: this.mapViewEl.nativeElement,
          center: [-97, 38], // lon, lat
          scale: 10000000,
          map: map,
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
            content: '<p>The {COMMONNAME} is part of {ADMINFORESTNAME}</p>' +
            '<p>It is located in region {REGION} </p>' +
            `<p> For more information please visit <a href='{URL}'>{URL}</a> </p>`  // Display text in pop-up
          }
        });

      const searchWidget = new Search({
        mapView: mapView,
        allPlaceholder: 'Address, City, or State',
        sources: [
          {
            layer: geoJson,
            searchFields: ['COMMONNAME'],
            displayField: 'COMMONNAME',
            exactMatch: false,
            outFields: ['COMMONNAME', 'ADMINFORESTNAME'],
            name: 'Forest Name',
            placeholder: 'example: Mark Twain National Forest'
          },
          {
            layer: geoJson,
            searchFields: ['REGION'],
            displayField: 'REGION',
            exactMatch: false,
            outFields: ['COMMONNAME'],
            name: 'Region Number',
            placeholder: 'example: 02'
          },
        ]
      });

      searchWidget.on('select-result', function(event) {
        mapView.goTo({
          target: event.result.feature,
          zoom: 9
        });
      });

      mapView.ui.add(searchWidget, 'top-right');

      map.add(geoJson);
      })
      .catch(err => {
        console.error(err);
      });
  }
}
