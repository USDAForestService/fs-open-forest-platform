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

@NgModule({
  imports: [CommonModule, AppRoutingModule, Ng2AutoCompleteModule, InViewportModule.forRoot()],
  declarations: [
    TrackScrollDirective,
    AppButtonComponent,
    FilterPipe,
    ProgressComponent,
    SectionHeadingComponent,
    SpacesToDashesPipe,
    SidebarComponent
  ],
  exports: [
    FilterPipe,
    AppRoutingModule,
    TrackScrollDirective,
    CommonModule,
    InViewportModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2AutoCompleteModule,
    AppButtonComponent,
    SectionHeadingComponent,
    SpacesToDashesPipe,
    SidebarComponent,
    ProgressComponent
  ]
})
export class SharedModule {}
