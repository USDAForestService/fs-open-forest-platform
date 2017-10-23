import { AppRoutingModule } from '../app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from '../_pipes/filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppButtonComponent } from '../home/app-button.component';
import { ProgressComponent } from '../progress/progress.component';
import { TrackScrollDirective } from './../_directives/scroll.directive';
import { SpacesToDashesPipe } from '../_pipes/spaces-to-dashes.pipe';

@NgModule({
  imports: [CommonModule, AppRoutingModule],
  declarations: [FilterPipe, SpacesToDashesPipe, TrackScrollDirective, AppButtonComponent, ProgressComponent],
  exports: [
    FilterPipe,
    AppRoutingModule,
    TrackScrollDirective,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AppButtonComponent,
    ProgressComponent,
    SpacesToDashesPipe
  ]
})
export class SharedModule {}
