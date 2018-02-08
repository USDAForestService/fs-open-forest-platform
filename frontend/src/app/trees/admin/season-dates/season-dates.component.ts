import { Component, OnInit } from '@angular/core';
import { ApplicationFieldsService } from '../../../application-forms/_services/application-fields.service';
import { ActivatedRoute } from '@angular/router';
import { ChristmasTreesApplicationService } from '../../_services/christmas-trees-application.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as moment from 'moment-timezone';
import { WindowRef } from '../../../_services/native-window.service';

@Component({
  selector: 'app-season-dates',
  templateUrl: './season-dates.component.html'
})
export class AdminSeasonDatesComponent implements OnInit {
  user: any;
  forests: any;
  forest: any;
  form: any;
  updateStatus: any;
  reportParameters: any;
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
    private service: ChristmasTreesApplicationService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public afs: ApplicationFieldsService,
    private winRef: WindowRef
  ) {
    this.form = formBuilder.group({
      forestId: ['', [Validators.required]]
    });

    this.form.get('forestId').valueChanges.subscribe(forest => {
      this.setStartEndDate(forest);
    });
  }

  resetForms() {
    this.updateStatus = null;
    this.forest = null;
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      if (data) {
        this.user = data.user;
        this.forests = data.forests;
        this.forests = this.forests.filter(forest =>
          this.user.forests.find(forestAbbr => forestAbbr === forest.forestAbbr)
        );
      }
    });
  }

  setStartEndDate(forest) {
    this.forest = this.getForestById(forest);
    if (this.forest && this.form.get('dateTimeRange')) {
      this.form.get('dateTimeRange.startMonth').setValue(moment(this.forest.startDate).format('MM'));
      this.form.get('dateTimeRange.startDay').setValue(moment(this.forest.startDate).format('DD'));
      this.form.get('dateTimeRange.startYear').setValue(moment(this.forest.startDate).format('YYYY'));
      this.form.get('dateTimeRange.endMonth').setValue(moment(this.forest.endDate).format('MM'));
      this.form.get('dateTimeRange.endDay').setValue(moment(this.forest.endDate).format('DD'));
      this.form.get('dateTimeRange.endYear').setValue(moment(this.forest.endDate).format('YYYY'));
    }
  }

  updateDateStatus(dateStatus: any): void {
    this.dateStatus = dateStatus;
  }

  getForestById(id) {
    for (const forest of this.forests) {
      if (forest.id === parseInt(id, 10)) {
        return forest;
      }
    }
  }

  getForestDate(dateField) {
    return moment.tz(this.form.get(dateField).value, this.forest.timezone).format('MM/DD/YYYY');
  }

  updateSeasonDates() {
    this.afs.touchAllFields(this.form);
    this.updateStatus = null;
    this.updateDates();
  }

  private setReportParameters() {
    this.reportParameters = {
      forestName: this.forest.forestName,
      startDate: this.getForestDate('dateTimeRange.startDateTime'),
      endDate: this.getForestDate('dateTimeRange.endDateTime')
    };
  }

  private updateDates() {
    if (this.form.valid && !this.dateStatus.hasErrors && this.forest) {
      this.setReportParameters();
      const newStart = moment.tz(this.form.get('dateTimeRange.startDateTime').value, this.forest.timezone);
      const newEnd = moment.tz(this.form.get('dateTimeRange.endDateTime').value, this.forest.timezone);
      this.service.updateSeasonDates(
        this.forest.id,
        newStart.format('YYYY-MM-DD'),
        newEnd.format('YYYY-MM-DD')
      ).subscribe(() => {
        this.updateStatus = `Season dates for ${this.forest.forestName} are now ${newStart.format('MMM DD, YYYY')} to  ${newEnd.format('MMM DD, YYYY')}`;
        this.winRef.getNativeWindow().scroll(0, 200);
      },
      err => {
        this.apiErrors = err;
        this.winRef.getNativeWindow().scroll(0, 200);
      });
    }
  }
}
