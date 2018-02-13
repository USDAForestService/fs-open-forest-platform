import { Component, Input } from '@angular/core';
import { ForestService } from '../../../_services/forest.service';
import { UtilService } from '../../../../_services/util.service';

@Component({
  selector: 'app-tree-trip-planning',
  templateUrl: './trip-planning.component.html'
})
export class TripPlanningComponent {
  @Input() forest: any;

  constructor(public util: UtilService) {}
}
