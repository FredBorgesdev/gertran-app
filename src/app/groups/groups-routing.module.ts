import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupsListComponent } from './groups-list/groups-list.component';

const routes: Routes = [
  {
    path: 'groups-list',
    component: GroupsListComponent,
    data: {
      title: 'Grupos',
      headerDisplay: 'none'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsRoutingModule { }
