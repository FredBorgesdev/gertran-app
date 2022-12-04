import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesFormComponent } from './routes-form/routes-form.component';
import { RoutesListComponent } from './routes-list/routes-list.component';
import {Permissions} from '../authentication/permissions';

const routes: Routes = [
  {
    path: 'routes-list',
    component: RoutesListComponent,
    data: {
      title: 'Rotas ',
      headerDisplay: 'none',
      permission: Permissions.SETTINGS_VIEW_ROUTE,
    }
  },
  {
    path: 'routes-edit/:id',
    component: RoutesFormComponent,
    data: {
      title: 'Editar Rota ',
      headerDisplay: 'none',
      permission: Permissions.SETTINGS_CHANGE_ROUTE,
    }
  },
  {
    path: 'routes-create',
    component: RoutesFormComponent,
    data: {
      title: 'Adicionar Rota ',
      headerDisplay: 'none',
      permission: Permissions.SETTINGS_ADD_ROUTE,
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutesRoutingModule { }
