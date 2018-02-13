import { Component, Input, OnInit } from '@angular/core';
import { ForestService } from '../../../../_services/forest.service';

@Component({
  selector: 'app-tree-species',
  templateUrl: './tree-species.component.html'
})
export class TreeSpeciesComponent implements OnInit {
  @Input() forest: any;
  species: any;

  constructor(public forestService: ForestService) {}
  statusClass(status) {
    let css_class = '';
    switch (status) {
      case 'prohibited':
        css_class = 'danger';
        break;
      case 'recommended':
        css_class = 'success';
        break;
      case 'not recommended':
        css_class = 'tan';
        break;
    }
    return css_class;
  }
  ngOnInit() {
    this.forestService.getJSON(this.forest.forestAbbr).subscribe(speciesData => {
      this.species = speciesData.treeSpecies;
    });
  }
}
