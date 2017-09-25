import { Component, Input, OnInit } from '@angular/core';
import { ApplicationService } from '../../_services/application.service';
import { environment } from '../../../environments/environment';

@Component({
  providers: [],
  selector: 'app-temp-outfitter-details',
  templateUrl: './temp-outfitter-details.component.html'
})
export class TempOutfitterDetailsComponent implements OnInit {
  @Input() application: any;
  files: any;
  url: string;

  constructor(private applicationService: ApplicationService) {
    this.url = environment.apiUrl;
  }

  getFiles() {
    this.applicationService
      .get(`/special-uses/temp-outfitter/${this.application.applicationId}/files`)
      .subscribe(files => (this.files = files));
  }

  ngOnInit() {
    this.getFiles();
  }
}
