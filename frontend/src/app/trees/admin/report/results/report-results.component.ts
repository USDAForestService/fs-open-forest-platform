import { Component, Input } from '@angular/core';
import { ChristmasTreesApplicationService } from '../../../_services/christmas-trees-application.service';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';

@Component({
  selector: 'app-report-results',
  templateUrl: './report-results.component.html'
})
export class ReportResultsComponent {
  @Input() result: any;
  titles = {
    permitNumber: 'Permit Number',
    issueDate: 'Issue Date',
    quantity: 'Number of trees',
    totalCost: 'Permit cost'
  };
  constructor(private service: ChristmasTreesApplicationService) {}
  downloadReport() {
    this.result.permits.unshift(this.titles);
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: false,
      useBom: false
    };
    new Angular2Csv(this.result.permits, 'Christmas Trees Permits Report', options);
  }
}
