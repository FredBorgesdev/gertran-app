import { NgModule } from '@angular/core'
import {
  RouterModule,
  Routes
} from '@angular/router'

import { AutomationsFormComponent } from './automations-form/automations-form.component'
import { AutomationsListComponent } from './automations-list/automations-list.component'

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
    path: 'automation-create',
    component: AutomationsFormComponent,
    data: {
      title: 'Adicionar Usuário ',
      headerDisplay: 'none'
    }
  }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AutomationsRoutingModule {}
