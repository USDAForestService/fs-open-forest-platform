import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cutting-rules',
  templateUrl: './cutting-rules.component.html'
})
export class TreeCuttingRulesComponent {
  @Input() forest: any;
}
