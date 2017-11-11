import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-tree-tools',
  templateUrl: './tree-tools.component.html'
})
export class TreeToolsComponent implements OnChanges {
  @Input() forest: any;
  prohibitedTree = {};

  findTreeByName(name) {
    if (this.forest.species != null && this.forest.species.length) {
      for (const species of this.forest.species) {
        if (species.name === name) {
          return species;
        }
      }
    }
  }
  ngOnChanges() {
    this.prohibitedTree = this.findTreeByName('Pacific Yew');
  }
}
