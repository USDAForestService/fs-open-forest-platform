import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShutdownComponent } from './shutdown/shutdown.component';
import { McBreadcrumbsModule } from 'ngx6-angular-breadcrumbs';

const appRoutes: Routes = [
  {
    path: '**',
    component: ShutdownComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: false }), McBreadcrumbsModule.forRoot()],
  exports: [RouterModule, McBreadcrumbsModule],
})
export class AppRoutingModule {}
