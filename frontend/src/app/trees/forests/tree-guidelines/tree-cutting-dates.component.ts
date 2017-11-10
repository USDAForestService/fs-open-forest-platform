import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tree-cutting-dates',
  templateUrl: './tree-cutting-dates.component.html'
})
export class TreeCuttingDatesComponent {
  @Input() forest: any;
}
