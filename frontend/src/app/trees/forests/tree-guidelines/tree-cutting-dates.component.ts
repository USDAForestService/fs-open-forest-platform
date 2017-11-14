import { Component, Input } from '@angular/core';
import { FilterPipe } from '../../../_pipes/filter.pipe';

@Component({
  selector: 'app-tree-cutting-dates',
  templateUrl: './tree-cutting-dates.component.html',
  providers: [FilterPipe]
})
export class TreeCuttingDatesComponent {
  @Input() forest: any;

  constructor(private filter: FilterPipe) {}
}
