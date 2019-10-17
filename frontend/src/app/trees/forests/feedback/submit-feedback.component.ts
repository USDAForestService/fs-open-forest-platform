import { Component, Input } from '@angular/core';
import { FeedbackService } from '../../_services/feedback.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-submit-feedback',
  templateUrl: './submit-feedback.component.html'
})

export class SubmitFeedbackComponent {
  forests: any;
  message: any;
  constructor(
    private service: FeedbackService,
    private router: Router
  ) {

  }

  // user hits submit button
  submitFeedback() {
    let feedback = {
      forests: this.forests,
      message: this.message
    }
    // validate fields and create entry
    if (this.forests && this.message) {
      this.service.create(feedback).subscribe(data => {
        this.forests = ''
        this.message = ''
        this.router.navigate(['/'])
      })
    }
  }
}
