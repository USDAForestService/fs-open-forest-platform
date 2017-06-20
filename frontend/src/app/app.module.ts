import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ApplicationNoncommercialGroupComponent } from './applications/application-noncommercial-group/application-noncommercial-group.component';
import { ApplicationService } from './_services/application.service';
import { ApplicationSubmittedComponent } from './application-submitted/application-submitted.component';
import { FileUploadComponent } from './applications/fields/file-upload.component';
import { FileUploader, FileSelectDirective } from '../../node_modules/ng2-file-upload/ng2-file-upload';
import { HelpMePickComponent } from './help-me-pick/help-me-pick.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PermitApplicationListComponent } from './admin/permit-application-list/permit-application-list.component';
import { PermitApplicationViewComponent } from './admin/permit-application-view/permit-application-view.component';
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
    StyleGuideComponent,
    TemporaryOutfittersComponent,
    TrackScrollDirective
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  providers: [ApplicationService],
  bootstrap: [AppComponent]
})

export class AppModule { }
