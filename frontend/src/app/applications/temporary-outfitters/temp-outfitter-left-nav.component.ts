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
  scrollAmount: string;
  bottom: string;
  top: string;
  position: string;

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
    const nav = document.getElementById('temp-outfitter-nav');
    const footer = document.getElementById('footer');

    if (nav) {
      if (nav.getBoundingClientRect().top < 20) {
        this.top = '40px';
        this.bottom = 'auto';
        this.position = 'fixed';
      }

      if (footer.getBoundingClientRect().top < 700) {
        const bottom = -Math.abs(footer.getBoundingClientRect().top) + 740;
        this.top = 'auto';
        this.bottom = bottom.toString() + 'px';
        this.position = 'fixed';
      }
    }

    let scrollPosition = window.scrollY;

    if (scrollPosition < 200) {
      this.top = '250px';
      this.position = 'absolute';
    }

    if (scrollPosition > 400 && scrollPosition < 7100) {
      scrollPosition = scrollPosition - 100;
    }

    if (window.innerWidth > 1199 && scrollPosition > 7100) {
      scrollPosition = 7100;
    }

    if (window.innerWidth < 1200 && scrollPosition > 7500) {
      scrollPosition = 7500;
    }
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
