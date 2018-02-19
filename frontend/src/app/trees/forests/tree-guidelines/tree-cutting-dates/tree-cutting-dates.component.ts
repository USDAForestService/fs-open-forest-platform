import { Component, Input, OnInit } from '@angular/core';
import { FilterPipe } from '../../../../_pipes/filter.pipe';
import { LineBreakFormatterPipe } from '../../../../_pipes/line-break-formatter.pipe';
import * as moment from 'moment-timezone';
import { MarkdownService } from 'ngx-md';

@Component({
  selector: 'app-tree-cutting-dates',
  templateUrl: './tree-cutting-dates.component.html',
  providers: [FilterPipe, LineBreakFormatterPipe]
})
export class TreeCuttingDatesComponent implements OnInit {
  @Input() forest: any;

  constructor(public markdown: MarkdownService) {}

  ngOnInit() {
    if (this.forest) {
      this.forest.isSeasonConfigured = moment(this.forest.startDate)
        .tz(this.forest.timezone)
        .isAfter(moment().tz(this.forest.timezone));
    }

      this.markdown.renderer.heading = (text, level) => {
        if (level === 4) {
          return `<span class='usa-label'>${text}</span><br/>`;
        } else {
          return `<h${level}>${text}</h${level}>`;
        }
      };

  }
}
