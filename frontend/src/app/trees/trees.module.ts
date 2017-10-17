import { NgModule } from '@angular/core';

import { SharedModule } from '../_shared/shared.module';
import { TreeGuidelinesComponent } from './tree-guidelines/tree-guidelines.component';
import { TreeSelectionComponent } from './tree-guidelines/tree-selection/tree-selection.component';
import { TreeCuttingComponent } from './tree-guidelines/tree-cutting/tree-cutting.component';
import { TreeCuttingCleanupComponent } from './tree-guidelines/tree-cutting/tree-cutting-cleanup/tree-cutting-cleanup.component';

import { TreesService } from './_services/trees.service';
import { SidebarViewComponent } from './tree-guidelines/sidebar-view.component';
import { WizardViewComponent } from './tree-guidelines/wizard-view.component';

@NgModule({
  declarations: [TreeCuttingComponent, TreeCuttingCleanupComponent, TreeGuidelinesComponent, TreeSelectionComponent, SidebarViewComponent, WizardViewComponent],
  exports: [TreeCuttingComponent, TreeCuttingCleanupComponent, TreeGuidelinesComponent, TreeSelectionComponent, SidebarViewComponent, WizardViewComponent],
  imports: [SharedModule],
  providers: [TreesService]
})
export class TreesModule {}
