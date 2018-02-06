import { Component, Input, OnChanges } from '@angular/core';
import { ChristmasTreesApplicationService } from '../../../_services/christmas-trees-application.service';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';

@Component({
  selector: 'app-report-results',
  templateUrl: './report-results.component.html'
})
export class ReportResultsComponent implements OnChanges {
  @Input() result: any;
  permits: any;
  titles = {
    permitNumber: 'Permit number',
    issueDate: 'Issue date',
    quantity: 'Number of trees',
    totalCost: 'Permit cost',
    expireDate: 'Expiration date'
  };

  ngOnChanges() {
    this.permits = this.result.permits;
    this.permits.unshift(this.titles);
  }

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
        permitNumber: permit.permitNumber,
        issueDate: permit.issueDate,
        quantity: permit.quantity,
        totalCost: permit.totalCost,
        expireDate: permit.expireDate
      });
    }

    const ng2csv = new Angular2Csv(orderedPermits, 'Christmas Trees Permits Report', options);
  }
}
