import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ApplicationNoncommercialGroupComponent } from './application-noncommercial-group/application-noncommercial-group.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PermitApplicationListComponent } from './permit-application-list/permit-application-list.component';
import { PermitApplicationViewComponent } from './permit-application-view/permit-application-view.component';
import { PgFlowStep1Component } from './pg-flow-step-1/pg-flow-step-1.component';
import { PgFlowStep2Component } from './pg-flow-step-2/pg-flow-step-2.component';
import { PgFlowRegPersonComponent } from './pg-flow-reg-person/pg-flow-reg-person.component';
import { PgFlowRegPersonFriendFamilyComponent } from './pg-flow-reg-person-friend-family/pg-flow-reg-person-friend-family.component';

const appRoutes: Routes = [
  { path: 'application-noncommercial-group', component: ApplicationNoncommercialGroupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'permit-application-list', component: PermitApplicationListComponent },
  { path: 'permit-application-view', component: PermitApplicationViewComponent },
  { path: 'pg-flow-step-1', component: PgFlowStep1Component },
  { path: 'pg-flow-step-2', component: PgFlowStep2Component },
  { path: 'pg-flow-reg-person', component: PgFlowRegPersonComponent },
  { path: 'pg-flow-reg-person-friend-family', component: PgFlowRegPersonFriendFamilyComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ApplicationNoncommercialGroupComponent,
    HomeComponent,
    LoginComponent,
    PermitApplicationListComponent,
    PermitApplicationViewComponent,
    PgFlowStep1Component,
    PgFlowStep2Component,
    PgFlowRegPersonComponent,
    PgFlowRegPersonFriendFamilyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
