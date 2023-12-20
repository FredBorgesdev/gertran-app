import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalMonitoringFormComponent } from './device-form/device-form.component';
import { PersonalMonitoringDevicesListComponent } from './devices-list/devices-list.component';
import {  PersonalMonitoringListComponent } from './monitoring-personal-list/monitoring-personal-list.component';

const routes: Routes = [
  {
    path: 'devices-list',
    component: PersonalMonitoringDevicesListComponent,
    data: {
      title: 'Dispositivos monitorados',
      headerDisplay: 'none',
    }
  },
  {
    path: 'personal-monitoring-list',
    component: PersonalMonitoringListComponent,
    data: {
      title: 'Posições dispositivos monitorados',
      headerDisplay: 'none',
    }
  },
  {
    path: 'device-edit/:id',
    component: PersonalMonitoringFormComponent,
    data: {
      title: 'Editar dispositivo usuário ',
      headerDisplay: 'none',
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalMonitoringRoutingModule { }
