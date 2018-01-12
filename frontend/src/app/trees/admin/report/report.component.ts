import { Component, OnInit } from '@angular/core';
import { ApplicationFieldsService } from '../../../application-forms/_services/application-fields.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ChristmasTreesApplicationService } from '../../_services/christmas-trees-application.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
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
      forestId: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]]
    });

    this.form.get('forestId').valueChanges.subscribe(forest => {
      this.forest = this.getForestById(forest);
      this.form.get('startDate').setValue({ formatted: moment(this.forest.startDate).format('MM/DD/YYYY') });
      this.form.get('endDate').setValue({ formatted: moment(this.forest.endDate).format('MM/DD/YYYY') });
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
      startDate: this.form.get('startDate').value.formatted,
      endDate: this.form.get('endDate').value.formatted
    };
    if (this.form.valid) {
      this.service
        .getAllByDateRange(
          this.forest.id,
          moment(this.reportParameters.startDate).format('YYYY-MM-DD'),
          moment(this.reportParameters.endDate).format('YYYY-MM-DD')
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
