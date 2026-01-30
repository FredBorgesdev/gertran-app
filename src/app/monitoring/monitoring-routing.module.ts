import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonitoringListComponent } from './monitoring-list/monitoring-list.component';
import { MonitoringReleaseListComponent } from './monitoring-release-list/monitoring-release-list.component';

const routes: Routes = [
  {
    path: 'monitoring-list',
    component: MonitoringListComponent,
    data: {
      title: 'Monitoramento',
      headerDisplay: 'none',
    }
  },
  {
    path: 'liberacao',
    component: MonitoringReleaseListComponent,
    data: {
      title: 'Terminal BH 8 - Liberação',
      headerDisplay: 'none'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitoringRoutingModule { }
