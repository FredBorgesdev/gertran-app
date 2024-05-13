import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperationsListComponent } from './operations-list/operations-list.component';
import { OperationsOperationComponent } from './operations-operation/operations-operation.component';

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
    component: OperationsOperationComponent,
    data: {
      title: 'Criar Operações ',
      headerDisplay: 'none',
    }
  },
  {
    path: 'operations-edit/:id',
    component: OperationsOperationComponent,
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

