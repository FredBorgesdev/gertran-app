import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';

import { AutomationsFormComponent } from './automations-form/automations-form.component';
import { AutomationsListComponent } from './automations-list/automations-list.component';

const routes: Routes = [
  {
    path: 'automations-list',
    component: AutomationsListComponent,
    data: {
      title: 'Usuários ',
      headerDisplay: 'none'
    }
  },
  {
    path: 'automations-create',
    component: AutomationsFormComponent,
    data: {
      title: 'Adicionar Usuário ',
      headerDisplay: 'none'
    }
  },
  {
    path: 'automations-edit/:id',
    component: AutomationsFormComponent,
    data: {
      title: 'Editar Usuário ',
      headerDisplay: 'none'
    }
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AutomationsRoutingModule {}
