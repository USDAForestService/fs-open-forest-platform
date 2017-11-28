import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccessDeniedComponent } from './login/access-denied.component';
import { AlertService } from './_services/alert.service';
import { AppComponent } from './app.component';
import { ApplicationService } from './_services/application.service';
import { ApplicationsModule } from './application-forms/applications.module';
import { ApplicationSubmittedComponent } from './application-forms/application-submitted/application-submitted.component';
import { AuthenticatedComponent } from './login/authenticated.component';
import { AuthGuardService } from './_services/auth-guard.service';
import { AuthenticationService } from './_services/authentication.service';
import { Base64 } from './_pipes/base64.pipe';
import { CancelApplicationComponent } from './applications/actions/cancel-application.component';
import { DaysToOrDate } from './_pipes/days-to-or-date.pipe';
import { HelpMePickComponent } from './help-me-pick/help-me-pick.component';
import { HoursFromOrDate } from './_pipes/hours-from-or-date.pipe';
import { HomeComponent } from './home/home.component';
import { LoggedInComponent } from './login/logged-in.component';
import { NoncommercialDetailsComponent } from './applications/permit-application-view/noncommercial-details.component';
import { PermitApplicationListComponent } from './applications/permit-application-list/permit-application-list.component';
import { PermitApplicationViewComponent } from './applications/permit-application-view/permit-application-view.component';
import { PayGovMocksModule } from './pay-gov-mocks/pay-gov-mocks.module';
import { RevisionHistoryComponent } from './applications/revision/revision-history.component';
import { SharedModule } from './_shared/shared.module';
import { SortArray } from './_pipes/sort-array.pipe';
import { StatusComponent } from './status/status.component';
import { StyleGuideComponent } from './style-guide/style-guide.component';
import { TempOutfitterDetailsComponent } from './applications/permit-application-view/temp-outfitter-details.component';
import { TitleDirective } from './_directives/title.directive';
import { TreesModule } from './trees/trees.module';
import { UsaBannerComponent } from './usa-banner/usa-banner.component';
import { UtilService } from './_services/util.service';

@NgModule({
  declarations: [
    AccessDeniedComponent,
    AppComponent,
    AuthenticatedComponent,
    Base64,
    CancelApplicationComponent,
    DaysToOrDate,
    HelpMePickComponent,
    HomeComponent,
    HoursFromOrDate,
    LoggedInComponent,
    NoncommercialDetailsComponent,
    PermitApplicationListComponent,
    PermitApplicationViewComponent,
    RevisionHistoryComponent,
    SortArray,
    StatusComponent,
    StyleGuideComponent,
    TempOutfitterDetailsComponent,
    TitleDirective,
    UsaBannerComponent
  ],
  imports: [ApplicationsModule, BrowserModule, HttpModule, SharedModule, TreesModule, PayGovMocksModule],
  providers: [AlertService, ApplicationService, AuthGuardService, AuthenticationService, UtilService],
  bootstrap: [AppComponent]
})
export class AppModule {}
