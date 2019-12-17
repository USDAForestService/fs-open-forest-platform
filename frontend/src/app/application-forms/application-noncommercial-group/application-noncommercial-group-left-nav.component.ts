import { ApplicationFieldsService } from '../_services/application-fields.service';
import { Component, HostListener, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UtilService } from '../../_services/util.service';

@Component({
  selector: 'app-noncommercial-group-left-nav',
  templateUrl: './application-noncommercial-group-left-nav.component.html'
})
export class ApplicationNoncommercialGroupLeftNavComponent implements OnInit, OnChanges {
  @Input() applicationForm: any;
  @Input() currentSection: any;
  applicantInfoErrors: boolean;
  activityDescriptionErrors: boolean;
  eventDetailsErrors: boolean;
  signatureGroupErrors: boolean;
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

  /**
  * @param group  Form group to be validated
  * @returns      css class
  */
  getEventGroupStatus(group: FormGroup, errors) {
    let event_name = this.applicationForm.controls.eventName;
    let noncommerc = this.applicationForm.controls.noncommercialFields;
    let date_time_range = this.applicationForm.controls.dateTimeRange;
    let controls = [];
    let status = 'ng-untouched';
    let allValid = true;

    // get all the event controls
    controls.push(event_name);
    for (let i in noncommerc.controls) {
      controls.push(noncommerc.controls[i])
    }
    for (let i in date_time_range.controls) {
      controls.push(date_time_range.controls[i])
    }

    // if all the event controls are valid, show the valid symbol in the left nav
    for (let i in controls) {
      let control = controls[i]
      if (control.invalid) {
        allValid = false;
      }
    }
    if (allValid) {
      status = 'ng-valid';
      return status;
    }

    // if one of the fields has been touched and is invalid show the error symbol in the left nav
    for (let i in controls) {
      let control = controls[i]
      if (control.invalid && control.touched) {
        status = 'ng-invalid';
        return status;
      }
    }

    return status;
  }

  /**
  * @param advertControls  Form group to be validated
  * @returns      css class
  */
  getAdvertStatus(advertControls) {
    if (this.getControlStatus(advertControls.advertisingURL) === 'ng-valid') {
      return true;
    }
    if (this.getControlStatus(advertControls.advertisingDescription) === 'ng-valid' &&
      !(this.getControlStatus(advertControls.advertisingURL) === 'ng-invalid')) {  // as long as url is not bad
        return true;
      }
    return false;
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
        this.top = '0';
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

  ngOnInit() {
    this.applicationForm.valueChanges.subscribe(data => {
      this.applicantInfoErrors = this.applicationFieldsService.doesControlHaveErrors(
        this.applicationForm.controls.applicantInfo
      );
      this.eventDetailsErrors = this.applicationFieldsService.doesControlHaveErrors(
        this.applicationForm.eventName
      );
      this.signatureGroupErrors = this.applicationFieldsService.doesControlHaveErrors(
        this.applicationForm.signature
      );
    });
  }
}
