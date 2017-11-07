import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tree-cutting',
  templateUrl: './tree-cutting.component.html'
})
export class TreeCuttingComponent {
  @Input() forest: any;
}
