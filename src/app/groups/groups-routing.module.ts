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
      headerDisplay: 'none'
    }
  },
  {
    path: 'groups-create',
    component: GroupsFormComponent,
    data: {
      title: 'Criar Grupo',
      headerDisplay: 'none'
    }
  },
  {
    path: 'groups-edit/:id',
    component: GroupsFormComponent,
    data: {
      title: 'Editar Grupo',
      headerDisplay: 'none'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsRoutingModule { }
