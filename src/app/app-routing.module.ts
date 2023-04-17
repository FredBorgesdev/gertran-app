import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { FullLayoutComponent } from './layouts/full-layout/full-layout.component';
import { CommonLayoutComponent } from './layouts/common-layout/common-layout.component';

import { FullLayout_ROUTES } from './shared/routes/full-layout.routes';
import { CommonLayout_ROUTES } from './shared/routes/common-layout.routes';
import { AuthGuard } from './authentication/auth.guard';
import {PermissionGuard} from './authentication/permission.guard';
import {Error2Component} from "./authentication/error-2/error-2.component";

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/authentication/login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: CommonLayoutComponent,
    children: CommonLayout_ROUTES,
    canActivate: [AuthGuard],
    canActivateChild: [PermissionGuard],
  },
  {
    path: '',
    component: FullLayoutComponent,
    children: FullLayout_ROUTES
  },
  {
    path: 'error/500',
    component: Error2Component,
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      preloadingStrategy: PreloadAllModules,
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {
}
