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
      headerDisplay: 'none',
      permission: 'route.view_route',
    }
  },
  {
    path: 'routes-edit/:id',
    component: RoutesFormComponent,
    data: {
      title: 'Editar Rota ',
      headerDisplay: 'none',
      permission: 'route.change_route',
    }
  },
  {
    path: 'routes-create',
    component: RoutesFormComponent,
    data: {
      title: 'Adicionar Rota ',
      headerDisplay: 'none',
      permission: 'route.add_route',
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutesRoutingModule { }
