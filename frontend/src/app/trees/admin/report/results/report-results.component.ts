import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-report-results',
  templateUrl: './report-results.component.html'
})
export class ReportResultsComponent {
  @Input() result: any;
  constructor() {}
}
