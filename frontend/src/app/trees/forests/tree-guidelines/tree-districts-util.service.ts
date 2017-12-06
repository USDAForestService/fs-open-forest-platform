import { Injectable } from '@angular/core';

@Injectable()
export class TreeDistrictsUtilService {

  public mapLocationsToDistricts(locations: any) {
    const districts = Object.create(null);
    locations.forEach(location => (districts[location.district] = {...location, locations: []}));

    delete districts.null;

    return districts;

  }

  public reduceLocations(locations: any, districts: any) {
    const districtsTree = [];

    locations.forEach(location => {
      if (location.district) {
        districts[location.district].locations.push(location);
      } else {
        districtsTree.push(districts[location]);
      }
    });

  }
}
