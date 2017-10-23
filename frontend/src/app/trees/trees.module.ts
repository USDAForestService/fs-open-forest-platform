import { NgModule } from '@angular/core';

import { ContactInfoComponent } from './forests/tree-guidelines/contact-info/contact-info.component';
import { SharedModule } from '../_shared/shared.module';
import { TreeGuidelinesComponent } from './forests/tree-guidelines/tree-guidelines.component';
import { TreeGuidelinesTextComponent } from './forests/tree-guidelines/tree-guidelines-text.component';
import { TreeSelectionComponent } from './forests/tree-guidelines/tree-selection/tree-selection.component';
import { TreeSpeciesComponent } from './forests/tree-guidelines/tree-selection/tree-species/tree-species.component';
import { TreeSafetyComponent } from './forests/tree-guidelines/safety/safety.component';

import { TreeCuttingComponent } from './forests/tree-guidelines/tree-cutting/tree-cutting.component';
import { TreeCuttingCleanupComponent } from './forests/tree-guidelines/tree-cutting/tree-cutting-cleanup/tree-cutting-cleanup.component';
import { TreeToolsComponent } from './forests/tree-guidelines/tree-cutting/tree-tools/tree-tools.component';
import { TreeLocationsComponent } from './forests/tree-guidelines/tree-locations/tree-locations.component';

import { TripPlanningComponent } from './forests/tree-guidelines/trip-planning/trip-planning.component';

import { TreesService } from './_services/trees.service';
import { SidebarViewComponent } from './forests/tree-guidelines/sidebar-view.component';
import { WizardViewComponent } from './forests/tree-guidelines/wizard-view.component';
import { TreeCuttingRulesComponent } from './forests/tree-guidelines/tree-cutting/tree-cutting-rules/tree-cutting-rules.component';
import { TreeLocationsProhibitedComponent } from './forests/tree-guidelines/tree-locations/tree-locations-prohibited/tree-locations-prohibited.component';
import { TreeLocationsAllowedComponent } from './forests/tree-guidelines/tree-locations/tree-locations-allowed/tree-locations-allowed.component';
import { TreeLocationsMapsComponent } from './forests/tree-guidelines/tree-locations/tree-locations-maps/tree-locations-maps.component';

@NgModule({
  declarations: [
    ContactInfoComponent,
    TreeCuttingComponent,
    TreeCuttingCleanupComponent,
    TreeCuttingRulesComponent,
    TreeGuidelinesComponent,
    TreeGuidelinesTextComponent,
    TreeLocationsComponent,
    TreeLocationsMapsComponent,
    TreeLocationsProhibitedComponent,
    TreeLocationsAllowedComponent,
    TreeSafetyComponent,
    TreeSelectionComponent,
    TreeSpeciesComponent,
    TripPlanningComponent,
    TreeToolsComponent,
    SidebarViewComponent,
    WizardViewComponent
  ],
  exports: [
    ContactInfoComponent,
    TreeCuttingComponent,
    TreeCuttingCleanupComponent,
    TreeCuttingRulesComponent,
    TreeGuidelinesComponent,
    TreeGuidelinesTextComponent,
    TreeLocationsComponent,
    TreeSafetyComponent,
    TreeSelectionComponent,
    TreeSpeciesComponent,
    TripPlanningComponent,
    TreeToolsComponent,
    SidebarViewComponent,
    WizardViewComponent
  ],
  imports: [SharedModule],
  providers: [TreesService]
})
export class TreesModule {}
