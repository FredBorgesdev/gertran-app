import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonitoringRequestsFormComponent } from './monitoring-requests-form/monitoring-requests-form.component';
import { MonitoringRequestsListComponent } from './monitoring-requests-list/monitoring-requests-list.component';
import {MonitoringRequestComponent} from './monitoring-request/monitoring-request.component';

const routes: Routes = [
  {
    path: 'monitoring-requests-list',
    component: MonitoringRequestsListComponent,
    data: {
      title: 'Requisições de monitoramento',
      headerDisplay: 'none',
    }
  },
  {
    path: 'monitoring-requests-create',
    component: MonitoringRequestComponent,
    data: {
      title: 'Criar Requisições de monitoramento ',
      headerDisplay: 'none',
    }
  },
  {
    path: 'monitoring-requests-edit/:id',
    component: MonitoringRequestComponent,
    data: {
      title: 'Editar Requisições de monitoramento ',
      headerDisplay: 'none',
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitoringRequestsRoutingModule { }

