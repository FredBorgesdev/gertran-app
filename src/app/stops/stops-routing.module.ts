import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StopsListComponent } from './stops-list/stops-list.component';
import { StopsStopComponent } from './stops-stop/stops-stop.component';

const routes: Routes = [
  {
    path: 'stops-list',
    component: StopsListComponent,
    data: {
      title: 'Pontos ',
      headerDisplay: 'none',
      permission: 'point.view_point',
    }
  },
  {
    path: 'stops-create',
    component: StopsStopComponent,
    data: {
      title: 'Adicionar Ponto ',
      headerDisplay: 'none',
      permission: 'point.add_point',
    }
  },
  {
    path: 'stops-edit/:id',
    component: StopsStopComponent,
    data: {
      title: 'Editar Ponto ',
      headerDisplay: 'none',
      permission: 'point.change_point',
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StopsRoutingModule { }
