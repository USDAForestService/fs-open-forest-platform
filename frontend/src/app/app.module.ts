import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ApplicationService } from './_services/application.service';
import { ApplicationNoncommercialGroupComponent } from './applications/application-noncommercial-group/application-noncommercial-group.component';
import { FileUploader, FileSelectDirective } from '../../node_modules/ng2-file-upload/ng2-file-upload';
import { FileUploadComponent } from './applications/fields/file-upload.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PermitApplicationListComponent } from './admin/permit-application-list/permit-application-list.component';
import { PermitApplicationViewComponent } from './admin/permit-application-view/permit-application-view.component';
import { PgFlowStep1Component } from './pg-flow-step-1/pg-flow-step-1.component';
import { PgFlowStep2Component } from './pg-flow-step-2/pg-flow-step-2.component';
import { PgFlowRegPersonComponent } from './pg-flow-reg-person/pg-flow-reg-person.component';
import { PgFlowRegPersonFriendFamilyComponent } from './pg-flow-reg-person-friend-family/pg-flow-reg-person-friend-family.component';
import { ApplicationSubmittedComponent } from './application-submitted/application-submitted.component';
import { HelpMePickComponent } from './help-me-pick/help-me-pick.component';
import { TemporaryOutfittersComponent } from './applications/temporary-outfitters/temporary-outfitters.component';
import { TrackScrollDirective } from './_directives/scroll.directive';

@NgModule({
  declarations: [
    AppComponent,
    ApplicationNoncommercialGroupComponent,
    FileUploadComponent,
    FileSelectDirective,
    HomeComponent,
    LoginComponent,
    PermitApplicationListComponent,
    PermitApplicationViewComponent,
    PgFlowStep1Component,
    PgFlowStep2Component,
    PgFlowRegPersonComponent,
    PgFlowRegPersonFriendFamilyComponent,
    ApplicationSubmittedComponent,
    HelpMePickComponent,
    TemporaryOutfittersComponent,
    TrackScrollDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
  ],
  providers: [ApplicationService],
  bootstrap: [AppComponent]
})

export class AppModule { }
