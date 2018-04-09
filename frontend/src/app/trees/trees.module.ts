import { NgModule } from '@angular/core';
import { ApplicationsModule } from '../application-forms/applications.module';
import { ReportComponent } from './admin/report/report.component';
import { ReportResultsComponent } from './admin/report/results/report-results.component';
import { SharedModule } from '../shared/shared.module';
import { TreeGuidelinesComponent } from './forests/tree-guidelines/tree-guidelines.component';
import { TreeCuttingDatesComponent } from './forests/tree-guidelines/tree-cutting-dates/tree-cutting-dates.component';
import { TreeSpeciesComponent } from './forests/tree-guidelines/tree-species/tree-species.component';
import { ChristmasTreesInfoService } from './_services/christmas-trees-info.service';
import { TreeCuttingRulesComponent } from './forests/tree-guidelines/tree-cutting-rules/tree-cutting-rules.component';
import { ForestFinderComponent } from './forests/forest-finder/forest-finder.component';
import { RemovePuncPipe } from './forests/forest-finder/remove-punc.pipe';
import { ChristmasTreesApplicationService } from './_services/christmas-trees-application.service';
import { AdminSeasonDatesComponent } from './admin/season-dates/season-dates.component';
import { ChristmasTreesAdminService } from './admin/christmas-trees-admin.service';
import { AdminDistrictDatesComponent } from './admin/district-dates/district-dates.component';
import { ChristmasTreeMapDetailsComponent } from './forests/christmas-tree-map-details/christmas-tree-map-details.component';
import { BuyPermitBarComponent } from './forests/tree-guidelines/tree-buy-permit-bar/buy-permit-bar.component';

@NgModule({
  declarations: [
    ReportComponent,
    ReportResultsComponent,
    AdminDistrictDatesComponent,
    AdminSeasonDatesComponent,
    TreeCuttingRulesComponent,
    TreeGuidelinesComponent,
    TreeCuttingDatesComponent,
    TreeSpeciesComponent,
    ForestFinderComponent,
    ChristmasTreeMapDetailsComponent,
    BuyPermitBarComponent,
    RemovePuncPipe
  ],
  exports: [
    ReportComponent,
    ReportResultsComponent,
    TreeCuttingRulesComponent,
    TreeGuidelinesComponent,
    BuyPermitBarComponent,
    TreeCuttingDatesComponent,
    TreeSpeciesComponent,
    ChristmasTreeMapDetailsComponent
  ],
  imports: [SharedModule, ApplicationsModule],
  providers: [
    ChristmasTreesInfoService,
    ChristmasTreesAdminService,
    ChristmasTreesApplicationService
  ]
})
export class TreesModule {}
