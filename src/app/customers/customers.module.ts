import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {CustomersListComponent} from './customers-list/customers-list.component';
import {CustomersRoutingModule} from './customers-routing.module';
import {CustomersFormComponent} from './customers-form/customers-form.component';
import {ContactsTableComponent} from './contacts-table/contacts-table.component';
import {ContactsFormComponent} from './contacts-form/contacts-form.component';
import {ContactsTabComponent} from './contacts-tab/contacts-tab.component';
import {BranchOfficeTableComponent} from './branch-office-table/branch-office-table.component';
import {BranchOfficeFormComponent} from './branch-office-form/branch-office-form.component';
import {BranchOfficeTabComponent} from './branch-office-tab/branch-office-tab.component';
import {CustomersCustomerComponent} from './customers-customer/customers-customer.component';
import {AddressesFormComponent} from './addresses-form/addresses-form.component';
import {DocumentsModule} from '../documents/documents.module';
import {TextMaskModule} from 'angular2-text-mask';
import {PermissionsModule} from '../permissions/permissions.module';
import {CustomersTransferComponent} from './customers-transfer/customers-transfer.component';
import {NzTransferModule} from 'ng-zorro-antd/transfer';
import {WorkdaysModule} from '../workdays/workdays.module';
import {SharedOperationsTabComponent} from './shared-operations-tab/shared-operations-tab.component';
import {SharedOperationsFormComponent} from './shared-operations-form/shared-operations-form.component';
import {SharedOperationsTableComponent} from './shared-operations-table/shared-operations-table.component';
import {NzSwitchModule} from "ng-zorro-antd/switch";
import { EmailsTabComponent } from './emails-tab/emails-tab.component';
import { EmailsFormComponent } from './emails-form/emails-form.component';
import { EmailsTableComponent } from './emails-table/emails-table.component';
import { OperationsListComponent } from '../operations/operations-list/operations-list.component'
import { UsersListComponent } from '../users/users-list/users-list.component'
import { TrucksListComponent } from '../trucks/trucks-list/trucks-list.component'
import { WagonsListComponent } from '../wagons/wagons-list/wagons-list.component'
import { DriversListComponent } from '../drivers/drivers-list/drivers-list.component'

const antdModule = [
  NzTransferModule,
];

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
    AddressesFormComponent,
    CustomersTransferComponent,
    SharedOperationsTabComponent,
    SharedOperationsFormComponent,
    SharedOperationsTableComponent,
    EmailsTabComponent,
    EmailsFormComponent,
    EmailsTableComponent,
    OperationsListComponent,
    UsersListComponent,
    TrucksListComponent,
    WagonsListComponent,
    DriversListComponent
  ],
  imports: [
    SharedModule,
    CustomersRoutingModule,
    DocumentsModule,
    WorkdaysModule,
    TextMaskModule,
    PermissionsModule,
    ...antdModule,
    NzSwitchModule,
  ],
  exports: [
    CustomersTransferComponent,
  ]
})
export class CustomersModule {
}
