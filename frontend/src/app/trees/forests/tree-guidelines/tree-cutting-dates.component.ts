import {Component, Input, OnChanges} from '@angular/core';
import { FilterPipe } from '../../../_pipes/filter.pipe';
import { LineBreakFormatterPipe } from '../../../_pipes/line-break-formatter.pipe';

@Component({
  selector: 'app-tree-cutting-dates',
  templateUrl: './tree-cutting-dates.component.html',
  providers: [FilterPipe, LineBreakFormatterPipe]
})
export class TreeCuttingDatesComponent implements OnChanges {
  @Input() forest: any;
  districtsWithHoursAndDates: any = [];
  districtsWithPermits: any = [];

  constructor(private filter: FilterPipe, private lineBreakFormatter: LineBreakFormatterPipe) {}

  populateDistricts() {
    const locations = this.forest.locations;
    const districts = Object.create(null);

    locations.forEach(location => (districts[location.district] = { ...location, locations: [] }));

    delete districts.null;

    const districtsTree = [];

    locations.forEach(location => {
      if (location.district) {
        districts[location.district].locations.push(location);
      } else {
        districtsTree.push(districts[location]);
      }
    });

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
