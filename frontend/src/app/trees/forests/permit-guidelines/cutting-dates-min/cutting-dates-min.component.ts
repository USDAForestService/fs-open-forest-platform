import { Component, Input, OnInit } from '@angular/core';
import { FilterPipe } from '../../../../_pipes/filter.pipe';
import * as moment from 'moment-timezone';
import { NgxMdModule } from 'ngx-md';

@Component({
  selector: 'app-cutting-dates-min',
  templateUrl: './cutting-dates-min.component.html',
  providers: [FilterPipe]
})
export class CuttingDatesMinComponent implements OnInit {
  @Input() forest: any;

  constructor(public markdown: NgxMdModule) {}

  /**
   *  Sets value isSeasonConfigured if forest start date is after today.
   */
  ngOnInit() {
    if (this.forest) {
      this.forest.isSeasonConfigured = moment(this.forest.startDate)
        .isAfter(moment());
    }
  }
}
