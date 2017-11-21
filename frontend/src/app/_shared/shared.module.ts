import { AppRoutingModule } from '../app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from '../_pipes/filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppButtonComponent } from '../home/app-button.component';
import { ProgressComponent } from '../progress/progress.component';
import { SidebarComponent } from './../sidebar/sidebar.component';
import { SectionHeadingComponent } from './../sidebar/section-heading.component';
import { UrlPipe } from './../_pipes/url.pipe';
import { SpacesToDashesPipe } from './../_pipes/spaces-to-dashes.pipe';
import { TrackScrollDirective } from './../_directives/scroll.directive';
import { InViewportModule } from 'ng-in-viewport';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { ApiErrorComponent } from '../api-error/api-error.component';

@NgModule({
  imports: [CommonModule, AppRoutingModule, Ng2AutoCompleteModule, InViewportModule.forRoot()],
  declarations: [
    ApiErrorComponent,
    TrackScrollDirective,
    AppButtonComponent,
    FilterPipe,
    ProgressComponent,
    SectionHeadingComponent,
    SpacesToDashesPipe,
    UrlPipe,
    SidebarComponent
  ],
  exports: [
    ApiErrorComponent,
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
    UrlPipe,
    ProgressComponent
  ]
})
export class SharedModule {}
