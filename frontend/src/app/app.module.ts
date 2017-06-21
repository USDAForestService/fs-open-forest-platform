import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ApplicationNoncommercialGroupComponent } from './applications/application-noncommercial-group/application-noncommercial-group.component';
import { ApplicationService } from './_services/application.service';
import { ApplicationSubmittedComponent } from './application-submitted/application-submitted.component';
import { ApplicationsModule } from './applications/applications.module';
import { FileUploadComponent } from './applications/fields/file-upload.component';
import { FileUploader, FileSelectDirective } from '../../node_modules/ng2-file-upload/ng2-file-upload';
import { HelpMePickComponent } from './help-me-pick/help-me-pick.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PermitApplicationListComponent } from './admin/permit-application-list/permit-application-list.component';
import { PermitApplicationViewComponent } from './admin/permit-application-view/permit-application-view.component';
import { PgFlowRegPersonComponent } from './pg-flow-reg-person/pg-flow-reg-person.component';
import { PgFlowRegPersonFriendFamilyComponent } from './pg-flow-reg-person-friend-family/pg-flow-reg-person-friend-family.component';
import { PgFlowStep1Component } from './pg-flow-step-1/pg-flow-step-1.component';
import { PgFlowStep2Component } from './pg-flow-step-2/pg-flow-step-2.component';
import { StyleGuideComponent } from './style-guide/style-guide.component';
import { TemporaryOutfittersComponent } from './applications/temporary-outfitters/temporary-outfitters.component';
import { TrackScrollDirective } from './_directives/scroll.directive';

@NgModule({
  declarations: [
    AppComponent,
    ApplicationNoncommercialGroupComponent,
    ApplicationSubmittedComponent,
    FileSelectDirective,
    FileUploadComponent,
    HelpMePickComponent,
    HomeComponent,
    LoginComponent,
    PermitApplicationListComponent,
    PermitApplicationViewComponent,
    PgFlowRegPersonComponent,
    PgFlowRegPersonFriendFamilyComponent,
    PgFlowStep1Component,
    PgFlowStep2Component,
    StyleGuideComponent,
    TemporaryOutfittersComponent,
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
