import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TerminalsListComponent} from './terminals-list/terminals-list.component';
import {TerminalsFormComponent} from './terminals-form/terminals-form.component';
import {Permissions} from '../authentication/permissions';


const routes: Routes = [
  {
    path: 'terminals-list',
    component: TerminalsListComponent,
    data: {
      title: 'Terminais ',
      headerDisplay: 'none',
      permission: Permissions.SETTINGS_VIEW_TERMINAL,
    }
  },
  {
    path: 'terminals-create',
    component: TerminalsFormComponent,
    data: {
      title: 'Criar Terminal',
      headerDisplay: 'none',
      permission: Permissions.SETTINGS_ADD_TERMINAL
    }
  },
  {
    path: 'terminals-edit/:id',
    component: TerminalsFormComponent,
    data: {
      title: 'Editar Terminal',
      headerDisplay: 'none',
      permission: Permissions.SETTINGS_CHANGE_TERMINAL,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TerminalsRoutingModule { }
