import { Component, Input, OnInit } from '@angular/core';
import { FeedbackService } from '../../_services/feedback.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApplicationFieldsService } from '../../../application-forms/_services/application-fields.service';

@Component({
  selector: 'app-submit-feedback',
  templateUrl: './submit-feedback.component.html'
})

export class SubmitFeedbackComponent implements OnInit {

  user: any;
  forests: any;
  message: any;
  feedbackFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public afs: ApplicationFieldsService,
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
    });

    this.feedbackFormGroup = new FormGroup({
      feedbackText: new FormControl()
    });
    this.feedbackFormGroup = this.formBuilder.group({
      feedbackText: ['', [Validators.required, Validators.maxLength(1000)]],
    });

    const feedbackMessage = this.feedbackFormGroup.get('feedbackText');
    this.afs.updateValidators(feedbackMessage, true, 1000);
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

    // validate fields
    if (this.message) {
      const status = {
        message: 'Thank you for sharing your feedback.<br>For help or technical questions, email us at <a href="mailto:SM.FS.OpnFrstCsSup@usda.gov">SM.FS.OpnFrstCsSup@usda.gov.</a>',
        header: ''
      };
      // create feedback entry
      this.service.create(feedback).subscribe(data => {
        // show success message
        localStorage.setItem('status', JSON.stringify(status));
        const redirectUrl = localStorage.getItem('feedbackRedirect');
        this.router.navigate([redirectUrl]);
      });
    }
  }

  // user hits return to previous page button
  goPrevious() {
    this.forests = '';
    this.message = '';
    const redirectUrl = localStorage.getItem('feedbackRedirect');
    this.router.navigate([redirectUrl]);
  }

}
