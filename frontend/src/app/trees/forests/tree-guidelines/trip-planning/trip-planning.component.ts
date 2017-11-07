import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tree-trip-planning',
  templateUrl: './trip-planning.component.html'
})
export class TripPlanningComponent {
  @Input() forest: any;
}
