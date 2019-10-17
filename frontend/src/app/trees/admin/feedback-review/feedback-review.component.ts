import { Component, OnInit, Input, OnChanges, Injectable } from '@angular/core';
import { Angular2Csv } from 'angular2-csv';
import { FeedbackService } from '../../_services/feedback.service';
import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment/moment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-feedback-review',
  templateUrl: './feedback-review.component.html'
})
export class AdminFeedbackReviewComponent implements OnInit {
  @Input() result: any;
  entries: any;

  constructor(
    private http: HttpClient,
    private service: FeedbackService,
    private titleService: Title,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.service.getAll().subscribe(res => {
        for (let entry in res) {
          res[entry].created = moment(res[entry].created).format('MM-DD-YYYY')
        }
        this.entries = res
    })
  }

  // download report of feedback
  downloadReport() {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: false,
      useBom: false
    };

    // initialize report with a headers row
    const orderedFeedback = [{
      created: 'Date',
      forests: 'Forest\s',
      message: 'Feedback'
    }];

    // push the values in to the rows in order that matches table headers
    for (const entry of this.entries) {
      orderedFeedback.push({
        created: entry.created,
        forests: entry.forests,
        message: entry.message
      });
    }

    const ng2csv = new Angular2Csv(orderedFeedback, 'Feedback Report', options);
  }
}
