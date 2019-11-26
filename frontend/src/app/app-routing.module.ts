import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccessDeniedComponent } from './error-pages/access-denied.component';
import { ApplicationNoncommercialGroupComponent } from './application-forms/application-noncommercial-group/application-noncommercial-group.component';
import { ApplicationSubmittedComponent } from './application-forms/application-submitted/application-submitted.component';
import { AccessControlService } from './_services/access-control.service';
import { AdminAccessControlService } from './_services/admin-access-control.service';
import { ChristmasTreePermitResolver } from './application-forms/tree-application-form/christmas-tree-permit-resolver.service';
import { DummyComponent } from './print-permit-dummy-page/dummy.component';
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
import { McBreadcrumbsModule } from 'ngx6-angular-breadcrumbs';
import { UserResolver } from './user-resolver.service';
import { AdminSeasonDatesComponent } from './trees/admin/season-dates/season-dates.component';
import { AdminDistrictDatesComponent } from './trees/admin/district-dates/district-dates.component';
import { AdminFeedbackReviewComponent } from './trees/admin/feedback-review/feedback-review.component';
import { PermitBreadcrumbsResolver } from './_services/permit-breadcrumbs.resolver';
import { ForestsAdminResolver } from './trees/forests/forest-finder/forests-admin-resolver.service';
import { ShutdownComponent } from './shutdown/shutdown.component';
import { SubmitFeedbackComponent } from './trees/forests/feedback/submit-feedback.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'christmas-trees/forests',
    pathMatch: 'full'
  }, {
    path: 'ChristmasTreePermit',
    component: DummyComponent
  }, {
    path: 'mbs',
    data: {
      title: 'US Forest Service Open Forest',
      breadcrumbs: true,
      text: 'Apply for a permit with Open Forest',
      displayLogin: true,
      specialUse: true
    },
    resolve: {
      user: UserResolver
    },
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'help-me-pick/:id',
        component: HelpMePickComponent,
        data: {
          title: 'Help me find a permit',
          breadcrumbs: 'Help me find a permit available on Open Forest'
        }
      },
      {
        path: 'applications/noncommercial-group-use/learn-more',
        component: NoncommercialLearnMoreComponent,
        data: {
          title: 'Learn more about a noncommercial group use permit',
        }
      },
      {
        path: 'applications/temp-outfitters/learn-more',
        component: TemporaryOutfittersLearnMoreComponent,
        data: {
          title: 'Learn more about a temporary outfitters permit',
        },
      },
      {
        path: 'applications',
        canActivateChild: [AccessControlService],
        children: [
          {
            path: '',
            component: HomeComponent,
          },
          {
            path: 'noncommercial-group-use/new',
            component: ApplicationNoncommercialGroupComponent,
            data: {
              title: 'Apply for a noncommercial group use permit with Open Forest',
            },
          },
          {
            path: 'noncommercial-group-use/:id/edit',
            component: ApplicationNoncommercialGroupComponent,
            data: {
              title: 'Edit your noncommercial group use permit with Open Forest'
            },
          },
          {
            path: ':type/submitted/:id',
            component: ApplicationSubmittedComponent,
            data: {
              title: 'Application submitted for review with Open Forest',
            },
          },
          {
            path: 'temp-outfitters/new',
            component: TemporaryOutfittersComponent,
            data: {
              title: 'Apply for a temporary outfitters permit with Open Forest',
            },
          },
          {
            path: 'temp-outfitters/:id/edit',
            component: TemporaryOutfittersComponent,
            data: {
              title: 'Edit your temporary outfitters permit with Open Forest',
            },
          },
        ]
      },
    ]
  },
  {
    path: 'shutdown',
    component: ShutdownComponent
  },
  {
    path: 'admin/applications',
    canActivateChild: [AdminAccessControlService],
    data: {
      breadcrumbs: true,
      text: 'Permit applications',
      displayLogin: true,
      admin: true,
      specialUse: true
    },
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
    canActivateChild: [AdminAccessControlService],
    data: {
      admin: true,
      showAdmin: true,
      displayLogin: true,
    },
    resolve: {
      user: UserResolver,
      forests: ForestsAdminResolver
    },
    children: [
      {
        path: '',
        redirectTo: 'reports',
        pathMatch: 'full'
      },
      {
        path: 'reports',
        component: ReportComponent,
        data: {
          title: 'Christmas trees permits report | U.S. Forest Service Open Forest',
          breadcrumbs: 'Christmas trees permits report',
        }
      },
      {
        path: 'season-dates',
        component: AdminSeasonDatesComponent,
        data: {
          title: 'Christmas trees permits season dates admin | U.S. Forest Service Open Forest',
          breadcrumbs: 'Christmas trees permits season dates',
        }
      },
      {
        path: 'district-dates',
        component: AdminDistrictDatesComponent,
        data: {
          title: 'Christmas trees permits Ranger District dates admin | U.S. Forest Service Open Forest',
          breadcrumbs: 'Christmas trees permits Ranger District dates',
        }
      },
      {
        path: 'feedback-review',
        component: AdminFeedbackReviewComponent,
        data: {
          title: 'Christmas trees feedback',
          breadcrumbs: 'Christmas trees feedback'
        }
      }
    ]
  },
  {
    path: 'user/applications',
    data: {
      displayLogin: true,
      specialUse: true
    },
    canActivateChild: [AccessControlService],
    resolve: {
      user: UserResolver
    },
    children: [
      {
        path: '',
        component: PermitApplicationListComponent,
        data: {
          title: 'Submitted Open Forest applications',
        },
      },
      {
        path: ':type/:id',
        component: PermitApplicationViewComponent,
        data: {
          title: 'View submitted Open Forest application',
        },
      },
    ]
  },
  {
    path: 'christmas-trees/forests',
    data: {
      breadcrumbs: true,
      text: 'Christmas tree permits',
      title: 'Christmas tree permits | U.S. Forest Service Open Forest',
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
  {
    path: 'feedback',
    component: SubmitFeedbackComponent,
    resolve: {
      user: UserResolver
    },
    data: { title: 'Submit Feedback' }
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
