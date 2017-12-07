import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FilterPipe } from '../../../../../_pipes/filter.pipe';
import { TreeDistrictsUtilService } from '../../tree-districts-util.service';

@Component({
  selector: 'app-tree-locations-prohibited',
  templateUrl: './tree-locations-prohibited.component.html',
  providers: [FilterPipe]
})
export class TreeLocationsProhibitedComponent implements OnChanges {
  @Input() forest: any;
  prohibitedDistricts: any = [];

  constructor(private filter: FilterPipe, public districtUtil: TreeDistrictsUtilService) {}

  populateDistricts() {
    const locations = this.forest.locations;
    const districts = this.districtUtil.mapLocationsToDistricts(locations);
    this.districtUtil.reduceLocations(locations, districts);

    for (const key of Object.keys(districts)) {
      const district = districts[key];
      if (district.locations.length && !district.allowed) {
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
