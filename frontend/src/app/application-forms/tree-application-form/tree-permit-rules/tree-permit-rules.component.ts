import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FilterPipe } from '../../../_pipes/filter.pipe';
import { LineBreakFormatterPipe } from '../../../_pipes/line-break-formatter.pipe';
import { MarkdownService } from 'ngx-md';
import { ForestService } from '../../../trees/_services/forest.service';

@Component({
  selector: 'app-tree-permit-rules',
  templateUrl: './tree-permit-rules.component.html',
  providers: [FilterPipe, LineBreakFormatterPipe]
})
export class TreePermitRulesComponent implements OnInit {
  @Input() forest: any;

  constructor(
    private forestService: ForestService,
    public markdownService: MarkdownService
  ) {}

  ngOnInit() {
    if (this.forest) {
      this.forestService.updateMarkdownText(this.markdownService, this.forest);
    }
  }


}
