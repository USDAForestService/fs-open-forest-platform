import { Component, Input, OnChanges } from '@angular/core';
import { FilterPipe } from '../../../_pipes/filter.pipe';
import { LineBreakFormatterPipe } from '../../../_pipes/line-break-formatter.pipe';
import { UtilService } from '../../../_services/util.service';

@Component({
  selector: 'app-tree-permit-rules',
  templateUrl: './tree-permit-rules.component.html',
  providers: [FilterPipe, LineBreakFormatterPipe]
})
export class TreePermitRulesComponent {
  @Input() forest: any;

  constructor(private filter: FilterPipe, private lineBreakFormatter: LineBreakFormatterPipe, public util: UtilService) {}


}
