import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UtilService } from '../../../../../_services/util.service';
import { TreeDistrictsUtilService } from '../../tree-districts-util.service';

@Component({
  selector: 'app-tree-locations-allowed',
  templateUrl: './tree-locations-allowed.component.html'
})
export class TreeLocationsAllowedComponent implements OnChanges {
  @Input() forest: any;
  allowedDistricts: any = [];
  constructor(public util: UtilService, public districtUtil: TreeDistrictsUtilService) {}

  populateDistricts() {
    const locations = this.forest.locations;
    const districts = this.districtUtil.mapLocationsToDistricts(locations);
    this.districtUtil.reduceLocations(locations, districts);

    for (const key of Object.keys(districts)) {
      const district = districts[key];
      if (district.locations.length && district.allowed) {
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
