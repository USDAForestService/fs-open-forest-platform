import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { loadModules } from 'esri-loader';
import { Router } from '@angular/router';

@Component({
  selector: 'app-esri-map',
  templateUrl: './esri-map.component.html',
  styleUrls: ['/esri-map.component.scss']
})

export class EsriMapComponent implements AfterViewInit {

  @ViewChild('mapViewNode') private mapViewEl: ElementRef;

  constructor(public router: Router) { }

  ngAfterViewInit() {
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
          navigation: {
            mouseWheelZoomEnabled: false,
            browserTouchPanEnabled: false
          }
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
            outFields: ['*'],
            content: checkForest,
          }
        });

        function checkForest (feature) {
          const mbsForest = 'Mt. Baker-Snoqualmie National Forest';
          const common = feature.graphic.attributes.COMMONNAME;
          const route = document.location.origin;
          if (common === mbsForest) {
            return `<p>The {COMMONNAME} is part of {ADMINFORESTNAME}</p>` +
            `<p>For more information about this forest please visit <a href={URL}>{URL}</a>` +
            `<h3>Available Permits</h3>` +
            `<h3><a href='` + route + `/special-use/applications/noncommercial-group-use/new'>Non-Commercial</a></h3>` +
            `<h3><a href='` + route + `/special-use/applications/temp-outfitters/new'>Temporary Outfitters</a></h3>`;
          } else {
            return `<p>The {COMMONNAME} is part of {ADMINFORESTNAME}</p>` +
            `<p>For more information about this forest please visit <a href={URL}>{URL}</a>`;
          }
        }

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

      mapView.on('mouse-wheel', function(e) {
        warnUser('To zoom in please double click the map. Use zoom in/out buttons.');
      });
      // Trap attempted single touch panning.
      const pointers = new Map(); // javascript map
      mapView.on('pointer-down', function(e) {
        const { pointerId, pointerType, x, y } = e;
        if (pointerType !== 'touch') { return; }
        pointers.set(pointerId, { x, y});
      });

      mapView.on(['pointer-up', 'pointer-leave'], function(e) {
        const { pointerId, pointerType } = e;
        if (pointerType !== 'touch') { return; }
        pointers.delete(pointerId);
      });

      mapView.on('pointer-move', function(e) {
        const { pointerId, pointerType, x, y } = e;
        if (pointerType !== 'touch') { return; }
        if (pointers.size !== 1) { return; }
        const distance = Math.sqrt(
          Math.pow(x - pointers.get(pointerId).x, 2) +
          Math.pow(y - pointers.get(pointerId).y, 2)
        );
        if (distance < 20) { return; }
        warnUser('Please use two fingers to pan the map.');
      });
      // Display a warning.
      let timeout;
      function warnUser(warning) {
        const warningDiv = document.getElementById('warning');
        warningDiv.innerHTML = `<div class='message'>` + warning + `</div>`;
        if (timeout) {
          window.clearTimeout(timeout);
        }
        timeout = window.setTimeout(() => {
          warningDiv.innerHTML = '';
        }, 1500);
      }

      mapView.ui.add(searchWidget, 'top-right');

      map.add(geoJson);
      })
      .catch(err => {
        console.error(err);
      });
  }
}
