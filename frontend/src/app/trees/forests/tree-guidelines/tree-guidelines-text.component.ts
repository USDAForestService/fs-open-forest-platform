import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tree-guidelines-text',
  templateUrl: './tree-guidelines-text.component.html'
})
export class TreeGuidelinesTextComponent {
  @Input() forest: any;
}
