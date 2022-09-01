import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module'
import { CustomersListComponent } from './customers-list/customers-list.component';
import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersFormComponent } from './customers-form/customers-form.component';
import { ContactsTableComponent } from './contacts-table/contacts-table.component';
import { ContactsFormComponent } from './contacts-form/contacts-form.component';
import { ContactsTabComponent } from './contacts-tab/contacts-tab.component'

const antdModule = []

@NgModule({
  declarations: [
    ContactsTableComponent,
    CustomersListComponent,
    CustomersFormComponent,
    ContactsFormComponent,
    ContactsTabComponent,
  ],
  imports: [
    SharedModule,
    CustomersRoutingModule,
    ...antdModule
  ],
  exports: []
})
export class CustomersModule { }
