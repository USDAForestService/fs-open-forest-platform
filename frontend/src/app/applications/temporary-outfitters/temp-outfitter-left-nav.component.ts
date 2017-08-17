import { ApplicationFieldsService } from '../_services/application-fields.service';
import { Component, Input, OnInit, OnChanges, HostListener } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-temp-outfitter-left-nav',
  templateUrl: './temp-outfitter-left-nav.component.html'
})
export class TempOutfitterLeftNavComponent implements OnInit, OnChanges {
  @Input() applicationForm: any;
  @Input() currentSection: any;
  applicantInfoErrors: boolean;
  activityDescriptionErrors: boolean;
  experienceErrors: boolean;
  stickySidebar: boolean;
  pushSidebarUp: boolean;

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
      if (group.untouched) {
        return 'ng-untouched';
      }
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
    this.stickySidebar = window.scrollY > 220 ? true : false;
    this.pushSidebarUp = window.scrollY > 7000 ? true : false;
  }

  gotoHashtag(fragment: string) {
    const element = document.querySelector('#' + fragment);
    if (element) {
      element.scrollIntoView();
      this.currentSection = fragment;
    }
  }

  ngOnChanges() {
    let field = null;
    switch (this.currentSection) {
      case 'section-advertising':
        field = this.applicationForm.controls.tempOutfitterFields.controls.advertisingURL;
        break;
      case 'section-guide-identification':
        field = this.applicationForm.controls.guideIdentification;
        break;
      case 'section-operating-plan':
        field = this.applicationForm.controls.operatingPlan;
        break;
      case 'section-acknowledgement-of-risk':
        field = this.applicationForm.controls.acknowledgementOfRisk;
        break;
      case 'section-experience':
        field = this.applicationForm.controls.tempOutfitterFields.controls.experienceFields.controls
          .listAllNationalForestPermits;
        break;
    }

    if (field) {
      this.applicationFieldsService.touchField(field);
    }
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
