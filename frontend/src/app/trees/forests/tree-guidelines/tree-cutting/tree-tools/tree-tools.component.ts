import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-tree-tools',
  templateUrl: './tree-tools.component.html'
})
export class TreeToolsComponent {
  @Input() forest: any;
}
