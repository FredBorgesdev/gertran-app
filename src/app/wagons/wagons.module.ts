import { NgModule } from '@angular/core'

import { SharedModule } from '../shared/shared.module'

import { WagonsFormComponent } from './wagons-form/wagons-form.component'
import { WagonsListComponent } from './wagons-list/wagons-list.component'
import { WagonsRoutingModule } from './wagons-routing.module'

const antdModule = []

@NgModule({
  declarations: [
    WagonsFormComponent,
    WagonsListComponent
  ],
  imports: [
    SharedModule,
    WagonsRoutingModule,
    ...antdModule
  ]
})
export class WagonsModule {}
