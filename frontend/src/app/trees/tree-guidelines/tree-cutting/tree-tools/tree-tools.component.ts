import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-tree-tools',
  templateUrl: './tree-tools.component.html'
})
export class TreeToolsComponent implements OnInit {
  @Input() forest: any;
  prohibitedTree = {};

  constructor(public sanitizer: DomSanitizer) {}

  findTreeByName(name) {
    if (this.forest.species != null && this.forest.species.length) {
      for (const species of this.forest.species) {
        if (species.name === name) {
          return species;
        }
      }
    }
  }
  ngOnInit() {
    this.prohibitedTree = this.findTreeByName('Pacific Yew');
  }
}
