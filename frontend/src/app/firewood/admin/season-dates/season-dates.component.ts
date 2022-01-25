import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { ApplicationFieldsService } from '../../../application-forms/_services/application-fields.service';
import { ActivatedRoute } from '@angular/router';
import { FirewoodApplicationService } from '../../_services/firewood-application.service';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment/moment';
import { FirewoodAdminService } from '../firewood-admin.service';
import { environment } from '../../../../environments/environment';
import { DOCUMENT } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-season-dates',
  templateUrl: './season-dates.component.html'
})
export class AdminSeasonDatesComponent implements OnInit, AfterViewInit {
  user: any;
  forests: any;
  forest: any;
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
    private firewoodAdminService: FirewoodAdminService,
    private service: FirewoodApplicationService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public afs: ApplicationFieldsService,
    private titleService: Title,
    @Inject(DOCUMENT) private doc: Document
  ) {
    this.form = formBuilder.group({
      forestId: ['', [Validators.required]]
    });

    this.form.get('forestId').valueChanges.subscribe(id => {
      const forestId = parseInt(id, 10);
      if (forestId) {
        this.updateStatus = null;
        this.forest = this.forests.find(forest => forest.id === forestId);
        this.setStartEndDate(this.forest, this.form);
      }
    });
  }

  /**
   * Set data from route resolver.
   * Set title
   */
  ngOnInit() {
    this.titleService.setTitle(
      'Firewood permits season dates admin | U.S. Forest Service Digital Permits'
    );
    this.route.data.subscribe(data => {
      if (data && data.user) {
        this.user = data.user;
        this.forests = data.forests;
        this.forest = this.forests[0];
        if (this.forest) {
          this.form.get('forestId').setValue(this.forest.id);
        }
      }
    });
  }

  /**
   * setStartEndDate
   */
  ngAfterViewInit() {
    setTimeout(() => {
      this.setStartEndDate(this.forest, this.form);
    }, 0);
  }

  /**
   * Set start and end date on form
   */
  setStartEndDate(forest, form) {
    this.firewoodAdminService.setStartEndDate(forest, form);
  }

  /**
   * update dateStatus
   */
  updateDateStatus(dateStatus: any): void {
    this.dateStatus = dateStatus;
  }

  /**
   * Touch all fields and updateDates()
   */
  updateSeasonDates() {
    this.afs.touchAllFields(this.form);
    this.updateStatus = null;
    this.updateDates();
  }

  /**
   * If form is valid, update season dates
   */
  private updateDates() {
    if (this.form.valid && !this.dateStatus.hasErrors && this.forest) {
      const newStart = moment(this.form.get('dateTimeRange.startDateTime').value);
      const newEnd = moment(this.form.get('dateTimeRange.endDateTime').value);
      this.service
      .updateSeasonDates(this.forest.id, newStart.format('YYYY-MM-DD'), newEnd.format('YYYY-MM-DD'))
      .subscribe(
        (updatedForest:  any) => {
          this.updateStatus = `Season dates for ${this.forest.forestName} are now ${newStart.format(
            'MMM DD, YYYY'
          )} to  ${newEnd.format('MMM DD, YYYY')}.`;
          this.doc.getElementById('season-updated-alert-container').focus();

          const index = this.forests.indexOf(this.forests.find(forest => forest.id === updatedForest.id));
          this.forests[index] = updatedForest;
        },
        err => {
          this.apiErrors = err;
          this.doc.getElementById('season-updated-alert-container').focus();
        }
      );
    }
  }
}
