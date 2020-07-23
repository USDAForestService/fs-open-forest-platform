import { NgModule } from '@angular/core';
import { ApplicationsModule } from '../application-forms/applications.module';
import { ReportComponent } from './admin/report/report.component';
import { ReportResultsComponent } from './admin/report/results/report-results.component';
import { SharedModule } from '../shared/shared.module';
import { FirewoodGuidelinesComponent } from './forests/firewood-guidelines/firewood-guidelines.component';
import { FirewoodInfoService } from './_services/firewood-info.service';
import { FirewoodCuttingDatesComponent } from './forests/firewood-guidelines/firewood-cutting-dates/firewood-cutting-dates.component';
import { FeedbackService } from './_services/feedback.service';
import { RemovePuncPipe } from './forests/forest-finder/remove-punc.pipe';
import { FirewoodApplicationService } from './_services/firewood-application.service';
import { AdminSeasonDatesComponent } from './admin/season-dates/season-dates.component';
import { FirewoodAdminService } from './admin/firewood-admin.service';
import { AdminFeedbackReviewComponent } from './admin/feedback-review/feedback-review.component';
import { SubmitFeedbackComponent } from './forests/feedback/submit-feedback.component';

@NgModule({
  declarations: [
    SubmitFeedbackComponent,
    ReportComponent,
    ReportResultsComponent,
    AdminFeedbackReviewComponent,
    AdminSeasonDatesComponent,
    FirewoodGuidelinesComponent,
    FirewoodCuttingDatesComponent,
    RemovePuncPipe,
  ],
  exports: [
    SubmitFeedbackComponent,
    ReportComponent,
    ReportResultsComponent,
    FirewoodGuidelinesComponent,
    FirewoodCuttingDatesComponent
  ],
  imports: [SharedModule, ApplicationsModule],
  providers: [
    FeedbackService,
    FirewoodInfoService,
    FirewoodAdminService,
    FirewoodApplicationService
  ]
})
export class FirewoodModule {}
