import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tree-cutting-rules',
  templateUrl: './tree-cutting-rules.component.html'
})
export class TreeCuttingRulesComponent {
  @Input() forest: any;
}
