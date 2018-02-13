import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-tree-locations-prohibited',
  templateUrl: './tree-locations-prohibited.component.html'
})
export class TreeLocationsProhibitedComponent {
  @Input() forest: any;
  prohibitedDistricts: any = [];

  constructor() {}

}
