import { NgModule } from '@angular/core'
import {
  RouterModule,
  Routes
} from '@angular/router'

import { DriversFormComponent } from './drivers-form/drivers-form.component'
import { DriversListComponent } from './drivers-list/drivers-list.component'

const routes: Routes = [
  {
    path: 'drivers-list',
    component: DriversListComponent,
    data: {
      title: 'Motoristas ',
      headerDisplay: 'none'
    }
  },
  {
    path: 'driver-create',
    component: DriversFormComponent,
    data: {
      title: 'Adicionar Motorista ',
      headerDisplay: 'none'
    }
  },
  {
    path: 'driver-edit/:id',
    component: DriversFormComponent,
    data: {
      title: 'Editar Motorista ',
      headerDisplay: 'none'
    }
  }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class DriversRoutingModule {}
