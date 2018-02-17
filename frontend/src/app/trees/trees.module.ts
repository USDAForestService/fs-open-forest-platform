import { NgModule } from '@angular/core';
import { ApplicationsModule } from '../application-forms/applications.module';
import { ReportComponent } from './admin/report/report.component';
import { ReportResultsComponent } from './admin/report/results/report-results.component';
import { SharedModule } from '../_shared/shared.module';
import { TreeGuidelinesComponent } from './forests/tree-guidelines/tree-guidelines.component';
import { TreeCuttingDatesComponent } from './forests/tree-guidelines/tree-cutting-dates/tree-cutting-dates.component';
import { TreeSpeciesComponent } from './forests/tree-guidelines/tree-species/tree-species.component';
import { ForestService } from './_services/forest.service';
import { TreeCuttingRulesComponent } from './forests/tree-guidelines/tree-cutting/tree-cutting-rules/tree-cutting-rules.component';
import { ForestFinderComponent } from './forests/forest-finder/forest-finder.component';
import { RemovePuncPipe } from './forests/forest-finder/remove-punc.pipe';
import { LineBreakFormatterPipe } from '../_pipes/line-break-formatter.pipe';
import { ColumnizeArrayPipe } from '../_pipes/columnize-array.pipe';
import { ChristmasTreesApplicationService } from './_services/christmas-trees-application.service';
import { AdminSeasonDatesComponent } from './admin/season-dates/season-dates.component';
import { TreesAdminService } from './admin/trees-admin.service';

@NgModule({
  declarations: [
    ReportComponent,
    ReportResultsComponent,
    AdminSeasonDatesComponent,
    TreeCuttingRulesComponent,
    TreeGuidelinesComponent,
    TreeCuttingDatesComponent,
    TreeSpeciesComponent,
    ForestFinderComponent,
    RemovePuncPipe,
    LineBreakFormatterPipe,
    ColumnizeArrayPipe
  ],
  exports: [
    ReportComponent,
    ReportResultsComponent,
    TreeCuttingRulesComponent,
    TreeGuidelinesComponent,
    TreeCuttingDatesComponent,
    TreeSpeciesComponent,
    LineBreakFormatterPipe,
    ColumnizeArrayPipe
  ],
  imports: [SharedModule, ApplicationsModule],
  providers: [ForestService, TreesAdminService, ChristmasTreesApplicationService]
})
export class TreesModule {}
