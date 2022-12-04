import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupsListComponent } from './groups-list/groups-list.component';
import {GroupsFormComponent} from './groups-form/groups-form.component';
import {Permissions} from '../authentication/permissions';

const routes: Routes = [
  {
    path: 'groups-list',
    component: GroupsListComponent,
    data: {
      title: 'Grupos',
      headerDisplay: 'none',
      permission: Permissions.AUTH_VIEW_GROUP,
    }
  },
  {
    path: 'groups-create',
    component: GroupsFormComponent,
    data: {
      title: 'Criar Grupo',
      headerDisplay: 'none',
      permission: Permissions.AUTH_ADD_GROUP,
    }
  },
  {
    path: 'groups-edit/:id',
    component: GroupsFormComponent,
    data: {
      title: 'Editar Grupo',
      headerDisplay: 'none',
      permission: Permissions.AUTH_CHANGE_GROUP,
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsRoutingModule { }
