import { NgModule } from '@angular/core'
import {
  RouterModule,
  Routes
} from '@angular/router'

import { WagonsFormComponent } from './wagons-form/wagons-form.component'
import { WagonsListComponent } from './wagons-list/wagons-list.component'

const routes: Routes = [
  {
    path: 'wagons-list',
    component: WagonsListComponent,
    data: {
      title: 'Carretas ',
      headerDisplay: 'none'
    }
  },
  {
    path: 'wagons-create',
    component: WagonsFormComponent,
    data: {
      title: 'Adicionar Carreta ',
      headerDisplay: 'none'
    }
  },
  {
    path: 'wagons-edit/:id',
    component: WagonsFormComponent,
    data: {
      title: 'Editar Carreta ',
      headerDisplay: 'none'
    }
  }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class WagonsRoutingModule {}
