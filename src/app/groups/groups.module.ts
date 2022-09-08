import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsRoutingModule } from './groups-routing.module';
import { GroupsListComponent } from './groups-list/groups-list.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    GroupsListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    GroupsRoutingModule
  ]
})
export class GroupsModule { }
