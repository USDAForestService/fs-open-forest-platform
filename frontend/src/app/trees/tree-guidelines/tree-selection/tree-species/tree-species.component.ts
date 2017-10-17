import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tree-species',
  templateUrl: './tree-species.component.html'
})
export class TreeSpeciesComponent {
  @Input() forest: any;
}
