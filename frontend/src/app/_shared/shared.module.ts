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
import { SidebarConfigService } from '../sidebar/sidebar-config.service';
import { TreeRulesComponent } from '../trees/forests/tree-guidelines/tree-rules.component';
import { SpinnerModule } from 'angular2-spinner/dist';

@NgModule({
  imports: [CommonModule, AppRoutingModule, Ng2AutoCompleteModule, SpinnerModule, InViewportModule.forRoot()],
  declarations: [
    ApiErrorComponent,
    TrackScrollDirective,
    AppButtonComponent,
    FilterPipe,
    ProgressComponent,
    SectionHeadingComponent,
    SidebarComponent,
    SpacesToDashesPipe,
    UrlPipe,
    TrackScrollDirective,
    TreeRulesComponent
  ],
  exports: [
    ApiErrorComponent,
    FilterPipe,
    AppRoutingModule,
    CommonModule,
    FilterPipe,
    FormsModule,
    InViewportModule,
    Ng2AutoCompleteModule,
    AppButtonComponent,
    ProgressComponent,
    ReactiveFormsModule,
    SectionHeadingComponent,
    SidebarComponent,
    SpacesToDashesPipe,
    TrackScrollDirective,
    TreeRulesComponent,
    UrlPipe,
    ProgressComponent
  ],
  providers: [SidebarConfigService]
})
export class SharedModule {}
