import { NgModule } from '@angular/core';

import { SharedModule } from '../_shared/shared.module';
import { TreeInfoComponent } from './tree-selection/tree-info.component';
import { TreesService } from './_services/trees.service';
import { SidebarViewComponent } from './tree-selection/sidebar-view.component';
import { WizardViewComponent } from './tree-selection/wizard-view.component';

@NgModule({
  declarations: [TreeInfoComponent, SidebarViewComponent, WizardViewComponent],
  exports: [TreeInfoComponent, SidebarViewComponent, WizardViewComponent],
  imports: [SharedModule],
  providers: [TreesService]
})
export class TreesModule {}
