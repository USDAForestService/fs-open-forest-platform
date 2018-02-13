import { Component, Input, OnInit } from '@angular/core';
import { ForestContentService } from '../../../../_services/forest-content.service';

@Component({
  selector: 'app-tree-species',
  templateUrl: './tree-species.component.html'
})
export class TreeSpeciesComponent implements OnInit {
  @Input() forest: any;
  species: any;

  constructor(public forestContentService: ForestContentService) {}
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
    this.forestContentService.getJSON(this.forest.forestAbbr).subscribe(speciesData => {
      this.species = speciesData.treeSpecies;
    });
  }
}
