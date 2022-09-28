import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperationsFormComponent } from './operations-form/operations-form.component';
import { OperationsListComponent } from './operations-list/operations-list.component';

const routes: Routes = [
  {
    path: 'operations-list',
    component: OperationsListComponent,
    data: {
      title: 'Operações',
      headerDisplay: 'none',
    }
  },
  {
    path: 'operations-create',
    component: OperationsFormComponent,
    data: {
      title: 'Criar Operações ',
      headerDisplay: 'none',
    }
  },
  {
    path: 'operations-edit/:id',
    component: OperationsFormComponent,
    data: {
      title: 'Editar Operações ',
      headerDisplay: 'none',
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationsRoutingModule { }

