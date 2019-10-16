import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-submit-feedback',
  templateUrl: './submit-feedback.component.html'
})

export class SubmitFeedbackComponent {
  forests: any;
  message: any;
  constructor() {

  }

  submitFeedback() {
    console.log('submitFeedback()')
    console.log(this.forests)
    console.log(this.message)
  }
}
