import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ApplicationFieldsService } from '../../../application-forms/_services/application-fields.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChristmasTreesApplicationService } from '../../_services/christmas-trees-application.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as moment from 'moment-timezone';
import { WindowRef } from '../../../_services/native-window.service';
import { TreesAdminService } from '../trees-admin.service';
import { ChristmasTreesService } from '../../_services/christmas-trees.service';
import { environment } from '../../../../environments/environment';

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
    private treesAdminService: TreesAdminService,
    private service: ChristmasTreesApplicationService,
    private christmasTreesService: ChristmasTreesService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public afs: ApplicationFieldsService,
    private winRef: WindowRef
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

  setForest(forestAbbr) {
    this.christmasTreesService.getOne(forestAbbr).subscribe(forest => {
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

  ngOnInit() {
    this.route.data.subscribe(data => {
      if (data && data.user) {
        this.user = data.user;
        this.forests = data.forests;

        if (this.forests[0]) {
          // set default forest to first one on form
          this.form.get('forestAbbr').setValue(this.forests[0].forestAbbr);
        }
      }
    });
  }

  setStartEndDate(forest, area, form) {
    const formGroup = { startDate: null, endDate: null };
    formGroup.startDate = moment(area.startDate).tz(forest.timezone);
    formGroup.endDate = moment(area.endDate).tz(forest.timezone);
    this.treesAdminService.setStartEndDate(formGroup, form);
    this.treesAdminService.setStartEndTimes(formGroup, form);
  }

  updateDateStatus(dateStatus: any): void {
    this.dateStatus = dateStatus;
  }

  updateSeasonDates() {
    this.afs.touchAllFields(this.form);
    this.updateStatus = null;
    this.updateDates();
  }

  private updateDates() {
    if (this.form.valid && !this.dateStatus.hasErrors && this.district) {
      const newStart = this.form.get('dateTimeRange.startDateTime').value;
      const newEnd = this.form.get('dateTimeRange.endDateTime').value;
      this.service
        .updateDistrictDates(this.forest, this.district.id, newStart, newEnd)
        .subscribe(
          () => {
            this.updateStatus = `Area dates for ${this.forest.forestName} - ${this.district.name} have been updated.`;
            this.winRef.getNativeWindow().scroll(0, 200);
          },
          err => {
            this.apiErrors = err;
            this.winRef.getNativeWindow().scroll(0, 200);
          }
        );
    }
  }
}
