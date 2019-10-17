import { Component, OnInit, Input, OnChanges, Injectable } from '@angular/core';
import { Angular2Csv } from 'angular2-csv';
import { FeedbackService } from '../../_services/feedback.service';
import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
        this.entries = res
    })
  }

  /**
   * Download csv report of feedback entries
   */
  downloadReport() {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: false,
      useBom: false
    };

    const ng2csv = new Angular2Csv(this.entries, 'Feedback Report', options);
  }
}
