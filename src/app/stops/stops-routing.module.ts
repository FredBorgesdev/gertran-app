import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StopsListComponent } from './stops-list/stops-list.component';
import { StopsStopComponent } from './stops-stop/stops-stop.component';
import {Permissions} from '../authentication/permissions';

const routes: Routes = [
  {
    path: 'stops-list',
    component: StopsListComponent,
    data: {
      title: 'Pontos ',
      headerDisplay: 'none',
      permission: Permissions.SETTINGS_VIEW_POINT,
    }
  },
  {
    path: 'stops-create',
    component: StopsStopComponent,
    data: {
      title: 'Adicionar Ponto ',
      headerDisplay: 'none',
      permission: Permissions.SETTINGS_ADD_POINT,
    }
  },
  {
    path: 'stops-edit/:id',
    component: StopsStopComponent,
    data: {
      title: 'Editar Ponto ',
      headerDisplay: 'none',
      permission: Permissions.SETTINGS_CHANGE_POINT,
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StopsRoutingModule { }
