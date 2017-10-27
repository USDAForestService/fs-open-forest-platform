import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FilterPipe } from '../../../../../_pipes/filter.pipe';

@Component({
  selector: 'app-tree-locations-prohibited',
  templateUrl: './tree-locations-prohibited.component.html'
})
export class TreeLocationsProhibitedComponent implements OnChanges {
  @Input() forest: any;
  prohibitedDistricts: any = [];

  constructor(private filter: FilterPipe) {}

  populateDistricts() {
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

    for (const key of Object.keys(districts)) {
      const district = districts[key];
      if (district.childNodes.length && !district.allowed) {
        this.prohibitedDistricts.push(district);
      }
    }
  }

  ngOnChanges() {
    if (this.forest && this.forest.locations) {
      this.populateDistricts();
    }
  }
}
