import { ApplicationFieldsService } from '../_services/application-fields.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-temp-outfitter-left-nav',
  templateUrl: './temp-outfitter-left-nav.component.html'
})
export class TempOutfitterLeftNavComponent implements OnInit {
  @Input() applicationForm: any;
  applicantInfoErrors: boolean;
  activityDescriptionErrors: boolean;
  experienceErrors: boolean;

  constructor(private applicationFieldsService: ApplicationFieldsService) {}

  ngOnInit() {
    this.applicationForm.controls.applicantInfo.valueChanges.subscribe(data => {
      this.applicantInfoErrors = this.applicationFieldsService.doesControlHaveErrors(
        this.applicationForm.controls.applicantInfo
      );
      // this.activityDescriptionErrors = this.applicationFieldsService.doesControlHaveErrors(
      //   this.applicationForm.controls.tempOutfitterFields.controls.activityDescriptionFields
      // );
      // this.experienceErrors = this.applicationFieldsService.doesControlHaveErrors(
      //   this.applicationForm.controls.tempOutfitterFields.controls.experienceFields
      // );
    });
  }
}
