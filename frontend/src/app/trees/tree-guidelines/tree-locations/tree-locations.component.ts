import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-tree-locations',
  templateUrl: './tree-locations.component.html'
})
export class TreeLocationsComponent implements OnChanges {
  @Input() forest: any;
  allowedDistricts: any;
  arrayOfDistrictKeys: any;

  getAllowedDistricts() {
    let locations = this.forest.locations;
    let districts = Object.create(null);

    locations.forEach(location => (districts[location.district] = { ...location, childNodes: [] }));

    delete districts.null;

    let districtsTree = [];

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
