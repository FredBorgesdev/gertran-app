import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesFormComponent } from './routes-form/routes-form.component';
import { RoutesListComponent } from './routes-list/routes-list.component';

const routes: Routes = [
  {
    path: 'routes-list',
    component: RoutesListComponent,
    data: {
      title: 'Rotas ',
      headerDisplay: 'none'
    }
  },
  {
    path: 'route-edit/:id',
    component: RoutesFormComponent,
    data: {
      title: 'Editar Rota ',
      headerDisplay: 'none'
    }
  },
  {
    path: 'route-create',
    component: RoutesFormComponent,
    data: {
      title: 'Adicionar Rota ',
      headerDisplay: 'none'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutesRoutingModule { }
