import { Component, Input, OnInit } from '@angular/core';
import { FilterPipe } from '../../../../_pipes/filter.pipe';
import { LineBreakFormatterPipe } from '../../../../_pipes/line-break-formatter.pipe';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-tree-cutting-dates',
  templateUrl: './tree-cutting-dates.component.html',
  providers: [FilterPipe, LineBreakFormatterPipe]
})
export class TreeCuttingDatesComponent implements OnInit {
  @Input() forest: any;

  constructor() {}

  ngOnInit() {
    if (this.forest) {
      this.forest.isSeasonConfigured = moment(this.forest.startDate)
        .tz(this.forest.timezone)
        .isAfter(moment().tz(this.forest.timezone));
    }

  }
}
