import {Component, Input, OnChanges} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-tree-locations-allowed',
  templateUrl: './tree-locations-allowed.component.html'
})
export class TreeLocationsAllowedComponent implements OnChanges {
  @Input() forest: any;
  allowedDistricts: any;
  arrayOfDistrictKeys: any;

  getAllowedDistricts() {
    const locations = this.forest.locations;
    const districts = Object.create(null);

    locations.forEach(location => (districts[location.district] = { ...location, childNodes: [] }));

    delete districts.null;

    const districtsTree = [];

    locations.forEach(location => {
      if (location.district) {
        districts[location.district].childNodes.push(location);
      } else {
        districtsTree.push(districts[location]);
      }
    });

    this.allowedDistricts = districts;
    this.arrayOfDistrictKeys = Object.keys(this.allowedDistricts);

  }

  ngOnChanges() {
    if (this.forest && this.forest.locations) {
      this.getAllowedDistricts();
    }
  }
}