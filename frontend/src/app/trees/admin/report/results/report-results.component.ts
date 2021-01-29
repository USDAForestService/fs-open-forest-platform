import { Component, Input, OnChanges } from '@angular/core';
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';

@Component({
  selector: 'app-report-results',
  templateUrl: './report-results.component.html'
})
export class ReportResultsComponent implements OnChanges {
  @Input() result: any;
  permits: any;
  titles = {
    forestAbbr: 'Forest',
    forestNameShort: 'Forest',
    permitNumber: 'Permit number',
    issueDate: 'Issue date',
    quantity: 'Number of trees',
    totalCost: 'Permit cost',
    expireDate: 'Expiration date'
  };

  /**
   * Set this.permits on changes, and insert titles
   */
  ngOnChanges() {
    this.permits = this.result.permits;
    this.permits.unshift(this.titles);
  }

  /**
   * Download csv report of permits
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

    const orderedPermits = [];
    for (const permit of this.result.permits) {
      orderedPermits.push({
        forestNameShort: permit.forestNameShort,
        permitNumber: permit.permitNumber,
        issueDate: permit.issueDate,
        quantity: permit.quantity,
        totalCost: permit.totalCost,
        expireDate: permit.expireDate
      });
    }

    const ng2csv = new AngularCsv(orderedPermits, 'Christmas Trees Permits Report', options);
  }
}
