import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutesRoutingModule { }
