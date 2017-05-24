import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ApplicationNoncommercialGroupComponent } from './application-noncommercial-group/application-noncommercial-group.component';
import { ApplicationNoncommercialGroupService } from './application-noncommercial-group/application-noncommercial-group-service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PermitApplicationListComponent } from './permit-application-list/permit-application-list.component';
import { PermitApplicationViewComponent } from './permit-application-view/permit-application-view.component';
import { PgFlowStep1Component } from './pg-flow-step-1/pg-flow-step-1.component';
import { PgFlowStep2Component } from './pg-flow-step-2/pg-flow-step-2.component';
import { PgFlowRegPersonComponent } from './pg-flow-reg-person/pg-flow-reg-person.component';
import { PgFlowRegPersonFriendFamilyComponent } from './pg-flow-reg-person-friend-family/pg-flow-reg-person-friend-family.component';
import { ApplicationSubmittedComponent } from './application-submitted/application-submitted.component';
import { HelpMePickComponent } from './help-me-pick/help-me-pick.component';

const appRoutes: Routes = [
  { path: 'applications/noncommercial-group-use/new', component: ApplicationNoncommercialGroupComponent },
  { path: 'applications/submitted', component: ApplicationSubmittedComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin/applications', component: PermitApplicationListComponent },
  { path: 'admin/applications/:id', component: PermitApplicationViewComponent },
  { path: 'help-me-pick/:id', component: HelpMePickComponent },
  { path: 'pg-flow-step-1', component: PgFlowStep1Component },
  { path: 'pg-flow-step-2', component: PgFlowStep2Component },
  { path: 'pg-flow-reg-person', component: PgFlowRegPersonComponent },
  { path: 'pg-flow-reg-person-friend-family', component: PgFlowRegPersonFriendFamilyComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: HomeComponent }
];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { useHash: true })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
