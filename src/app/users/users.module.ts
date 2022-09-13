import { NgModule } from '@angular/core';
import { NzTransferModule } from 'ng-zorro-antd/transfer';

import { SharedModule } from '../shared/shared.module';

import { UsersFormComponent } from './users-form/users-form.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersRoutingModule } from './users-routing.module';
import { UsersUserComponent } from './users-user/users-user.component';
import { UsersPermissionsComponent } from './users-permissions/users-permissions.component';

const antdModule = [
  NzTransferModule
];

@NgModule({
  declarations: [
    UsersFormComponent,
    UsersListComponent,
    UsersUserComponent,
    UsersPermissionsComponent
  ],
  imports: [
    SharedModule,
    UsersRoutingModule,
    ...antdModule
  ]
})
export class UsersModule {}
