import { Component, Input, OnInit } from '@angular/core';
import { FilterPipe } from '../../../../_pipes/filter.pipe';
import { LineBreakFormatterPipe } from '../../../../_pipes/line-break-formatter.pipe';
import { UtilService } from '../../../../_services/util.service';

@Component({
  selector: 'app-tree-rules',
  templateUrl: './tree-rules.component.html',
  providers: [FilterPipe, LineBreakFormatterPipe]
})
export class TreeRulesComponent {
  @Input() forest: any;

  constructor(
    public util: UtilService
  ) {}

}
