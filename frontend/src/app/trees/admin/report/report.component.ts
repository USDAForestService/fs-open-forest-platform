import { Component, OnInit } from '@angular/core';
import { ApplicationFieldsService } from '../../../application-forms/_services/application-fields.service';
import { ActivatedRoute } from '@angular/router';
import { ChristmasTreesApplicationService } from '../../_services/christmas-trees-application.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html'
})
export class ReportComponent implements OnInit {
  forests: any;
  forest: any;
  form: any;
  permitNumberSearchForm: any;
  result: any;
  apiErrors: any;
  reportParameters: any;
  isDateSearch = true;

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
    public afs: ApplicationFieldsService
  ) {
    this.form = formBuilder.group({
      forestId: ['', [Validators.required]]
    });

    this.permitNumberSearchForm = formBuilder.group({
      permitNumber: ['', [Validators.required]]
    });

    this.form.get('forestId').valueChanges.subscribe(forest => {
      this.setStartEndDate(forest);
    });
  }

  resetForms() {
    this.result = null;
    this.forest = null;
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.forests = data.forests;
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

  getReport() {
    this.afs.touchAllFields(this.form);
    this.afs.touchAllFields(this.permitNumberSearchForm);
    this.result = null;

    if (this.isDateSearch) {
      this.permitNumberSearchForm.reset();
      if (this.form.valid && !this.dateStatus.hasErrors && this.forest) {
        this.reportParameters = {
          forestName: this.forest.forestName,
          startDate: moment
            .tz(this.form.get('dateTimeRange.startDateTime').value, this.forest.timezone)
            .format('MM/DD/YYYY'),
          endDate: moment
            .tz(this.form.get('dateTimeRange.endDateTime').value, this.forest.timezone)
            .format('MM/DD/YYYY')
        };
        this.service
          .getAllByDateRange(
            this.forest.id,
            moment.tz(this.form.get('dateTimeRange.startDateTime').value, this.forest.timezone).format('YYYY-MM-DD'),
            moment.tz(this.form.get('dateTimeRange.endDateTime').value, this.forest.timezone).format('YYYY-MM-DD')
          )
          .subscribe(
            results => {
              this.result = {
                numberOfPermits: results.numberOfPermits,
                sumOfTrees: results.sumOfTrees,
                sumOfCost: results.sumOfCost,
                permits: results.permits,
                parameters: this.reportParameters
              };
            },
            err => {
              this.apiErrors = err;
            }
          );
      }
    } else {
      this.form.reset();
      this.service.getReportByPermitNumber(this.permitNumberSearchForm.get('permitNumber').value).subscribe(
        results => {
          this.result = {
            numberOfPermits: 1,
            sumOfTrees: results.permits[0].quantity,
            sumOfCost: results.permits[0].totalCost,
            permits: results.permits,
            parameters: null
          };
        },
        err => {
          this.apiErrors = err;
        }
      );
    }
  }
}
