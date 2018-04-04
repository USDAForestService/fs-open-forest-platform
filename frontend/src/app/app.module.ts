import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccessDeniedComponent } from './error-pages/access-denied.component';
import { AlertService } from './_services/alert.service';
import { AppComponent } from './app.component';
import { ApplicationService } from './_services/application.service';
import { ApplicationsModule } from './application-forms/applications.module';
import { AuthenticatedComponent } from './authentication/authenticated.component';
import { AccessControlService } from './_services/access-control.service';
import { AuthenticationService } from './_services/authentication.service';
import { Base64 } from './_pipes/base64.pipe';
import { CancelApplicationComponent } from './applications/actions/cancel-application.component';
import { DaysToOrDate } from './_pipes/days-to-or-date.pipe';
import { ErrorInterceptor } from './error-pages/error-interceptor.service';
import { HelpMePickComponent } from './help-me-pick/help-me-pick.component';
import { HoursFromOrDate } from './_pipes/hours-from-or-date.pipe';
import { HomeComponent } from './intake-home/home.component';
import { LoggedInComponent } from './authentication/logged-in.component';
import { NoncommercialDetailsComponent } from './applications/permit-application-view/noncommercial-details.component';
import { NotFoundComponent } from './error-pages/not-found.component';
import { ServerErrorComponent } from './error-pages/server-error.component';
import { PermitApplicationListComponent } from './applications/permit-application-list/permit-application-list.component';
import { PermitApplicationViewComponent } from './applications/permit-application-view/permit-application-view.component';
import { PayGovMocksModule } from './pay-gov-mocks/pay-gov-mocks.module';
import { RevisionHistoryComponent } from './applications/revision/revision-history.component';
import { SharedModule } from './shared/shared.module';
import { SortArray } from './_pipes/sort-array.pipe';
import { AlertComponent } from './alert/alert.component';
import { StyleGuideComponent } from './style-guide/style-guide.component';
import { TempOutfitterDetailsComponent } from './applications/permit-application-view/temp-outfitter-details.component';
import { TitleDirective } from './_directives/title.directive';
import { TreesModule } from './trees/trees.module';
import { UsaBannerComponent } from './usa-banner/usa-banner.component';
import { UtilService } from './_services/util.service';
import { WindowRef } from './_services/native-window.service';
import { PageHeaderComponent } from './shared/header/header.component';
import { PageFooterComponent } from './shared/footer/footer.component';
import { UserResolver } from './user-resolver.service';
import { PermitBreadcrumbsResolver } from './_services/permit-breadcrumbs.resolver';
import { ForestAdminNavComponent } from './authentication/forests-admin-nav.component';

@NgModule({
  declarations: [
    AccessDeniedComponent,
    AppComponent,
    AuthenticatedComponent,
    Base64,
    CancelApplicationComponent,
    DaysToOrDate,
    ForestAdminNavComponent,
    HelpMePickComponent,
    HomeComponent,
    HoursFromOrDate,
    LoggedInComponent,
    NoncommercialDetailsComponent,
    NotFoundComponent,
    ServerErrorComponent,
    PageFooterComponent,
    PageHeaderComponent,
    PermitApplicationListComponent,
    PermitApplicationViewComponent,
    RevisionHistoryComponent,
    SortArray,
    AlertComponent,
    StyleGuideComponent,
    TempOutfitterDetailsComponent,
    TitleDirective,
    UsaBannerComponent
  ],
  imports: [ApplicationsModule, BrowserModule, HttpClientModule, PayGovMocksModule, SharedModule, TreesModule],
  providers: [
    AlertService,
    ApplicationService,
    AccessControlService,
    AuthenticationService,
    PermitBreadcrumbsResolver,
    UtilService,
    UserResolver,
    WindowRef,
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
