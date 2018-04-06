import { Component, Input, OnInit } from '@angular/core';
import { FilterPipe } from '../../../_pipes/filter.pipe';
import { MarkdownService } from 'ngx-md';
import { ChristmasTreesInfoService } from '../../../trees/_services/christmas-trees-info.service';

@Component({
  selector: 'app-tree-permit-rules',
  templateUrl: './tree-permit-rules.component.html',
  providers: [FilterPipe]
})
export class TreePermitRulesComponent implements OnInit {
  @Input() forest: any;

  constructor(private christmasTreesInfoService: ChristmasTreesInfoService, public markdownService: MarkdownService) {}

  /**
   * Update markdown text with forest specific variables
   */
  ngOnInit() {
    if (this.forest) {
      this.christmasTreesInfoService.updateMarkdownText(this.markdownService, this.forest);
    }
  }
}
