import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccessDeniedComponent } from './error-pages/access-denied.component';
import { ApplicationNoncommercialGroupComponent } from './application-forms/application-noncommercial-group/application-noncommercial-group.component';
import { ApplicationSubmittedComponent } from './application-forms/application-submitted/application-submitted.component';
import { AccessControlService } from './_services/access-control.service';
import { ChristmasTreePermitResolver } from './application-forms/tree-application-form/christmas-tree-permit-resolver.service';
import { ForestResolver } from './trees/forests/tree-guidelines/forest-resolver.service';
import { ForestsResolver } from './trees/forests/forest-finder/forests-resolver.service';
import { HelpMePickComponent } from './help-me-pick/help-me-pick.component';
import { HomeComponent } from './intake-home/home.component';
import { LandingPageComponent } from './pay-gov-mocks/landing-page/landing-page.component';
import { LoggedInComponent } from './authentication/logged-in.component';
import { NoncommercialLearnMoreComponent } from './application-forms/application-noncommercial-group/noncommercial-learn-more.component';
import { NotFoundComponent } from './error-pages/not-found.component';
import { ServerErrorComponent } from './error-pages/server-error.component';
import { PermitApplicationListComponent } from './applications/permit-application-list/permit-application-list.component';
import { PermitApplicationViewComponent } from './applications/permit-application-view/permit-application-view.component';
import { ReportComponent } from './trees/admin/report/report.component';
import { StyleGuideComponent } from './style-guide/style-guide.component';
import { TemporaryOutfittersComponent } from './application-forms/temporary-outfitters/temporary-outfitters.component';
import { TemporaryOutfittersLearnMoreComponent } from './application-forms/temporary-outfitters/temporary-outfitters-learn-more.component';
import { TreeGuidelinesComponent } from './trees/forests/tree-guidelines/tree-guidelines.component';
import { ChristmasTreeMapDetailsComponent } from './trees/forests/christmas-tree-map-details/christmas-tree-map-details.component';
import { ForestFinderComponent } from './trees/forests/forest-finder/forest-finder.component';
import { TreeApplicationFormComponent } from './application-forms/tree-application-form/tree-application-form.component';
import { TreePermitViewComponent } from './application-forms/tree-application-form/tree-permit-view/tree-permit-view.component';
import { McBreadcrumbsModule } from 'ngx-breadcrumbs';
import { UserResolver } from './user-resolver.service';
import { AdminSeasonDatesComponent } from './trees/admin/season-dates/season-dates.component';
import { AdminDistrictDatesComponent } from './trees/admin/district-dates/district-dates.component';
import { PermitBreadcrumbsResolver } from './_services/permit-breadcrumbs.resolver';
import { ForestsAdminResolver } from './trees/forests/forest-finder/forests-admin-resolver.service';

