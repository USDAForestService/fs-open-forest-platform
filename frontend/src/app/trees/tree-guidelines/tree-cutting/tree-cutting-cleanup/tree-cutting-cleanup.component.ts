import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-tree-cutting-cleanup',
  templateUrl: './tree-cutting-cleanup.component.html'
})
export class TreeCuttingCleanupComponent implements OnInit {
  @Input() forest: any;
  prohibitedTree = null;

  constructor(private sanitizer: DomSanitizer) {
  }
  findTreeByName(name) {
    for (const species of this.forest.species) {
      if (species.name === name) {
        return species;
      }
    }
  }
  ngOnInit() {
    this.prohibitedTree = this.findTreeByName('Pacific Yew')
  }
}
