import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module'
import { CustomersListComponent } from './customers-list/customers-list.component';
import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersFormComponent } from './customers-form/customers-form.component';
import { ContactsTableComponent } from './contacts-table/contacts-table.component';
import { ContactsFormComponent } from './contacts-form/contacts-form.component';
import { ContactsTabComponent } from './contacts-tab/contacts-tab.component';
import { BranchOfficeTableComponent } from './branch-office-table/branch-office-table.component';
import { BranchOfficeFormComponent } from './branch-office-form/branch-office-form.component';
import { BranchOfficeTabComponent } from './branch-office-tab/branch-office-tab.component';
import { CustomersCustomerComponent } from './customers-customer/customers-customer.component'

const antdModule = []

@NgModule({
  declarations: [
    ContactsTableComponent,
    CustomersListComponent,
    CustomersFormComponent,
    ContactsFormComponent,
    ContactsTabComponent,
    BranchOfficeTableComponent,
    BranchOfficeFormComponent,
    BranchOfficeTabComponent,
    CustomersCustomerComponent,
  ],
  imports: [
    SharedModule,
    CustomersRoutingModule,
    ...antdModule
  ],
  exports: []
})
export class CustomersModule { }
