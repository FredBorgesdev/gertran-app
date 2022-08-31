import { NgModule } from '@angular/core'
import { NzTransferModule } from 'ng-zorro-antd/transfer'

import { SharedModule } from '../shared/shared.module'

import { UsersFormComponent } from './users-form/users-form.component'
import { UsersListComponent } from './users-list/users-list.component'
import { UsersRoutingModule } from './users-routing.module'

const antdModule = [
  NzTransferModule
]

@NgModule({
  declarations: [
    UsersFormComponent,
    UsersListComponent
  ],
  imports: [
    SharedModule,
    UsersRoutingModule,
    ...antdModule
  ]
})
export class UsersModule {}
