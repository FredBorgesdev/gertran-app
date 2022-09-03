import { NgModule } from '@angular/core'
import {
  RouterModule,
  Routes
} from '@angular/router'

import { TrucksFormComponent } from './trucks-form/trucks-form.component'
import { TrucksListComponent } from './trucks-list/trucks-list.component'

const routes: Routes = [
  {
    path: 'trucks-list',
    component: TrucksListComponent,
    data: {
      title: 'Usuários ',
      headerDisplay: 'none'
    }
  },
  {
    path: 'truck-create',
    component: TrucksFormComponent,
    data: {
      title: 'Adicionar Usuário ',
      headerDisplay: 'none'
    }
  },
  {
    path: 'truck-edit/:id',
    component: TrucksFormComponent,
    data: {
      title: 'Editar Usuário ',
      headerDisplay: 'none'
    }
  }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class TrucksRoutingModule {}
