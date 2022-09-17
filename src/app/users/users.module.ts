import { NgModule } from '@angular/core';
import { NzTransferModule } from 'ng-zorro-antd/transfer';

import { SharedModule } from '../shared/shared.module';

import { UsersFormComponent } from './users-form/users-form.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersRoutingModule } from './users-routing.module';
import { UsersUserComponent } from './users-user/users-user.component';
import {GroupsModule} from '../groups/groups.module';
import {PermissionsModule} from '../permissions/permissions.module';

const antdModule = [
  NzTransferModule
];

@NgModule({
  declarations: [
    UsersFormComponent,
    UsersListComponent,
    UsersUserComponent,
  ],
  imports: [
    SharedModule,
    UsersRoutingModule,
    GroupsModule,
    PermissionsModule,
    ...antdModule
  ]
})
export class UsersModule {}
