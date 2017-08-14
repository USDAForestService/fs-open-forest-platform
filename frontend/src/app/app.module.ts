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
import { AuthGuard } from './_services/auth.guard';
import { AuthenticationService } from './_services/authentication.service';
import { DaysToOrDate } from './_pipes/days-to-or-date.pipe';
import { HelpMePickComponent } from './help-me-pick/help-me-pick.component';
import { HoursFromOrDate } from './_pipes/hours-from-or-date.pipe';
import { HomeComponent } from './home/home.component';
import { LoginFormComponent } from './login/login-form.component';
import { AuthenticatedComponent } from './login/authenticated.component';
import { PermitApplicationListComponent } from './admin/permit-application-list/permit-application-list.component';
import { PermitApplicationViewComponent } from './admin/permit-application-view/permit-application-view.component';
import { PermitApplicationViewDetailsComponent } from './admin/permit-application-view/permit-application-view-details.component';
import { SharedModule } from './_shared/shared.module';
import { SortArray } from './_pipes/sort-array.pipe';
import { SpacesToDashesPipe } from './_pipes/spaces-to-dashes.pipe';
import { StyleGuideComponent } from './style-guide/style-guide.component';
import { TitleDirective } from './_directives/title.directive';
import { UsaBannerComponent } from './usa-banner/usa-banner.component';

@NgModule({
  declarations: [
    AppComponent,
    DaysToOrDate,
    HelpMePickComponent,
    HomeComponent,
    HoursFromOrDate,
    LoginFormComponent,
    AuthenticatedComponent,
    PermitApplicationListComponent,
    PermitApplicationViewComponent,
    PermitApplicationViewDetailsComponent,
    SortArray,
    SpacesToDashesPipe,
    StyleGuideComponent,
    TitleDirective,
    UsaBannerComponent
  ],
  imports: [AppRoutingModule, ApplicationsModule, BrowserModule, HttpModule, SharedModule],
  providers: [AlertService, ApplicationService, AuthGuard, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule {}
