import { NgModule } from '@angular/core';
import { ApplicationsModule } from '../application-forms/applications.module';
import { ReportComponent } from './admin/report/report.component';
import { ReportResultsComponent } from './admin/report/results/report-results.component';
import { SharedModule } from '../_shared/shared.module';
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
import { ChristmasTreeMapDetailsService } from './forests/christmas-tree-map-details/christmas-tree-map-details.service';
import { TreeGuidelinesFooterComponent } from './forests/tree-guidelines/tree-guidelines-footer.component';

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
    TreeGuidelinesFooterComponent,
    RemovePuncPipe
  ],
  exports: [
    ReportComponent,
    ReportResultsComponent,
    TreeCuttingRulesComponent,
    TreeGuidelinesComponent,
    TreeGuidelinesFooterComponent,
    TreeCuttingDatesComponent,
    TreeSpeciesComponent,
    ChristmasTreeMapDetailsComponent
  ],
  imports: [SharedModule, ApplicationsModule],
  providers: [
    ChristmasTreesInfoService,
    ChristmasTreesAdminService,
    ChristmasTreesApplicationService,
    ChristmasTreeMapDetailsService
  ]
})
export class TreesModule {}
