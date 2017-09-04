import { Component, Input, OnInit } from '@angular/core';
import { ApplicationService } from '../../_services/application.service';

@Component({
  providers: [],
  selector: 'app-temp-outfitter-details',
  templateUrl: './temp-outfitter-details.component.html'
})
export class TempOutfitterDetailsComponent implements OnInit {
  @Input() application: any;
  files: any;

  constructor(private applicationService: ApplicationService) {}

  getFiles() {
    this.applicationService
      .get(`/special-uses/temp-outfitter/${this.application.applicationId}/files`)
      .subscribe(files => (this.files = files));
  }

  ngOnInit() {
    this.getFiles();
  }
}
