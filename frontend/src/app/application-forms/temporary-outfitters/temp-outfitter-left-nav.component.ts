import { ApplicationFieldsService } from '../_services/application-fields.service';
import { Component, HostListener, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UtilService } from '../../_services/util.service';

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
  scrollAmount: string;
  bottom: string;
  top: string;
  position: string;

  constructor(private applicationFieldsService: ApplicationFieldsService, private util: UtilService) {}

  /**
  * @param conrol  Individual form control to be validated
  * @returns       css class
  */
  getControlStatus(control: FormControl) {
    if (control && control.valid && control.touched) {
      return 'ng-valid';
    }
    if (control && control.untouched) {
      return 'ng-untouched';
    }
    if (control && control.invalid && control.touched) {
      return 'ng-invalid';
    }
  }

  /**
  * @param group  Form group to be validated
  * @returns      css class
  */
  getGroupStatus(group: FormGroup, errors) {
    if (group && group.valid) {
      if (group.untouched) {
        return 'ng-untouched';
      }
      return 'ng-valid';
    }
    if (errors) {
      return 'ng-invalid';
    }
    if (group && group.invalid && !errors) {
      return 'ng-untouched';
    }
  }

  @HostListener('document:scroll', ['$event'])
  public track(event: Event) {
    const nav = document.getElementById('sidebar-nav');
    const container = document.getElementById('application');
    const footer = document.getElementById('footer');

    if (nav) {
      if (container.getBoundingClientRect().top < 20) {
        this.top = '40px';
        this.bottom = 'auto';
        this.position = 'fixed';
      } else {
        this.top = '250px';
        this.position = 'absolute';
      }

      if (window.innerHeight < 720 && footer.getBoundingClientRect().top < 480) {
        const bottom = -Math.abs(footer.getBoundingClientRect().top) + 840;
        this.top = '-250px';
        this.position = 'fixed';
      }
    }
  }

  gotoHashtag(fragment: string, event) {
    this.currentSection = this.util.gotoHashtag(fragment, event);
  }

  ngOnChanges() {
    let field = null;
    switch (this.currentSection) {
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
