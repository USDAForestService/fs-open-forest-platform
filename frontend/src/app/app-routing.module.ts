import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ApplicationNoncommercialGroupComponent } from './applications/application-noncommercial-group/application-noncommercial-group.component';
import { ApplicationSubmittedComponent } from './application-submitted/application-submitted.component';
import { HelpMePickComponent } from './help-me-pick/help-me-pick.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PermitApplicationConfirmComponent } from './admin/permit-application-confirm/permit-application-confirm.component';
import { PermitApplicationListComponent } from './admin/permit-application-list/permit-application-list.component';
import { PermitApplicationViewComponent } from './admin/permit-application-view/permit-application-view.component';
import { StyleGuideComponent } from './style-guide/style-guide.component';
import { TemporaryOutfittersComponent } from './applications/temporary-outfitters/temporary-outfitters.component';

const appRoutes: Routes = [
  { path: 'admin/applications', component: PermitApplicationListComponent },
  { path: 'admin/applications/:id', component: PermitApplicationViewComponent },
  { path: 'admin/applications/:id/confirm', component: PermitApplicationConfirmComponent },
  { path: 'applications/noncommercial-group-use/new', component: ApplicationNoncommercialGroupComponent },
  { path: 'applications/submitted/:id', component: ApplicationSubmittedComponent },
  { path: 'applications/temp-outfitters/new', component: TemporaryOutfittersComponent },
  { path: 'help-me-pick/:id', component: HelpMePickComponent },
  { path: 'login', component: LoginComponent },
  { path: 'style-guide', component: StyleGuideComponent },
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
