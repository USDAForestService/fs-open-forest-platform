import { NgModule } from '@angular/core';
import { ApplicationsModule } from '../application-forms/applications.module';
import { ReportComponent } from './admin/report/report.component';
import { ReportResultsComponent } from './admin/report/results/report-results.component';
import { SharedModule } from '../shared/shared.module';
import { FirewoodGuidelinesComponent } from './forests/firewood-guidelines/firewood-guidelines.component';
import { ChristmasTreesInfoService } from './_services/christmas-trees-info.service';
import { FeedbackService } from './_services/feedback.service';
import { TreeCuttingRulesComponent } from './forests/firewood-guidelines/tree-cutting-rules/tree-cutting-rules.component';
import { FirewoodForestFinderComponent } from './forests/forest-finder/forest-finder.component';
import { RemovePuncPipe } from './forests/forest-finder/remove-punc.pipe';
import { ChristmasTreesApplicationService } from './_services/christmas-trees-application.service';
import { AdminSeasonDatesComponent } from './admin/season-dates/season-dates.component';
import { FirewoodAdminService } from './admin/firewood-admin.service';
import { AdminFeedbackReviewComponent } from './admin/feedback-review/feedback-review.component';
import { BuyPermitBarComponent } from './forests/firewood-guidelines/tree-buy-permit-bar/buy-permit-bar.component';
import { SubmitFeedbackComponent } from './forests/feedback/submit-feedback.component';

@NgModule({
  declarations: [
    SubmitFeedbackComponent,
    ReportComponent,
    ReportResultsComponent,
    AdminFeedbackReviewComponent,
    AdminSeasonDatesComponent,
    FirewoodGuidelinesComponent,
    FirewoodForestFinderComponent,
    BuyPermitBarComponent,
    RemovePuncPipe,
  ],
  exports: [
    SubmitFeedbackComponent,
    ReportComponent,
    ReportResultsComponent,
    FirewoodGuidelinesComponent,
    BuyPermitBarComponent
  ],
  imports: [SharedModule, ApplicationsModule],
  providers: [
    FeedbackService,
    ChristmasTreesInfoService,
    FirewoodAdminService,
    ChristmasTreesApplicationService
  ]
})
export class FirewoodModule {}
