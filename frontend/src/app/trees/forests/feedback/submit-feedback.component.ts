import { Component, Input, OnInit } from '@angular/core';
import { FeedbackService } from '../../_services/feedback.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-submit-feedback',
  templateUrl: './submit-feedback.component.html'
})

export class SubmitFeedbackComponent implements OnInit {
  user: any;
  forests: any;
  message: any;
  constructor(
    private service: FeedbackService,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      if (data && data.user) {
        this.user = data.user;
      }
    })
  }

  isAdmin() {
    let userIsAdmin = false;
    if (this.user && this.user.role === 'admin') {
      userIsAdmin = true;
    }
    return userIsAdmin;
  }

  // user hits submit button
  submitFeedback() {
    const feedback = {
      forests: this.forests,
      message: this.message
    };
    // validate fields and create entry
    if (this.forests && this.message) {
      this.service.create(feedback).subscribe(data => {
        this.forests = '';
        this.message = '';
        this.router.navigate(['/']);
      });
    }
  }
}
