import { NgModule } from '@angular/core'

import { SharedModule } from '../shared/shared.module'

import { TrucksFormComponent } from './trucks-form/trucks-form.component'
import { TrucksListComponent } from './trucks-list/trucks-list.component'
import { TrucksRoutingModule } from './trucks-routing.module';
import { TrucksTruckComponent } from './trucks-truck/trucks-truck.component';
import { TrucksTrackersTabComponent } from './trucks-trackers-tab/trucks-trackers-tab.component';
import { TrucksTrackersTableComponent } from './trucks-trackers-table/trucks-trackers-table.component';
import { TrucksTrackersFormComponent } from './trucks-trackers-form/trucks-trackers-form.component'

const antdModule = []

@NgModule({
  declarations: [
    TrucksFormComponent,
    TrucksListComponent,
    TrucksTruckComponent,
    TrucksTrackersTabComponent,
    TrucksTrackersTableComponent,
    TrucksTrackersFormComponent
  ],
  imports: [
    SharedModule,
    TrucksRoutingModule,
    ...antdModule
  ]
})
export class TrucksModule {}
