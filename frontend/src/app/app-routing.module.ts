import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccessDeniedComponent } from './login/access-denied.component';
import { AppComponent } from './app.component';
import { ApplicationNoncommercialGroupComponent } from './application-forms/application-noncommercial-group/application-noncommercial-group.component';
import { ApplicationSubmittedComponent } from './application-forms/application-submitted/application-submitted.component';
import { AuthGuardService } from './_services/auth-guard.service';
import { ForestResolver } from './trees/forests/forest-resolver.service';
import { HelpMePickComponent } from './help-me-pick/help-me-pick.component';
import { HomeComponent } from './home/home.component';
import { LoggedInComponent } from './login/logged-in.component';
import { PermitApplicationListComponent } from './applications/permit-application-list/permit-application-list.component';
import { PermitApplicationViewComponent } from './applications/permit-application-view/permit-application-view.component';
import { StyleGuideComponent } from './style-guide/style-guide.component';
import { TemporaryOutfittersComponent } from './application-forms/temporary-outfitters/temporary-outfitters.component';
import { TemporaryOutfittersFaqComponent } from './application-forms/temporary-outfitters/temporary-outfitters-faq.component';
import { TreeGuidelinesComponent } from './trees/forests/tree-guidelines/tree-guidelines.component';

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
    canActivate: [AuthGuardService],
    data: { title: 'View application' }
  },
  {
    path: 'user/applications',
    component: PermitApplicationListComponent,
    canActivate: [AuthGuardService],
    data: { title: 'Submitted applications' }
  },
  {
    path: 'user/applications/:type/:id',
    component: PermitApplicationViewComponent,
    canActivate: [AuthGuardService],
    data: { title: ' View Submitted Application' }
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
  {
    path: 'xmas-trees/forests/:id/tree-guidelines/:template',
    component: TreeGuidelinesComponent,
    resolve: {
      forest: ForestResolver
    },
    data: { title: 'Christmas tree info' }
  },
  { path: 'help-me-pick/:id', component: HelpMePickComponent, data: { title: '' } },
  { path: 'logged-in', component: LoggedInComponent, data: { title: 'Logged in' } },
  { path: 'style-guide', component: StyleGuideComponent, data: { title: 'Style guide' } },
  { path: 'access-denied', component: AccessDeniedComponent, data: { title: 'Access Denied' } },
  { path: '', component: HomeComponent, data: { title: 'US Forest Service ePermit' } },
  { path: '**', component: HomeComponent, data: { title: 'US Forest Service ePermit' } }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: false })],
  exports: [RouterModule],
  providers: [ForestResolver]
})
export class AppRoutingModule {}
