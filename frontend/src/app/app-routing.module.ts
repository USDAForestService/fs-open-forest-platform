import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessDeniedComponent } from './error-pages/access-denied.component';
import { ApplicationNoncommercialGroupComponent } from './application-forms/application-noncommercial-group/application-noncommercial-group.component';
import { ApplicationSubmittedComponent } from './application-forms/application-submitted/application-submitted.component';
import { AccessControlService } from './_services/access-control.service';
import { AdminAccessControlService } from './_services/admin-access-control.service';
import { FirewoodForestResolver } from './firewood/forests/firewood-guidelines/forest-resolver.service';
import { FirewoodForestsResolver } from './firewood/forests/forest-finder/forests-resolver.service';
import { HelpMePickComponent } from './help-me-pick/help-me-pick.component';
import { HomeComponent } from './intake-home/home.component';
import { LandingPageComponent } from './pay-gov-mocks/landing-page/landing-page.component';
import { LoggedInComponent } from './authentication/logged-in.component';
import { NoncommercialLearnMoreComponent } from './application-forms/application-noncommercial-group/noncommercial-learn-more.component';
import { NotFoundComponent } from './error-pages/not-found.component';
import { ServerErrorComponent } from './error-pages/server-error.component';
import { PermitApplicationListComponent } from './applications/permit-application-list/permit-application-list.component';
import { PermitApplicationViewComponent } from './applications/permit-application-view/permit-application-view.component';
import { StyleGuideComponent } from './style-guide/style-guide.component';
import { TemporaryOutfittersComponent } from './application-forms/temporary-outfitters/temporary-outfitters.component';
import { TemporaryOutfittersLearnMoreComponent } from './application-forms/temporary-outfitters/temporary-outfitters-learn-more.component';
import { FirewoodGuidelinesComponent } from './firewood/forests/firewood-guidelines/firewood-guidelines.component';
import { FirewoodForestFinderComponent } from './firewood/forests/forest-finder/forest-finder.component';
import { TreeApplicationFormComponent } from './application-forms/tree-application-form/tree-application-form.component';
import { TreePermitViewComponent } from './application-forms/tree-application-form/tree-permit-view/tree-permit-view.component';
import { McBreadcrumbsModule } from 'ngx6-angular-breadcrumbs';
import { UserResolver } from './user-resolver.service';
import { PermitBreadcrumbsResolver } from './_services/permit-breadcrumbs.resolver';
import { ShutdownComponent } from './shutdown/shutdown.component';
import { MainLandingComponent } from './main-landing/main-landing.component';
import { ProductsComponent } from './products/products.component';
import { ForestTemplateComponent } from './forest-pages/forest-template/forest-template.component';


const appRoutes: Routes = [
  {
    path: '',
    component: MainLandingComponent,
    resolve: {
      forests: FirewoodForestsResolver
    }
  },

  {
    path: 'products',
    data: {
      title: 'US Forest Service Open Forest',
      breadcrumbs: true,
      text: 'Forests'
    },
    resolve: {
      user: UserResolver
    },
    children: [
      {
        path: '',
        component: ProductsComponent,
      },
      {
      path: ':id',
      resolve: {
        forest: FirewoodForestResolver
      },
      data: {
        breadcrumbs: true,
        text: '{{forest.forestName}}'
      },
      children: [
        {
          path: '',
          component: ForestTemplateComponent
        },
      ]
      }
    ]
  },


  // start of MBS and children routes
  {
    path: 'special-use',
    data: {
      title: 'US Forest Service Open Forest',
      breadcrumbs: true,
      text: 'Mt. Baker-Snoqualmie special use permits',
      displayLogin: true,
      specialUse: true,
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
          breadcrumbs: 'Help me find a permit'
        }
      },
      {
        path: 'applications/noncommercial-group-use/learn-more',
        component: NoncommercialLearnMoreComponent,
        data: {
          title: 'Learn more about a Non-Commercial Group Use permit',
          breadcrumbs: 'Learn more'
        }
      },
      {
        path: 'applications/temp-outfitters/learn-more',
        component: TemporaryOutfittersLearnMoreComponent,
        data: {
          title: 'Learn more about a Temporary Outfitting and Guiding permit',
          breadcrumbs: 'Learn more'
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
              title: 'Apply for a Non-Commercial Group Use permit with Open Forest',
              breadcrumbs: 'Application'
            },
          },
          {
            path: 'noncommercial-group-use/:id/edit',
            component: ApplicationNoncommercialGroupComponent,
            data: {
              title: 'Edit your Non-Commercial Group Use permit with Open Forest',
              breadcrumbs: 'Application edit'
            },
          },
          {
            path: ':type/submitted/:id',
            component: ApplicationSubmittedComponent,
            data: {
              title: 'Application submitted for review with Open Forest',
              breadcrumbs: 'Application submitted'
            },
          },
          {
            path: 'temp-outfitters/new',
            component: TemporaryOutfittersComponent,
            data: {
              title: 'Apply for a Temporary Outfitting and Guiding permit with Open Forest',
              breadcrumbs: 'Application'
            },
          },
          {
            path: 'temp-outfitters/:id/edit',
            component: TemporaryOutfittersComponent,
            data: {
              title: 'Edit your Temporary Outfitting and Guiding permit with Open Forest',
              breadcrumbs: 'Application edit'
            },
          },
        ]
      },
    ]
  },
    // end of MBS and children routes

  {
    path: 'shutdown',
    component: ShutdownComponent
  },
  // start of admin applications and children routes
  {
    path: 'special-use/admin/applications',
    canActivateChild: [AdminAccessControlService],
    data: {
      displayLogin: true,
      admin: true,
      specialUse: true,
      breadcrumbs: true,
      text: 'Admin applications'
    },
    resolve: {
      user: UserResolver
    },
    children: [
      {
        path: '',
        component: PermitApplicationListComponent,
        data: {
          title: 'Application administration listing',
        }
      },
      {
        path: ':type/:id',
        component: PermitApplicationViewComponent,
        data: {
          title: 'View application',
          breadcrumbs: 'Application details'
        }
      }
    ]
  },
    // end of admin applications and children routes

  // start of user applications and children routes
  {
    path: 'special-use/user/applications',
    data: {
      displayLogin: true,
      specialUse: true,
      breadcrumbs: true,
      text: 'User Applications'
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
          breadcrumbs: 'Application details'
        },
      },
    ]
  },
  // end of user applications and children routes

  // firewood routes
  {
    path: 'firewood/forests',
    data: {
      breadcrumbs: true,
      text: 'Firewood permits',
      title: 'Firewood permits | U.S. Forest Service Open Forest',
      showAdmin: false
    },
    resolve: {
      user: UserResolver
    },
    children: [
      {
        path: '',
        component: FirewoodForestFinderComponent,
        resolve: {
          forests: FirewoodForestsResolver
        }
      },
      {
        path: ':id',
        resolve: {
          forest: FirewoodForestResolver
        },
        data: {
          breadcrumbs: true,
          text: '{{forest.forestName}}'
        },
        children: [
          {
            path: '',
            component: FirewoodGuidelinesComponent
          }
        ]
      }
    ]
  },
  {
    path: 'mock-pay-gov',
    component: LandingPageComponent,
    data: { title: 'Complete your permit transaction' }
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
  providers: [FirewoodForestsResolver, FirewoodForestResolver]
})
export class AppRoutingModule {}
