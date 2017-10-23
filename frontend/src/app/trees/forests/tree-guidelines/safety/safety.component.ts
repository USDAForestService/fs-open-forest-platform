import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tree-safety-info',
  templateUrl: './safety.component.html'
})
export class TreeSafetyComponent {
  @Input() forest: any;
}
