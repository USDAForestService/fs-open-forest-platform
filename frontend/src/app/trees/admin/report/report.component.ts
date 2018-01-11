import { Component, OnInit } from '@angular/core';
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
  form: any;
  results: any;

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'mm/dd/yyyy',
    height: '4.4rem',
    selectionTxtFontSize: '1.7rem'
  };

  constructor(
    private service: ChristmasTreesApplicationService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.form = formBuilder.group({
      forestId: [1, [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.forests = data.forests;
    });
  }

  getForestById(id) {
    for (const forest of this.forests) {
      if (forest.id === id) {
        return forest;
      }
    }
  }

  getReport() {
    if (this.form.valid) {
      this.service
        .getAllByDateRange(
          this.form.get('forestId').value,
          moment(this.form.get('startDate').value.formatted).format('YYYY-MM-DD'),
          moment(this.form.get('endDate').value.formatted).format('YYYY-MM-DD')
        )
        .subscribe(
          results => {
            this.results = results;
          },
          err => {
            console.log('ERROR!', err);
          }
        );
    }
  }
}
