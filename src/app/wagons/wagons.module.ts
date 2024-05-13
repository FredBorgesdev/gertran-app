import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { TrackersModule } from '../trackers/trackers.module';

import { WagonsFormComponent } from './wagons-form/wagons-form.component';
// import { WagonsListComponent } from './wagons-list/wagons-list.component';
import { WagonsRoutingModule } from './wagons-routing.module';
import { WagonsWagonComponent } from './wagons-wagon/wagons-wagon.component';

const antdModule = [];

@NgModule({
  declarations: [
    WagonsFormComponent,
    // WagonsListComponent,
    WagonsWagonComponent
  ],
  imports: [
    SharedModule,
    WagonsRoutingModule,
    TrackersModule,
    ...antdModule
  ]
})
export class WagonsModule {}
