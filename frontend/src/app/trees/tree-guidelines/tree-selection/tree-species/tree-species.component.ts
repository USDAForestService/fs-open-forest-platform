import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tree-species',
  templateUrl: './tree-species.component.html'
})
export class TreeSpeciesComponent {
  @Input() forest: any;

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
}
