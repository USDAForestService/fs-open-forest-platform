import {Component, Input, OnChanges} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-tree-locations-maps',
  templateUrl: './tree-locations-maps.component.html'
})
export class TreeLocationsMapsComponent {
  @Input() forest: any;

}
