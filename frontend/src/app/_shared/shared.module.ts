import { AppRoutingModule } from '../app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from '../_pipes/filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppButtonComponent } from '../home/app-button.component';
import { ProgressComponent } from '../progress/progress.component';
import { SidebarComponent } from './../sidebar/sidebar.component';
import { SectionHeadingComponent } from './../sidebar/section-heading.component';
import { SpacesToDashesPipe } from './../_pipes/spaces-to-dashes.pipe';
import { TrackScrollDirective } from './../_directives/scroll.directive';
import { InViewportModule } from 'ng-in-viewport';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { LineBreakFormatterPipe } from '../_pipes/line-break-formatter.pipe';
import { ChunkArrayPipe } from '../_pipes/chunk-array.pipe';

@NgModule({
  imports: [CommonModule, AppRoutingModule, Ng2AutoCompleteModule, InViewportModule.forRoot()],
  declarations: [
    AppButtonComponent,
    ChunkArrayPipe,
    FilterPipe,
    LineBreakFormatterPipe,
    ProgressComponent,
    SectionHeadingComponent,
    SidebarComponent,
    SpacesToDashesPipe,
    TrackScrollDirective
  ],
  exports: [
    AppButtonComponent,
    AppRoutingModule,
    CommonModule,
    ChunkArrayPipe,
    FilterPipe,
    FormsModule,
    InViewportModule,
    LineBreakFormatterPipe,
    Ng2AutoCompleteModule,
    ProgressComponent,
    ReactiveFormsModule,
    SectionHeadingComponent,
    SidebarComponent,
    SpacesToDashesPipe,
    TrackScrollDirective
  ]
})
export class SharedModule {}
