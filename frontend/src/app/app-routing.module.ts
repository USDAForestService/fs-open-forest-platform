import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ApplicationNoncommercialGroupComponent } from './applications/application-noncommercial-group/application-noncommercial-group.component';
import { ApplicationSubmittedComponent } from './applications/application-submitted/application-submitted.component';
import { AuthGuardService } from './_services/auth-guard.service';
import { HelpMePickComponent } from './help-me-pick/help-me-pick.component';
import { HomeComponent } from './home/home.component';
import { LoginFormComponent } from './login/login-form.component';
import { PermitApplicationListComponent } from './admin/permit-application-list/permit-application-list.component';
import { PermitApplicationViewComponent } from './admin/permit-application-view/permit-application-view.component';
import { StyleGuideComponent } from './style-guide/style-guide.component';
import { TemporaryOutfittersComponent } from './applications/temporary-outfitters/temporary-outfitters.component';
import { TemporaryOutfittersFaqComponent } from './applications/temporary-outfitters/temporary-outfitters-faq.component';

const appRoutes: Routes = [
  {
    path: 'admin/applications',
    component: PermitApplicationListComponent,
    canActivate: [AuthGuardService],
    data: { title: 'Application administration listing' }
  },
  {
    path: 'admin/applications/:type/:id',
    component: PermitApplicationViewComponent,
    data: { title: 'View application' }
  },
  {
    path: 'applications/noncommercial-group-use/new',
    component: ApplicationNoncommercialGroupComponent,
    canActivate: [AuthGuardService],
    data: { title: 'Apply for a noncommercial group use permit' }
  },
  {
    path: 'applications/:type/submitted/:id',
    component: ApplicationSubmittedComponent,
    data: { title: 'Application submitted for review' }
  },
  {
    path: 'applications/temp-outfitters/new',
    component: TemporaryOutfittersComponent,
    canActivate: [AuthGuardService],
    data: { title: 'Apply for a temporary outfitters permit' }
  },
  {
    path: 'applications/temp-outfitters/faq',
    component: TemporaryOutfittersFaqComponent,
    data: { title: 'Temporary outfitters permit FAQs' }
  },
  { path: 'help-me-pick/:id', component: HelpMePickComponent, data: { title: '' } },
  { path: 'login/:type', component: LoginFormComponent, data: { title: 'Login' } },
  { path: 'style-guide', component: StyleGuideComponent, data: { title: 'Style guide' } },
  { path: '', component: HomeComponent, data: { title: 'US Forest Service ePermit' } },
  { path: '**', component: HomeComponent, data: { title: 'US Forest Service ePermit' } }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
