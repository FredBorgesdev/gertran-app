import { NgModule } from '@angular/core'

import { SharedModule } from '../shared/shared.module'
import { DriversFormComponent } from './drivers-form/drivers-form.component'
import { DriversListComponent } from './drivers-list/drivers-list.component'
import { DriversRoutingModule } from './drivers-routing.module'

const antdModule = []

@NgModule({
  declarations: [
    DriversListComponent,
    DriversFormComponent
  ],
  imports: [
    SharedModule,
    DriversRoutingModule,
    ...antdModule
  ]
})
export class DriversModule {}
