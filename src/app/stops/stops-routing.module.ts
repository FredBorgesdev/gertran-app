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
      headerDisplay: 'none'
    }
  },
  {
    path: 'stop-create',
    component: StopsStopComponent,
    data: {
      title: 'Adicionar Ponto ',
      headerDisplay: 'none'
    }
  },
  {
    path: 'stop-edit/:id',
    component: StopsStopComponent,
    data: {
      title: 'Editar Ponto ',
      headerDisplay: 'none'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StopsRoutingModule { }
