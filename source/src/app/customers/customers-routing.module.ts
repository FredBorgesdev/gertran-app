import { NgModule } from '@angular/core'
import {
  RouterModule,
  Routes
} from '@angular/router'

import { CustomersFormComponent } from './customers-form/customers-form.component'
import { CustomersListComponent } from './customers-list/customers-list.component'

const routes: Routes = [
  {
    path: 'customers-list',
    component: CustomersListComponent,
    data: {
      title: 'Clientes ',
      headerDisplay: 'none'
    }
  },
  {
    path: 'customer-create',
    component: CustomersFormComponent,
    data: {
      title: 'Adicionar Cliente ',
      headerDisplay: 'none'
    }
  },
  {
    path: 'customer-edit/:id',
    component: CustomersFormComponent,
    data: {
      title: 'Editar Cliente ',
      headerDisplay: 'none'
    }
  }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class CustomersRoutingModule {}
