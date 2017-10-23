import {Component, Input, OnChanges} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-tree-locations-prohibited',
  templateUrl: './tree-locations-prohibited.component.html'
})
export class TreeLocationsProhibitedComponent {
  @Input() forest: any;

}
