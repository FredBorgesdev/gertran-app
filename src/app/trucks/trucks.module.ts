import { NgModule } from '@angular/core'

import { SharedModule } from '../shared/shared.module'

import { TrucksFormComponent } from './trucks-form/trucks-form.component'
import { TrucksListComponent } from './trucks-list/trucks-list.component'
import { TrucksRoutingModule } from './trucks-routing.module'

const antdModule = []

@NgModule({
  declarations: [
    TrucksFormComponent,
    TrucksListComponent
  ],
  imports: [
    SharedModule,
    TrucksRoutingModule,
    ...antdModule
  ]
})
export class TrucksModule {}
