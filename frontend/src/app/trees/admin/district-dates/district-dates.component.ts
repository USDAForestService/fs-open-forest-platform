import { Component, Inject, OnInit } from '@angular/core';
import { ApplicationFieldsService } from '../../../application-forms/_services/application-fields.service';
import { ActivatedRoute } from '@angular/router';
import { ChristmasTreesApplicationService } from '../../_services/christmas-trees-application.service';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment-timezone';
import { ChristmasTreesAdminService } from '../christmas-trees-admin.service';
import { ChristmasTreesInfoService } from '../../_services/christmas-trees-info.service';
import { environment } from '../../../../environments/environment';
import { DOCUMENT } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-district-dates',
  templateUrl: './district-dates.component.html'
})
export class AdminDistrictDatesComponent implements OnInit {
  user: any;
  forests: any;
  forest: any;
  districts: any;
  district: any;
  form: any;
  updateStatus: any;
  apiErrors: any;
  changeRequestFormUrl = environment.changeRequestForm;

  dateStatus = {
    startDateTimeValid: true,
    endDateTimeValid: true,
    startBeforeEnd: true,
    startAfterToday: true,
    hasErrors: false,
    dateTimeSpan: 0
  };

  constructor(
    private treesAdminService: ChristmasTreesAdminService,
    private service: ChristmasTreesApplicationService,
    private christmasTreesInfoService: ChristmasTreesInfoService,
    private formBuilder: FormBuilder,
    private titleService: Title,
    private route: ActivatedRoute,
    public afs: ApplicationFieldsService,
    @Inject(DOCUMENT) private doc: Document
  ) {
    this.form = formBuilder.group({
      forestAbbr: ['', [Validators.required]],
      districtId: ['']
    });

    this.form.get('forestAbbr').valueChanges.subscribe(forestAbbr => {
      if (forestAbbr) {
        this.updateStatus = null;
        this.setForest(forestAbbr);
      }
    });

    this.form.get('districtId').valueChanges.subscribe(districtId => {
      if (districtId) {
        this.updateStatus = null;
        this.district = this.districts.find(district => district.id === districtId);
        this.setStartEndDate(this.forest, this.district, this.form);
      }
    });
  }

  /**
   * set forestAbbr and districtId on form.
   */
  setForest(forestAbbr) {
    this.christmasTreesInfoService.getOne(forestAbbr).subscribe(forest => {
      this.forest = forest;
      if (forest.cuttingAreas && Object.keys(forest.cuttingAreas).length) {
        this.districts = Object.keys(forest.cuttingAreas).map(cuttingArea => {
          const district = forest.cuttingAreas[cuttingArea];
          district.id = cuttingArea;
          return district;
        });
        this.district = this.districts[0];
        if (this.forest && this.form.get('forestAbbr').value !== this.forests[0].forestAbbr) {
          this.form.get('forestAbbr').setValue(this.forests[0].forestAbbr);
        }
        if (this.district && this.form.get('districtId').value !== this.district.id) {
          this.form.get('districtId').setValue(this.district.id);
        }
      } else {
        this.district = null;
        this.districts = null;
      }
    });
  }

  /**
   * Set data from route resolver
   */
  ngOnInit() {
    this.titleService.setTitle(
      'Christmas trees permits cutting area dates admin | U.S. Forest Service Christmas Tree Permitting'
    );
    this.route.data.subscribe(data => {
      if (data && data.user) {
        this.user = data.user;
        this.forests = data.forests;

        if (this.forests[0]) {
          // set default forest to first one on form
          this.forest = this.forests[0];
          this.form.get('forestAbbr').setValue(this.forests[0].forestAbbr);
        }
      }
    });
  }

  /**
   * Set start and end date
   */
  setStartEndDate(forest, area, form) {
    const formGroup = { startDate: null, endDate: null };
    formGroup.startDate = moment(area.startDate).tz(forest.timezone);
    formGroup.endDate = moment(area.endDate).tz(forest.timezone);
    this.treesAdminService.setStartEndDate(formGroup, form);
    this.treesAdminService.setStartEndTimes(formGroup, form);
  }

  /**
   * update dateStatus
   */
  updateDateStatus(dateStatus: any): void {
    this.dateStatus = dateStatus;
  }

  /**
   * Touch all fields and init updateDates()
   */
  updateSeasonDates() {
    this.afs.touchAllFields(this.form);
    this.updateStatus = null;
    this.updateDates();
  }

  /**
   * If form is valid, update district dates
   */
  private updateDates() {
    if (this.form.valid && !this.dateStatus.hasErrors && this.district) {
      const newStart = this.form.get('dateTimeRange.startDateTime').value;
      const newEnd = this.form.get('dateTimeRange.endDateTime').value;
      this.service.updateDistrictDates(this.forest, this.district.id, newStart, newEnd).subscribe(
        () => {
          this.updateStatus = `Area dates for ${this.forest.forestName} - ${this.district.name} have been updated.`;
          this.doc.getElementById('district-updated-alert-container').focus();
        },
        err => {
          this.apiErrors = err;
          this.doc.getElementById('district-updated-alert-container').focus();
        }
      );
    }
  }
}
