import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TerminalsListComponent} from './terminals-list/terminals-list.component';
import {TerminalsFormComponent} from './terminals-form/terminals-form.component';

const routes: Routes = [
  {
    path: 'terminals-list',
    component: TerminalsListComponent,
    data: {
      title: 'Terminais ',
      headerDisplay: 'none'
    }
  },
  {
    path: 'terminals-create',
    component: TerminalsFormComponent,
    data: {
      title: 'Criar Terminal',
      headerDisplay: 'none'
    }
  },
  {
    path: 'terminals-edit/:id',
    component: TerminalsFormComponent,
    data: {
      title: 'Editar Terminal',
      headerDisplay: 'none'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TerminalsRoutingModule { }
