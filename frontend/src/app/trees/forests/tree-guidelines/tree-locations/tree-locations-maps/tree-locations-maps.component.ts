import { Component, Input, OnChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FilterPipe } from '../../../../../_pipes/filter.pipe';

@Component({
  selector: 'app-tree-locations-maps',
  templateUrl: './tree-locations-maps.component.html',
  providers: [FilterPipe]
})
export class TreeLocationsMapsComponent {
  @Input() forest: any;
  constructor(private filter: FilterPipe) {}
}
