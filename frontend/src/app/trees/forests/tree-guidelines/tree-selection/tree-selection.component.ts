import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tree-selection',
  templateUrl: './tree-selection.component.html'
})
export class TreeSelectionComponent {
  @Input() forest: any;
}
