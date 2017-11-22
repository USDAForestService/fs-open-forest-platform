import { Component, Input } from '@angular/core';
import { TreesService } from '../../../_services/trees.service';

@Component({
  selector: 'app-tree-trip-planning',
  templateUrl: './trip-planning.component.html'
})
export class TripPlanningComponent {
  @Input() forest: any;

  constructor(public service: TreesService) {}
}
