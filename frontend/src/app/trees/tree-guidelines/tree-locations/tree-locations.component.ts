import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tree-locations',
  templateUrl: './tree-locations.component.html'
})
export class TreeLocationsComponent {
  @Input() forest: any;
}
