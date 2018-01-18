import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccessDeniedComponent } from './error-pages/access-denied.component';
import { AppComponent } from './app.component';
import { ApplicationNoncommercialGroupComponent } from './application-forms/application-noncommercial-group/application-noncommercial-group.component';
import { ApplicationSubmittedComponent } from './application-forms/application-submitted/application-submitted.component';
import { AuthGuardService } from './_services/auth-guard.service';
import { ChristmasTreePermitResolver } from './application-forms/tree-application-form/christmas-tree-permit-resolver.service';
import { ChristmasTreePermitDetailResolver } from './application-forms/tree-application-form/christmas-tree-permit-detail-resolver.service';
import { ForestResolver } from './trees/forests/tree-guidelines/forest-resolver.service';
import { ForestFinderResolver } from './trees/forests/forest-finder/forest-finder-resolver.service';
import { HelpMePickComponent } from './help-me-pick/help-me-pick.component';
import { HomeComponent } from './home/home.component';
import { LandingPageComponent } from './pay-gov-mocks/landing-page/landing-page.component';
import { LoggedInComponent } from './login/logged-in.component';
import { NoncommercialLearnMoreComponent } from './application-forms/application-noncommercial-group/noncommercial-learn-more.component';
import { NotFoundComponent } from './error-pages/not-found.component';
import { PermitApplicationListComponent } from './applications/permit-application-list/permit-application-list.component';
import { PermitApplicationViewComponent } from './applications/permit-application-view/permit-application-view.component';
import { ReportComponent } from './trees/admin/report/report.component';
import { StyleGuideComponent } from './style-guide/style-guide.component';
import { TemporaryOutfittersComponent } from './application-forms/temporary-outfitters/temporary-outfitters.component';
import { TemporaryOutfittersLearnMoreComponent } from './application-forms/temporary-outfitters/temporary-outfitters-learn-more.component';
import { TreeGuidelinesComponent } from './trees/forests/tree-guidelines/tree-guidelines.component';
import { ForestFinderComponent } from './trees/forests/forest-finder/forest-finder.component';
import { TreeApplicationFormComponent } from './application-forms/tree-application-form/tree-application-form.component';
import { TreePermitViewComponent } from './application-forms/tree-application-form/tree-permit-view/tree-permit-view.component';
import { McBreadcrumbsModule } from 'ngx-breadcrumbs';

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
    path: 'admin/christmas-trees/reports',
    component: ReportComponent,
    canActivate: [AuthGuardService],
    resolve: {
      forests: ForestFinderResolver
    },
    data: {
      title: 'Christmas trees permits report | U.S. Forest Service Christmas Tree Permitting',
      breadcrumbs: 'Christmas trees permits report'
    }
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
    data: { title: 'View Submitted Application' }
  },
  {
    path: 'applications/noncommercial-group-use/new',
    component: ApplicationNoncommercialGroupComponent,
    canActivate: [AuthGuardService],
    data: { title: 'Apply for a noncommercial group use permit' }
  },
  {
    path: 'applications/noncommercial-group-use/:id/edit',
    component: ApplicationNoncommercialGroupComponent,
    canActivate: [AuthGuardService],
    data: { title: 'Edit your noncommercial group use permit' }
  },
  {
    path: 'applications/noncommercial-group-use/learn-more',
    component: NoncommercialLearnMoreComponent,
    data: { title: 'Noncommercial permit FAQs' }
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
    path: 'applications/temp-outfitters/:id/edit',
    component: TemporaryOutfittersComponent,
    canActivate: [AuthGuardService],
    data: { title: 'Edit your temporary outfitters permit' }
  },
  {
    path: 'applications/temp-outfitters/learn-more',
    component: TemporaryOutfittersLearnMoreComponent,
    data: { title: 'Temporary outfitters permit FAQs' }
  },
  {
    path: 'christmas-trees/forests',
    data: {
      breadcrumbs: true,
      text: 'Christmas tree permits'
    },
    children: [
      {
        path: '',
        component: ForestFinderComponent,
        resolve: {
          forests: ForestFinderResolver
        },
        data: {
          title: 'Christmas tree permits | U.S. Forest Service Christmas Tree Permitting'
        },
      },
      {
        path: ':id',
        resolve: {
          forest: ForestResolver
        },
        data: {
          breadcrumbs: true,
          text: '{{forest.forestName}}'
        },
        children: [
          {
            path: '',
            component: TreeGuidelinesComponent,
          },
          {
            path: 'applications',
            data: {breadcrumbs: 'Buy a permit'},
            children: [
              {
                path: '',
                component: TreeApplicationFormComponent,
              },
              {
                path: 'permits/:permitId',
                component: TreePermitViewComponent,
                resolve: {
                  permit: ChristmasTreePermitResolver
                },
                data: {breadcrumbs: 'Permit confirmation'}
              },
            ]
          },
          {
            // cancel route
            path: 'applications/:permitId',
            component: TreeApplicationFormComponent,
            resolve: {
              permit: ChristmasTreePermitDetailResolver
            },
            data: {breadcrumbs: 'Buy a permit'},
          },
        ]
      }
    ]
  }
  ,
  {
    path: 'mock-pay-gov',
    component: LandingPageComponent,
    data: { title: 'Complete your Christmas Tree permit transaction' }
  },
  { path: 'help-me-pick/:id', component: HelpMePickComponent, data: { title: '' } },
  { path: 'logged-in', component: LoggedInComponent, data: { title: 'Logged in' } },
  { path: 'style-guide', component: StyleGuideComponent, data: { title: 'Style guide' } },
  { path: 'access-denied', component: AccessDeniedComponent, data: { title: 'Access Denied' } },
  { path: '', component: HomeComponent, data: { title: 'US Forest Service ePermit' } },
  { path: '404', component: NotFoundComponent, data: { title: '404 not found' } },
  { path: '**', component: NotFoundComponent, data: { title: '404 not found' } }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: false }), McBreadcrumbsModule.forRoot()],
  exports: [RouterModule, McBreadcrumbsModule],
  providers: [ForestResolver, ForestFinderResolver]
})
export class AppRoutingModule {}
