import { NgModule } from '@angular/core'
import {
  RouterModule,
  Routes
} from '@angular/router'

import { CustomersListComponent } from './customers-list/customers-list.component'
import { CustomersCustomerComponent } from './customers-customer/customers-customer.component'

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
    component: CustomersCustomerComponent,
    data: {
      title: 'Adicionar Cliente ',
      headerDisplay: 'none'
    }
  },
  {
    path: 'customer-edit/:id',
    component: CustomersCustomerComponent,
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
