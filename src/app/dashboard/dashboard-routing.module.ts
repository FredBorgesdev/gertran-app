import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../authentication/auth.guard';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: 'home',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Dashboard ',
      headerDisplay: "none"
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
