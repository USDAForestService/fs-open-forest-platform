import { Component, Input, OnChanges } from '@angular/core';
// import { Angular2Csv } from 'angular2-csv';

@Component({
  selector: 'app-feedback-review',
  templateUrl: './feedback-review.component.html'
})
export class AdminFeedbackReviewComponent implements OnInit {
  @Input() result: any;
  entries: any;

  /**
   * Set this.entries on changes
   */

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
   * Download csv report of permits
   */
  // downloadReport() {
  //   const options = {
  //     fieldSeparator: ',',
  //     quoteStrings: '"',
  //     decimalseparator: '.',
  //     showLabels: true,
  //     showTitle: false,
  //     useBom: false
  //   };
  //
  //   const orderedPermits = [];
  //   for (const permit of this.result.permits) {
  //     orderedPermits.push({
  //       forestNameShort: permit.forestNameShort,
  //       permitNumber: permit.permitNumber,
  //       issueDate: permit.issueDate,
  //       quantity: permit.quantity,
  //       totalCost: permit.totalCost,
  //       expireDate: permit.expireDate
  //     });
  //   }
  //
  //   const ng2csv = new Angular2Csv(orderedPermits, 'Christmas Trees Permits Report', options);
  // }
}
