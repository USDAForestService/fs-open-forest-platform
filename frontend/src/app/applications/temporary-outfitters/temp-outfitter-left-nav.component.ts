import { ApplicationFieldsService } from '../_services/application-fields.service';
import { Component, Input, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-temp-outfitter-left-nav',
  templateUrl: './temp-outfitter-left-nav.component.html'
})
export class TempOutfitterLeftNavComponent implements OnInit {
  @Input() applicationForm: any;
  @Input() currentSection: any;
  applicantInfoErrors: boolean;
  activityDescriptionErrors: boolean;
  experienceErrors: boolean;
  fixedSidebar: boolean;

  constructor(private applicationFieldsService: ApplicationFieldsService) {}

  getControlStatus(control: FormControl) {
    if (control.valid && control.touched) {
      return 'ng-valid';
    }
    if (control.untouched) {
      return 'ng-untouched';
    }
    if (control.invalid && control.touched) {
      return 'ng-invalid';
    }
  }

  getGroupStatus(group: FormGroup, errors) {
    if (group.valid) {
      return 'ng-valid';
    }
    if (errors) {
      return 'ng-invalid';
    }
    if (group.invalid && !errors) {
      return 'ng-untouched';
    }
  }

  @HostListener('document:scroll', ['$event'])
  public track(event: Event) {
    this.fixedSidebar = window.scrollY > 220 ? true : false;
  }

  ngOnInit() {
    this.applicationForm.valueChanges.subscribe(data => {
      this.applicantInfoErrors = this.applicationFieldsService.doesControlHaveErrors(
        this.applicationForm.controls.applicantInfo
      );
      this.activityDescriptionErrors = this.applicationFieldsService.doesControlHaveErrors(
        this.applicationForm.controls.tempOutfitterFields.controls.activityDescriptionFields
      );
      this.experienceErrors = this.applicationFieldsService.doesControlHaveErrors(
        this.applicationForm.controls.tempOutfitterFields.controls.experienceFields
      );
    });
  }
}
