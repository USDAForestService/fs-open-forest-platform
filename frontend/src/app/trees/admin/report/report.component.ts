import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild
} from '@angular/core';
import { ApplicationFieldsService } from '../../../application-forms/_services/application-fields.service';
import { ActivatedRoute } from '@angular/router';
import { ChristmasTreesApplicationService } from '../../_services/christmas-trees-application.service';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment/moment';
import { ChristmasTreesAdminService } from '../christmas-trees-admin.service';
import { environment } from '../../../../environments/environment';
import { DOCUMENT } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html'
})
export class ReportComponent implements OnInit, AfterViewInit {
  @ViewChild('reportResults') reportResults: ElementRef;

  forests: any;
  selectedForest: any;
  form: any;
  permitNumberSearchForm: any;
  result: any;
  apiErrors: any;
  reportParameters: any;
  isDateSearch = true;
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
    private service: ChristmasTreesApplicationService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public afs: ApplicationFieldsService,
    private treesAdminService: ChristmasTreesAdminService,
    private titleService: Title,
    @Inject(DOCUMENT) private doc: Document
  ) {
    this.form = this.formBuilder.group({
      forestSelection: ['', [Validators.required]]
    });

    this.permitNumberSearchForm = formBuilder.group({
      permitNumber: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{8}$/)]
      ]
    });

    this.form.get('forestSelection').valueChanges.subscribe(forestSelection => {
      if (forestSelection) {
        this.selectedForest = forestSelection;
        this.setStartEndDate(this.selectedForest, this.form);
      }
    });
  }

  /**
   * reset form
   */
  resetForms() {
    this.result = null;
    this.selectedForest = this.forests[0].id;
    this.isDateSearch = !this.isDateSearch;
    this.apiErrors = null;
  }

  /**
   * Set data from route resolver
   */
  ngOnInit() {
    this.titleService.setTitle(
      'Christmas trees permits admin reports | U.S. Forest Service Digital Permits'
    );
    this.route.data.subscribe(data => {
      this.forests = data.forests;
      if (this.forests.length > 0) {
        this.form.get('forestSelection').setValue(this.forests[0].id);
      }
    });
  }

  /**
   * setStartEndDate
   */
  ngAfterViewInit() {
    setTimeout(() => {
      this.setStartEndDate(this.selectedForest, this.form);
    }, 0);
  }

  /**
   * setStartEndDate
   */
  setStartEndDate(forestId, form) {
    let startDate = moment();
    let endDate = moment();
    if (forestId === 'ALL Forests') {
      startDate = moment.min(
        this.forests.map(forest => moment(forest.startDate))
      );
      endDate = moment.max(this.forests.map(forest => moment(forest.endDate)));
    } else {
      const forest = this.getForestById(forestId);
      if (forest) {
        startDate = forest.startDate;
        endDate = forest.endDate;
      }
    }

    this.treesAdminService.setStartEndDate({ startDate, endDate }, form);
  }

  /**
   * update dateStatus
   */
  updateDateStatus(dateStatus: any): void {
    this.dateStatus = dateStatus;
  }

  /**
   * @returns forest by id
   */
  getForestById(id) {
    return this.forests.find(forest => forest.id === parseInt(id, 10));
  }

  /**
   * @returns forest by date
   */
  getForestDate(dateField) {
    return this.form.get(dateField).value;
  }

  /**
   * touch all fields and init getPermitsByDate()
   */
  getReport() {
    this.afs.touchAllFields(this.form);
    this.result = null;
    this.getPermitsByDate();
  }

  /**
   * set forest name, start and end dates.
   */
  private setReportParameters() {
    this.reportParameters = {
      forestNameShort:
        this.selectedForest === 'ALL Forests'
          ? 'All Forests'
          : this.getForestById(this.selectedForest).forestNameShort,
      startDate: this.getForestDate('dateTimeRange.startDateTime'),
      endDate: this.getForestDate('dateTimeRange.endDateTime'),
      startDateDisplay: moment(this.getForestDate('dateTimeRange.startDateTime')).format('MM-DD-YYYY'),
      endDateDisplay: moment(this.getForestDate('dateTimeRange.endDateTime')).format('MM-DD-YYYY'),
    };
  }

  /**
   * get permit by date and set to this.result
   */
  private getPermitsByDate() {
    if (this.form.valid && !this.dateStatus.hasErrors && this.selectedForest) {
      this.setReportParameters();
      this.service
        .getAllByDateRange(
          this.selectedForest,
          moment(this.form.get('dateTimeRange.startDateTime').value).format(
            'YYYY-MM-DD'
          ),
          moment(this.form.get('dateTimeRange.endDateTime').value).format(
            'YYYY-MM-DD'
          )
        )
        .subscribe(
          (results: any) => {
            this.result = {
              numberOfPermits: results.numberOfPermits,
              sumOfTrees: results.sumOfTrees,
              sumOfCost: results.sumOfCost,
              permits: results.permits,
              parameters: this.reportParameters
            };
            this.focusAndScroll('report-results');
          },
          err => {
            this.apiErrors = err;
            this.doc.getElementById('report-alerts-container').focus();
          }
        );
    } else {
      this.afs.scrollToFirstError();
    }
  }

  /**
   * Set focus and scroll results into view
   */
  focusAndScroll(id) {
    this.doc.getElementById(id).focus();
    const element = document.querySelector('#' + id);
    element.scrollIntoView();
  }

  /**
   * Get permit by permit number and set to this.result
   */
  getPermitByNumber() {
    this.afs.touchAllFields(this.permitNumberSearchForm);
    this.result = null;
    if (this.permitNumberSearchForm.valid) {
      this.service
        .getReportByPermitNumber(
          this.permitNumberSearchForm.get('permitNumber').value
        )
        .subscribe(
          (results: any) => {
            this.result = {
              numberOfPermits: 1,
              sumOfTrees: results.permits[0].quantity,
              sumOfCost: results.permits[0].totalCost,
              permits: results.permits,
              parameters: null
            };
            this.focusAndScroll('report-results');
          },
          err => {
            this.apiErrors = err;
            this.permitNumberSearchForm.controls['permitNumber'].setErrors({
              notFound: true
            });
            this.doc.getElementById('report-alerts-container').focus();
          }
        );
    }
  }
}
