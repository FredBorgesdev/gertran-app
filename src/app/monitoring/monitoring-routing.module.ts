import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MonitoringListComponent} from './monitoring-list/monitoring-list.component';

const routes: Routes = [
  {
    path: 'monitoring-list',
    component: MonitoringListComponent,
    data: {
      title: 'Monitoramento',
      headerDisplay: 'none',
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitoringRoutingModule { }
