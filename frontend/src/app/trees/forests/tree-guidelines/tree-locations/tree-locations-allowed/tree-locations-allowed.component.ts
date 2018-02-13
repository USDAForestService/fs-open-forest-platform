import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-tree-locations-allowed',
  templateUrl: './tree-locations-allowed.component.html'
})
export class TreeLocationsAllowedComponent {
  @Input() forest: any;
  constructor() {}


}
