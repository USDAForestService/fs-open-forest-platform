import { Component, Input, OnInit } from '@angular/core';
import { FilterPipe } from '../../../../_pipes/filter.pipe';
import * as moment from 'moment-timezone';
import { MarkdownService } from 'ngx-md';

@Component({
  selector: 'app-tree-cutting-dates',
  templateUrl: './tree-cutting-dates.component.html',
  providers: [FilterPipe]
})
export class TreeCuttingDatesComponent implements OnInit {
  @Input() forest: any;

  constructor(public markdown: MarkdownService) {}

  /**
   *  Sets value isSeasonConfigured if forest start date is after today.
   */
  ngOnInit() {
    if (this.forest) {
      this.forest.isSeasonConfigured = moment(this.forest.startDate)
        .tz(this.forest.timezone)
        .isAfter(moment().tz(this.forest.timezone));
    }
  }
}
