import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {TreesService} from '../../../../_services/trees.service';

@Component({
  selector: 'app-tree-locations-allowed',
  templateUrl: './tree-locations-allowed.component.html'
})


export class TreeLocationsAllowedComponent implements OnChanges {
  @Input() forest: any;
  allowedDistricts: any = [];
  constructor(public service: TreesService) {}

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
      if (district.childNodes.length && district.allowed) {
        this.allowedDistricts.push(district);
      }
    }

  }

  ngOnChanges() {
    if (this.forest && this.forest.locations) {
      this.populateDistricts();
    }
  }
}
