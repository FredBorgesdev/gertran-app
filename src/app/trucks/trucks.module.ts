import { NgModule } from '@angular/core'

import { SharedModule } from '../shared/shared.module'

import { TrucksFormComponent } from './trucks-form/trucks-form.component'
import { TrucksListComponent } from './trucks-list/trucks-list.component'
import { TrucksRoutingModule } from './trucks-routing.module';
import { TrucksTruckComponent } from './trucks-truck/trucks-truck.component';

import { TrackersModule } from '../trackers/trackers.module';

const antdModule = []

@NgModule({
  declarations: [
    TrucksFormComponent,
    TrucksListComponent,
    TrucksTruckComponent,
  ],
  imports: [
    SharedModule,
    TrucksRoutingModule,
    TrackersModule,
    ...antdModule
  ]
})
export class TrucksModule {}
