import { AppRoutingModule } from '../app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from '../_pipes/filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppButtonComponent } from './button/app-button.component';
import { ErrorMessageComponent } from '../application-forms/validators/error-message.component';
import { ProgressComponent } from '../progress/progress.component';
import { SidebarComponent } from './../sidebar/sidebar.component';
import { SectionHeadingComponent } from './../sidebar/section-heading.component';
import { AdminUserFormatterPipe } from './../_pipes/admin-user-formatter.pipe';
import { UrlPipe } from './../_pipes/url.pipe';
import { SpacesToDashesPipe } from './../_pipes/spaces-to-dashes.pipe';
import { CamelToHyphensPipe } from './../_pipes/camel-to-hyphens.pipe';
import { MarkdownModule } from 'ngx-md';
import { TrackScrollDirective } from './../_directives/scroll.directive';
import { InViewportModule } from 'ng-in-viewport';
import { ApiErrorComponent } from '../api-error/api-error.component';
import { SidebarConfigService } from '../sidebar/sidebar-config.service';
import { TreeRulesComponent } from '../trees/forests/tree-guidelines/tree-rules/tree-rules.component';
import { SpinnerModule } from 'angular2-spinner/dist';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';

@NgModule({
  imports: [CommonModule, AppRoutingModule, SpinnerModule, InViewportModule.forRoot(), MarkdownModule.forRoot()],
  declarations: [
    AdminUserFormatterPipe,
    ApiErrorComponent,
    BreadcrumbsComponent,
    ErrorMessageComponent,
    TrackScrollDirective,
    AppButtonComponent,
    FilterPipe,
    ProgressComponent,
    SectionHeadingComponent,
    SidebarComponent,
    SpacesToDashesPipe,
    CamelToHyphensPipe,
    UrlPipe,
    TrackScrollDirective,
    TreeRulesComponent
  ],
  exports: [
    AdminUserFormatterPipe,
    ApiErrorComponent,
    BreadcrumbsComponent,
    ErrorMessageComponent,
    FilterPipe,
    AppRoutingModule,
    CommonModule,
    FilterPipe,
    FormsModule,
    InViewportModule,
    AppButtonComponent,
    ProgressComponent,
    ReactiveFormsModule,
    SectionHeadingComponent,
    SidebarComponent,
    SpacesToDashesPipe,
    CamelToHyphensPipe,
    TrackScrollDirective,
    TreeRulesComponent,
    UrlPipe,
    ProgressComponent,
    MarkdownModule
  ],
  providers: [SidebarConfigService]
})
export class SharedModule {}