const appRoutes: Routes = [
  {
    path: '',
    data: {
      breadcrumbs: true,
      text: 'Apply for a permit',
      displayLogin: true
    },
    resolve: {
      user: UserResolver
    },
    children: [
      {
        path: '',
        component: HomeComponent,
        data: {
          title: 'US Forest Service ePermit'
        }
      },
      {
        path: 'help-me-pick/:id',
        component: HelpMePickComponent,
        data: {
          title: 'Help me find a permit',
          breadcrumbs: 'Help me find a permit'
        }
      }
    ]
  },
  {
    path: 'admin/applications',
    data: {
      breadcrumbs: true,
      text: 'Permit applications',
      admin: true
    },
    canActivate: [AccessControlService],
    resolve: {
      user: UserResolver
    },
    children: [
      {
        path: '',
        component: PermitApplicationListComponent,
        data: {
          title: 'Application administration listing'
        }
      },
      {
        path: ':type/:id',
        component: PermitApplicationViewComponent,
        data: {
          title: 'View application',
          breadcrumbs: 'View application'
        }
      }
    ]
  },
  {
    path: 'admin/christmas-trees',
    canActivate: [AccessControlService],
    data: {
      admin: true,
      showAdmin: true
    },
    resolve: {
      user: UserResolver,
      forests: ForestsAdminResolver
    },
    children: [
      {
        path: 'reports',
        component: ReportComponent,
        data: {
          title: 'Christmas trees permits report | U.S. Forest Service Christmas Tree Permitting',
          breadcrumbs: 'Christmas trees permits report',
          admin: true
        }
      },
      {
        path: 'season-dates',
        component: AdminSeasonDatesComponent,
        data: {
          title: 'Christmas trees permits season dates admin | U.S. Forest Service Christmas Tree Permitting',
          breadcrumbs: 'Christmas trees permits season dates',
          admin: true
        }
      },
      {
        path: 'district-dates',
        component: AdminDistrictDatesComponent,
        data: {
          title: 'Christmas trees permits Ranger District dates admin | U.S. Forest Service Christmas Tree Permitting',
          breadcrumbs: 'Christmas trees permits Ranger District dates',
          admin: true
        }
      }
    ]
  },
  {
    path: 'user/applications',
    component: PermitApplicationListComponent,
    canActivate: [AccessControlService],
    data: { title: 'Submitted applications' },
    resolve: {
      user: UserResolver
    }
  },
  {
    path: 'user/applications/:type/:id',
    component: PermitApplicationViewComponent,
    canActivate: [AccessControlService],
    data: { title: 'View Submitted Application' },
    resolve: {
      user: UserResolver
    }
  },
  {
    path: 'applications/noncommercial-group-use/new',
    component: ApplicationNoncommercialGroupComponent,
    canActivate: [AccessControlService],
    data: { title: 'Apply for a noncommercial group use permit' },
    resolve: {
      user: UserResolver
    }
  },
  {
    path: 'applications/noncommercial-group-use/:id/edit',
    component: ApplicationNoncommercialGroupComponent,
    canActivate: [AccessControlService],
    data: { title: 'Edit your noncommercial group use permit' },
    resolve: {
      user: UserResolver
    }
  },
  {
    path: 'applications/noncommercial-group-use/learn-more',
    component: NoncommercialLearnMoreComponent,
    data: { title: 'Noncommercial permit FAQs' },
    resolve: {
      user: UserResolver
    }
  },
  {
    path: 'applications/:type/submitted/:id',
    component: ApplicationSubmittedComponent,
    data: { title: 'Application submitted for review' },
    resolve: {
      user: UserResolver
    }
  },
  {
    path: 'applications/temp-outfitters/new',
    component: TemporaryOutfittersComponent,
    canActivate: [AccessControlService],
    data: { title: 'Apply for a temporary outfitters permit' },
    resolve: {
      user: UserResolver
    }
  },
  {
    path: 'applications/temp-outfitters/:id/edit',
    component: TemporaryOutfittersComponent,
    canActivate: [AccessControlService],
    data: { title: 'Edit your temporary outfitters permit' },
    resolve: {
      user: UserResolver
    }
  },
  {
    path: 'applications/temp-outfitters/learn-more',
    component: TemporaryOutfittersLearnMoreComponent,
    data: { title: 'Temporary outfitters permit FAQs' },
    resolve: {
      user: UserResolver
    }
  },
  {
    path: 'christmas-trees/forests',
    data: {
      breadcrumbs: true,
      text: 'Christmas tree permits',
      title: 'Christmas tree permits | U.S. Forest Service Christmas Tree Permitting',
      requireLogin: false,
      showAdmin: true
    },
    resolve: {
      user: UserResolver
    },
    children: [
      {
        path: '',
        component: ForestFinderComponent,
        resolve: {
          forests: ForestsResolver
        }
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
            component: TreeGuidelinesComponent
          },
          {
            path: 'applications',
            data: { breadcrumbs: 'Buy a permit' },
            children: [
              {
                path: '',
                component: TreeApplicationFormComponent
              }
            ]
          },
          {
            // cancel route
            path: 'applications/:permitId',
            component: TreeApplicationFormComponent,
            resolve: {
              permit: ChristmasTreePermitResolver
            },
            data: { breadcrumbs: 'Buy a permit' }
          },
          {
            path: 'maps/:mapId',
            component: ChristmasTreeMapDetailsComponent
          }
        ]
      }
    ]
  },
  {
    path: 'christmas-trees/forests/:id/applications/permits/:permitId',
    component: TreePermitViewComponent,
    resolve: {
      permit: ChristmasTreePermitResolver
    },
    data: {
      breadcrumbs: PermitBreadcrumbsResolver,
      showAdmin: true
    }
  },
  {
    path: 'mock-pay-gov',
    component: LandingPageComponent,
    data: { title: 'Complete your Christmas Tree permit transaction' }
  },

  { path: 'logged-in', component: LoggedInComponent, data: { title: 'Logged in' } },
  { path: 'style-guide', component: StyleGuideComponent, data: { title: 'Style guide' } },
  { path: 'access-denied', component: AccessDeniedComponent, data: { title: 'Access Denied' } },
  { path: '500', component: ServerErrorComponent, data: { title: '500 server error' } },
  { path: '404', component: NotFoundComponent, data: { title: '404 not found' } },
  { path: '**', component: NotFoundComponent, data: { title: '404 not found' } }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: false }), McBreadcrumbsModule.forRoot()],
  exports: [RouterModule, McBreadcrumbsModule],
  providers: [ForestResolver, ForestsResolver, ForestsAdminResolver]
})
export class AppRoutingModule {}
