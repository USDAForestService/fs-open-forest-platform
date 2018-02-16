import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ApplicationFieldsService } from '../../../application-forms/_services/application-fields.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChristmasTreesApplicationService } from '../../_services/christmas-trees-application.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as moment from 'moment-timezone';
import { WindowRef } from '../../../_services/native-window.service';
import { TreesAdminService } from '../trees-admin.service';
import { ForestService } from '../../_services/forest.service';

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
    private forestService: ForestService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public afs: ApplicationFieldsService,
    private winRef: WindowRef
  ) {
    this.form = formBuilder.group({
      forestAbbr: ['', [Validators.required]],
      districtName: ['']
    });

    this.form.get('forestAbbr').valueChanges.subscribe(forestAbbr => {
      this.setForest(forestAbbr);
    });

    this.form.get('districtName').valueChanges.subscribe(districtName => {
      this.district = this.districts.find(district => district.name === districtName);
      this.setStartEndDate(this.forest, this.district, this.form);
    });

  }

  setForest(forestAbbr) {
    this.forestService.getOne(forestAbbr).subscribe(forest => {
      this.forest = forest;

      if (forest.cuttingAreas) {
        this.districts = Object.keys(forest.cuttingAreas).map(cuttingArea => {
          let district = forest.cuttingAreas[cuttingArea];
          district.name = cuttingArea;
          return district;
        });
        this.district = this.districts[0];
        this.setStartEndDate(this.forest, this.district, this.form);
      } else {
        this.district = null;
        this.districts = null;
      }
    });
  }

  resetForms() {
    this.updateStatus = null;
    this.forest = null;
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      if (data && data.user) {
        this.user = data.user;
        this.forests = data.forests;
        if (!this.user.forests || !this.user.forests.length) {
          // route to access denied if the user doesn't have any forests
          this.router.navigate(['access-denied']);
        } else if (this.user.forests.find(forest => forest !== 'all')) {
          this.forests = this.forests.filter(forest =>
            this.user.forests.find(forestAbbr => forestAbbr === forest.forestAbbr)
          );
        }
        this.setForest(this.forests[0].forestAbbr); // set default to first forest
        if (this.forest) {
          this.form.get('forestAbbr').setValue(this.forests[0].forestAbbr);
        }
        if (this.district) {
          this.form.get('districtName').setValue(this.district.name);
        }
      }
    });
  }

  setStartEndDate(forest, district, form) {
    this.treesAdminService.setStartEndDate(district, form);
    this.treesAdminService.setStartEndTimes(district, form);
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
    if (this.form.valid && !this.dateStatus.hasErrors && this.forest) {
      const newStart = moment.tz(this.form.get('dateTimeRange.startDateTime').value, this.forest.timezone);
      const newEnd = moment.tz(this.form.get('dateTimeRange.endDateTime').value, this.forest.timezone);
      this.service
        .updateSeasonDates(this.forest.id, newStart.format('YYYY-MM-DD'), newEnd.format('YYYY-MM-DD'))
        .subscribe(
          () => {
            this.updateStatus = `Season dates for ${this.forest.forestName} are now ${newStart.format(
              'MMM DD, YYYY'
            )} to  ${newEnd.format('MMM DD, YYYY')}`;
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
