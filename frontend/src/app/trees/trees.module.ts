import { NgModule } from '@angular/core';
import { ApplicationsModule } from '../application-forms/applications.module';
import { ReportComponent } from './admin/report/report.component';
import { ReportResultsComponent } from './admin/report/results/report-results.component';
import { SharedModule } from '../shared/shared.module';
import { PermitGuidelinesComponent } from './forests/permit-guidelines/permit-guidelines.component';
import { CuttingDatesComponent } from './forests/permit-guidelines/cutting-dates/cutting-dates.component';
import { CuttingDatesMinComponent } from './forests/permit-guidelines/cutting-dates-min/cutting-dates-min.component';
import { TreeSpeciesComponent } from './forests/permit-guidelines/tree-species/tree-species.component';
import { ChristmasTreesInfoService } from './_services/christmas-trees-info.service';
import { FeedbackService } from './_services/feedback.service';
import { TreeCuttingRulesComponent } from './forests/permit-guidelines/cutting-rules/cutting-rules.component';
import { ForestFinderComponent } from './forests/forest-finder/forest-finder.component';
import { RemovePuncPipe } from './forests/forest-finder/remove-punc.pipe';
import { ChristmasTreesApplicationService } from './_services/christmas-trees-application.service';
import { AdminSeasonDatesComponent } from './admin/season-dates/season-dates.component';
import { ChristmasTreesAdminService } from './admin/christmas-trees-admin.service';
import { AdminDistrictDatesComponent } from './admin/district-dates/district-dates.component';
import { AdminFeedbackReviewComponent } from './admin/feedback-review/feedback-review.component';
import { ChristmasTreeMapDetailsComponent } from './forests/christmas-tree-map-details/christmas-tree-map-details.component';
import { BuyPermitBarComponent } from './forests/permit-guidelines/tree-buy-permit-bar/buy-permit-bar.component';
import { SubmitFeedbackComponent } from './forests/feedback/submit-feedback.component';

@NgModule({
  declarations: [
    SubmitFeedbackComponent,
    ReportComponent,
    ReportResultsComponent,
    AdminDistrictDatesComponent,
    AdminFeedbackReviewComponent,
    AdminSeasonDatesComponent,
    TreeCuttingRulesComponent,
    PermitGuidelinesComponent,
    CuttingDatesComponent,
    CuttingDatesMinComponent,
    TreeSpeciesComponent,
    ForestFinderComponent,
    ChristmasTreeMapDetailsComponent,
    BuyPermitBarComponent,
    RemovePuncPipe,
  ],
  exports: [
    SubmitFeedbackComponent,
    ReportComponent,
    ReportResultsComponent,
    TreeCuttingRulesComponent,
    PermitGuidelinesComponent,
    BuyPermitBarComponent,
    CuttingDatesComponent,
    CuttingDatesMinComponent,
    TreeSpeciesComponent,
    ChristmasTreeMapDetailsComponent
  ],
  imports: [SharedModule, ApplicationsModule],
  providers: [
    FeedbackService,
    ChristmasTreesInfoService,
    ChristmasTreesAdminService,
    ChristmasTreesApplicationService
  ]
})
export class TreesModule {}
