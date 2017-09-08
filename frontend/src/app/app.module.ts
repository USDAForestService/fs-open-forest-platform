import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AlertService } from './_services/alert.service';
import { AppComponent } from './app.component';
import { ApplicationService } from './_services/application.service';
import { ApplicationsModule } from './applications/applications.module';
import { ApplicationSubmittedComponent } from './applications/application-submitted/application-submitted.component';
import { AuthenticatedComponent } from './login/authenticated.component';
import { AuthGuardService } from './_services/auth-guard.service';
import { AuthenticationService } from './_services/authentication.service';
import { Base64 } from './_pipes/base64.pipe';
import { DaysToOrDate } from './_pipes/days-to-or-date.pipe';
import { HelpMePickComponent } from './help-me-pick/help-me-pick.component';
import { HoursFromOrDate } from './_pipes/hours-from-or-date.pipe';
import { HomeComponent } from './home/home.component';
import { LoginFormComponent } from './login/login-form.component';
import { NoncommercialDetailsComponent } from './admin/permit-application-view/noncommercial-details.component';
import { PermitApplicationListComponent } from './admin/permit-application-list/permit-application-list.component';
import { PermitApplicationViewComponent } from './admin/permit-application-view/permit-application-view.component';
import { SharedModule } from './_shared/shared.module';
import { SortArray } from './_pipes/sort-array.pipe';
import { SpacesToDashesPipe } from './_pipes/spaces-to-dashes.pipe';
import { StatusComponent } from './status/status.component';
import { StyleGuideComponent } from './style-guide/style-guide.component';
import { TempOutfitterDetailsComponent } from './admin/permit-application-view/temp-outfitter-details.component';
import { TitleDirective } from './_directives/title.directive';
import { UsaBannerComponent } from './usa-banner/usa-banner.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticatedComponent,
    Base64,
    DaysToOrDate,
    HelpMePickComponent,
    HomeComponent,
    HoursFromOrDate,
    LoginFormComponent,
    NoncommercialDetailsComponent,
    PermitApplicationListComponent,
    PermitApplicationViewComponent,
    SortArray,
    SpacesToDashesPipe,
    StatusComponent,
    StyleGuideComponent,
    TempOutfitterDetailsComponent,
    TitleDirective,
    UsaBannerComponent
  ],
  imports: [AppRoutingModule, ApplicationsModule, BrowserModule, HttpModule, SharedModule],
  providers: [AlertService, ApplicationService, AuthGuardService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule {}
