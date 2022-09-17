import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsRoutingModule } from './groups-routing.module';
import { GroupsListComponent } from './groups-list/groups-list.component';
import { SharedModule } from '../shared/shared.module';
import { GroupsFormComponent } from './groups-form/groups-form.component';
import { NzTransferModule } from 'ng-zorro-antd/transfer';
import { GroupsTabComponent } from './groups-tab/groups-tab.component';
import {PermissionsModule} from '../permissions/permissions.module';

const antdModules = [
  NzTransferModule
];

@NgModule({
  declarations: [
    GroupsListComponent,
    GroupsFormComponent,
    GroupsTabComponent
  ],
  exports: [
    GroupsTabComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    GroupsRoutingModule,
    PermissionsModule,
    ...antdModules,
  ]
})
export class GroupsModule { }
