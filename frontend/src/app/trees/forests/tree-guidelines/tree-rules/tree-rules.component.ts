import { Component, Input, OnInit } from '@angular/core';
import { FilterPipe } from '../../../../_pipes/filter.pipe';
import { UtilService } from '../../../../_services/util.service';

@Component({
  selector: 'app-tree-rules',
  templateUrl: './tree-rules.component.html',
  providers: [FilterPipe]
})
export class TreeRulesComponent {
  @Input() forest: any;

  constructor(public util: UtilService) {}
}
