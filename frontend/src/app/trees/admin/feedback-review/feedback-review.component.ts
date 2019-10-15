import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Angular2Csv } from 'angular2-csv';

@Component({
  selector: 'app-feedback-review',
  templateUrl: './feedback-review.component.html'
})
export class AdminFeedbackReviewComponent implements OnInit {
  @Input() result: any;
  entries: any;

  ngOnInit() {
    this.entries = [{
      date: 1,
      forest: 'arapaho',
      feedback: 'beautiful forest'
    }, {
      date: 4,
      forest: 'okewan',
      feedback: 'one of the best forests ever'
    }]
  }

  /**
   * Download csv report of feedback entries
   */
  downloadReport() {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: false,
      useBom: false
    };

    const ng2csv = new Angular2Csv(this.entries, 'Feedback Report', options);
  }
}
