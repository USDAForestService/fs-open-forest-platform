import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ApplicationService } from './_services/application.service';
import { ApplicationSubmittedComponent } from './application-submitted/application-submitted.component';
import { ApplicationsModule } from './applications/applications.module';
import { HelpMePickComponent } from './help-me-pick/help-me-pick.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PermitApplicationListComponent } from './admin/permit-application-list/permit-application-list.component';
import { PermitApplicationViewComponent } from './admin/permit-application-view/permit-application-view.component';
import { StyleGuideComponent } from './style-guide/style-guide.component';
import { TrackScrollDirective } from './_directives/scroll.directive';

@NgModule({
  declarations: [
    AppComponent,
    ApplicationSubmittedComponent,
    HelpMePickComponent,
    HomeComponent,
    LoginComponent,
    PermitApplicationListComponent,
    PermitApplicationViewComponent,
    StyleGuideComponent,
    TrackScrollDirective
  ],
  imports: [
    AppRoutingModule,
    ApplicationsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [ApplicationService],
  bootstrap: [AppComponent]
})

export class AppModule { }
