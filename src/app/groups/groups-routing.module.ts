import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupsListComponent } from './groups-list/groups-list.component';
import {GroupsFormComponent} from './groups-form/groups-form.component';

const routes: Routes = [
  {
    path: 'groups-list',
    component: GroupsListComponent,
    data: {
      title: 'Grupos',
      headerDisplay: 'none',
      permission: 'group.view_group',
    }
  },
  {
    path: 'groups-create',
    component: GroupsFormComponent,
    data: {
      title: 'Criar Grupo',
      headerDisplay: 'none',
      permission: 'group.add_group',
    }
  },
  {
    path: 'groups-edit/:id',
    component: GroupsFormComponent,
    data: {
      title: 'Editar Grupo',
      headerDisplay: 'none',
      permission: 'group.change_group',
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsRoutingModule { }
