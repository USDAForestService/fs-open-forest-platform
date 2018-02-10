import { Component, OnInit } from '@angular/core';
import { ApplicationFieldsService } from '../../../application-forms/_services/application-fields.service';
import { ActivatedRoute } from '@angular/router';
import { ChristmasTreesApplicationService } from '../../_services/christmas-trees-application.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as moment from 'moment-timezone';
import { WindowRef } from '../../../_services/native-window.service';
import { TreesAdminService } from '../trees-admin.service';

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
    public afs: ApplicationFieldsService,
    private treesAdminService: TreesAdminService,
    private winRef: WindowRef
  ) {
    this.form = formBuilder.group({
      forestId: ['', [Validators.required]]
    });

    this.permitNumberSearchForm = formBuilder.group({
      permitNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]]
    });

    this.form.get('forestId').valueChanges.subscribe(forestId => {
      this.forest = this.getForestById(forestId);
      this.setStartEndDate(this.forest, this.form);
    });
  }

  resetForms() {
    this.result = null;
    this.forest = null;
    this.isDateSearch = !this.isDateSearch;
    this.apiErrors = null
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.forests = data.forests;
    });
  }

  setStartEndDate(forest, form) {
    this.treesAdminService.setStartEndDate(forest, form);
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

  getReport() {
    this.afs.touchAllFields(this.form);
    this.result = null;
    this.getPermitsByDate();
  }

  private setReportParameters() {
    this.reportParameters = {
      forestName: this.forest.forestName,
      startDate: this.getForestDate('dateTimeRange.startDateTime'),
      endDate: this.getForestDate('dateTimeRange.endDateTime')
    };
  }

  private getPermitsByDate() {
    if (this.form.valid && !this.dateStatus.hasErrors && this.forest) {
      this.setReportParameters();
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
            this.winRef.getNativeWindow().scroll(0, 200);
          }
        );
    } else {
      this.afs.scrollToFirstError();
    }
  }

  getPermitByNumber() {
    this.afs.touchAllFields(this.permitNumberSearchForm);
    this.result = null;
    if (this.permitNumberSearchForm.valid) {
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
          this.permitNumberSearchForm.controls['permitNumber'].setErrors({'notFound': true});
          this.winRef.getNativeWindow().scroll(0, 200);
        }
      );
    }
  }
}
