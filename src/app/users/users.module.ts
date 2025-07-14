import { NgModule } from '@angular/core';
import { NzTransferModule } from 'ng-zorro-antd/transfer';

import { SharedModule } from '../shared/shared.module';

import { UsersFormComponent } from './users-form/users-form.component';
// import { UsersListComponent } from './users-list/users-list.component';
import { UsersRoutingModule } from './users-routing.module';
import { UsersUserComponent } from './users-user/users-user.component';
import {GroupsModule} from '../groups/groups.module';
import {PermissionsModule} from '../permissions/permissions.module';
import {TextMaskModule} from 'angular2-text-mask';
import { UserCustomerBranchOfficeTableComponent } from './user-customer-branch-office/user-customer-branch-office-table/user-customer-branch-office-table.component';
import { UserCustomerBranchOfficeTabComponent } from './user-customer-branch-office/user-customer-branch-office-tab/user-customer-branch-office-tab.component';
import { UserCustomerBranchOfficeFormComponent } from './user-customer-branch-office/user-customer-branch-office-form/user-customer-branch-office-form.component';
import { CustomerSelectComponent } from './customer-select/customer-select.component';
import { UserSelectComponent } from './user-select/user-select.component';
import { BranchOfficeSelectComponent } from './branch-office-select/branch-office-select.component';

const antdModule = [
  NzTransferModule
];

@NgModule({
  declarations: [
    UsersFormComponent,
    // UsersListComponent,
    UsersUserComponent,
    UserCustomerBranchOfficeFormComponent,
    UserCustomerBranchOfficeTabComponent,
    UserCustomerBranchOfficeTableComponent,
    CustomerSelectComponent,
    UserSelectComponent,
    BranchOfficeSelectComponent,
  ],
    imports: [
        SharedModule,
        UsersRoutingModule,
        GroupsModule,
        PermissionsModule,
        ...antdModule,
        TextMaskModule
    ]
})
export class UsersModule {}
