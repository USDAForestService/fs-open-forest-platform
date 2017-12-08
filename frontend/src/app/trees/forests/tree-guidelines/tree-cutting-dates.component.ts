import {Component, Input, OnChanges} from '@angular/core';
import { FilterPipe } from '../../../_pipes/filter.pipe';
import { LineBreakFormatterPipe } from '../../../_pipes/line-break-formatter.pipe';
import { TreeDistrictsUtilService } from './tree-districts-util.service';

@Component({
  selector: 'app-tree-cutting-dates',
  templateUrl: './tree-cutting-dates.component.html',
  providers: [FilterPipe, LineBreakFormatterPipe]
})
export class TreeCuttingDatesComponent implements OnChanges {
  @Input() forest: any;
  districtsWithHoursAndDates: any = [];
  districtsWithPermits: any = [];

  constructor(private filter: FilterPipe, private lineBreakFormatter: LineBreakFormatterPipe, public districtUtil: TreeDistrictsUtilService) {}

  populateDistricts() {
    const locations = this.forest.locations;
    const districts = this.districtUtil.mapLocationsToDistricts(locations);
    this.districtUtil.reduceLocations(locations, districts);

    for (const key of Object.keys(districts)) {
      const district = districts[key];
      const areaLocations = district.locations.filter( location => location.type.startsWith('cutting-area'));
      if (areaLocations.length) {
        district.locations = areaLocations;
        this.districtsWithHoursAndDates.push(district);
      }
      const permitLocations = district.locations.filter( location => location.type === 'district-permits');
      if (permitLocations.length) {
        district.locations = permitLocations;
        this.districtsWithPermits.push(district);
      }
    }
  }

  ngOnChanges() {
    if (this.forest && this.forest.locations) {
      this.populateDistricts();
    }
  }
}
