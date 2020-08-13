import { Component, Input, OnInit } from '@angular/core';
import { FilterPipe } from '../../../_pipes/filter.pipe';
import { FeedbackService } from '../../_services/feedback.service';
import { FirewoodInfoService } from '../../_services/firewood-info.service';
import { FirewoodApplicationService } from '../../_services/firewood-application.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { WindowRef } from '../../../_services/native-window.service';

@Component({
  selector: 'app-firewood-permit-rules',
  templateUrl: './firewood-permit-rules.component.html',
  providers: [FilterPipe]
})
export class FirewoodPermitRulesComponent implements OnInit {
  @Input() forest: any;
  @Input() firstName: any;
  @Input() lastName: any;
  @Input() numberOfCords: any;
  @Input() emailAddress: any;
  @Input() totalCost: any;
  applicationRulesForm: FormGroup;

  constructor(
    private firewoodInfoService: FirewoodInfoService,
    private applicationService: FirewoodApplicationService,
    private service: FeedbackService,
    private router: Router,
    private winRef: WindowRef
  ) {
    this.applicationRulesForm = new FormGroup({
      acceptRules: new FormControl()
    });
  }

  ngOnInit() {
  }

  // submitFeedback() {
  //   const feedback = {
  //     forests: this.forests,
  //     message: this.message
  //   };

  //   // validate fields
  //   if (this.message) {
  //     const status = {
  //       message: 'Thank you for sharing your feedback.<br>For help or technical questions, email us at <a href="mailto:SM.FS.OpnFrstCsSup@usda.gov">SM.FS.OpnFrstCsSup@usda.gov.</a>',
  //       header: ''
  //     };
  //     // create feedback entry
  //     this.service.create(feedback).subscribe(data => {
  //       // show success message
  //       localStorage.setItem('status', JSON.stringify(status));
  //       const redirectUrl = localStorage.getItem('feedbackRedirect');
  //       this.router.navigate([redirectUrl]);
  //     });
  //   }
  // }

  createApplication() {
    const fsApplication = {
      forestId: this.forest.id,
      firstName: this.firstName,
      lastName: this.lastName,
      emailAddress: this.emailAddress,
      quantity: this.numberOfCords,
      totalCost: this.totalCost
    };

    if (fsApplication) {
      const status = {
        message: 'Thank you for sharing your feedback.<br>For help or technical questions, email us at <a href="mailto:SM.FS.OpnFrstCsSup@usda.gov">SM.FS.OpnFrstCsSup@usda.gov.</a>',
        header: ''
      };
      // create feedback entry
      this.service.create(fsApplication).subscribe(data => {
        // show success message
        localStorage.setItem('status', JSON.stringify(status));
        const redirectUrl = localStorage.getItem('feedbackRedirect');
        this.router.navigate([redirectUrl]);
      });
    }
  }
}