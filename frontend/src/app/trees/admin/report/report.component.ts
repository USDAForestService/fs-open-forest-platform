import { Component, OnInit } from '@angular/core';
import { ApplicationFieldsService } from '../../../application-forms/_services/application-fields.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ChristmasTreesApplicationService } from '../../_services/christmas-trees-application.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { IMyDpOptions } from 'mydatepicker';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html'
})
export class ReportComponent implements OnInit {
  forests: any;
  forest: any;
  form: any;
  result: any;
  apiErrors: any;
  reportParameters: any;

  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'mm/dd/yyyy',
    height: '4.4rem',
    selectionTxtFontSize: '1.7rem'
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

    this.form.get('forestId').valueChanges.subscribe(forest => {
      this.forest = this.getForestById(forest);
      if (this.forest) {
        this.form.get('dateTimeRange.startMonth').setValue(moment(this.forest.startDate).format('MM'));
        this.form.get('dateTimeRange.startDay').setValue(moment(this.forest.startDate).format('DD'));
        this.form.get('dateTimeRange.startYear').setValue(moment(this.forest.startDate).format('YYYY'));
        this.form.get('dateTimeRange.endMonth').setValue(moment(this.forest.endDate).format('MM'));
        this.form.get('dateTimeRange.endDay').setValue(moment(this.forest.endDate).format('DD'));
        this.form.get('dateTimeRange.endYear').setValue(moment(this.forest.endDate).format('YYYY'));
      }
    });
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.forests = data.forests;
    });
  }

  getForestById(id) {
    for (const forest of this.forests) {
      if (forest.id === parseInt(id)) {
        return forest;
      }
    }
  }

  getReport() {
    this.afs.touchAllFields(this.form);
    this.reportParameters = {
      forestName: this.forest.forestName,
      startDate: moment(this.form.get('dateTimeRange.startDateTime').value).format('MM/DD/YYYY'),
      endDate: moment(this.form.get('dateTimeRange.endDateTime').value).format('MM/DD/YYYY')
    };
    if (this.form.valid) {
      this.service
        .getAllByDateRange(
          this.forest.id,
          moment(this.form.get('dateTimeRange.startDateTime').value).format('YYYY-MM-DD'),
          moment(this.form.get('dateTimeRange.endDateTime').value).format('YYYY-MM-DD')
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
  }
}
