import { Component, Input, OnInit } from '@angular/core';
import { FilterPipe } from '../../../_pipes/filter.pipe';
import { NgxMdModule } from 'ngx-md';

@Component({
  selector: 'app-tree-permit-rules',
  templateUrl: './tree-permit-rules.component.html',
  providers: [FilterPipe]
})
export class TreePermitRulesComponent implements OnInit {
  @Input() forest: any;

  constructor(public markdownService: NgxMdModule) {}

  /**
   * Update markdown text with forest specific variables
   */
  ngOnInit() {
    if (this.forest) {
    }
  }
}
