import { NgModule } from '@angular/core';
import { ApplicationsModule } from '../application-forms/applications.module';
import { ContactInfoComponent } from './forests/tree-guidelines/contact-info/contact-info.component';
import { ReportComponent } from './admin/report/report.component';
import { ReportResultsComponent } from './admin/report/results/report-results.component';
import { SharedModule } from '../_shared/shared.module';
import { TreeGuidelinesComponent } from './forests/tree-guidelines/tree-guidelines.component';
import { TreeCuttingDatesComponent } from './forests/tree-guidelines/tree-cutting-dates/tree-cutting-dates.component';
import { TreeSpeciesComponent } from './forests/tree-guidelines/tree-selection/tree-species/tree-species.component';

import { TreeToolsComponent } from './forests/tree-guidelines/tree-cutting/tree-tools/tree-tools.component';

import { TripPlanningComponent } from './forests/tree-guidelines/trip-planning/trip-planning.component';

import { TreesService } from './_services/trees.service';
import { TreeCuttingRulesComponent } from './forests/tree-guidelines/tree-cutting/tree-cutting-rules/tree-cutting-rules.component';
import { TreeLocationsProhibitedComponent } from './forests/tree-guidelines/tree-locations/tree-locations-prohibited/tree-locations-prohibited.component';
import { TreeLocationsAllowedComponent } from './forests/tree-guidelines/tree-locations/tree-locations-allowed/tree-locations-allowed.component';
import { TreeLocationsMapsComponent } from './forests/tree-guidelines/tree-locations/tree-locations-maps/tree-locations-maps.component';
import { ForestService } from './_services/forest.service';
import { ForestFinderComponent } from './forests/forest-finder/forest-finder.component';
import { RemovePuncPipe } from './forests/forest-finder/remove-punc.pipe';
import { LineBreakFormatterPipe } from '../_pipes/line-break-formatter.pipe';
import { ColumnizeArrayPipe } from '../_pipes/columnize-array.pipe';
import { ChristmasTreesApplicationService } from './_services/christmas-trees-application.service';
import { TreeDistrictsUtilService } from './forests/tree-guidelines/tree-districts-util.service';
import { AdminSeasonDatesComponent } from './admin/season-dates/season-dates.component';
import { TreesAdminService } from './admin/trees-admin.service';

@NgModule({
  declarations: [
    ContactInfoComponent,
    ReportComponent,
    ReportResultsComponent,
    AdminSeasonDatesComponent,
    TreeCuttingRulesComponent,
    TreeGuidelinesComponent,
    TreeCuttingDatesComponent,
    TreeLocationsMapsComponent,
    TreeLocationsProhibitedComponent,
    TreeLocationsAllowedComponent,
    TreeSpeciesComponent,
    TripPlanningComponent,
    TreeToolsComponent,
    ForestFinderComponent,
    RemovePuncPipe,
    LineBreakFormatterPipe,
    ColumnizeArrayPipe
  ],
  exports: [
    ContactInfoComponent,
    ReportComponent,
    ReportResultsComponent,
    TreeCuttingRulesComponent,
    TreeGuidelinesComponent,
    TreeCuttingDatesComponent,
    TreeSpeciesComponent,
    TripPlanningComponent,
    LineBreakFormatterPipe,
    ColumnizeArrayPipe
  ],
  imports: [SharedModule, ApplicationsModule],
  providers: [TreesService, TreesAdminService, ForestService, ChristmasTreesApplicationService, TreeDistrictsUtilService]
})
export class TreesModule {}
