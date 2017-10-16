import { NgModule } from '@angular/core';

import { SharedModule } from '../_shared/shared.module';
import { TreeInfoComponent } from './tree-selection/tree-info.component';
import { TreesService } from './_services/trees.service';

@NgModule({
  declarations: [TreeInfoComponent],
  exports: [TreeInfoComponent],
  imports: [SharedModule],
  providers: [TreesService]
})
export class TreesModule {}
