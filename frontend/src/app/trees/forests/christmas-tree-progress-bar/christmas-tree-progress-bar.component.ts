import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tree-progress-bar',
  templateUrl: './christmas-tree-progress-bar.component.html'
})

export class ChristmasTreeProgressBarComponent {
  @Input() step: any;
  constructor() {

  }
}
