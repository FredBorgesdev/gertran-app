import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';

import { MonitoringRoutingModule } from './monitoring-routing.module';
import { MonitoringListComponent } from './monitoring-list/monitoring-list.component';
import {SharedModule} from '../shared/shared.module';
import { MonitoringMapComponent } from './monitoring-map/monitoring-map.component';
import {NzPopoverModule} from 'ng-zorro-antd/popover';
import {NgxMapboxGLModule} from 'ngx-mapbox-gl';
import {environment} from '../../environments/environment';
import { MonitoringAlertModalComponent } from './monitoring-alert-modal/monitoring-alert-modal.component';
import {NzSkeletonModule} from 'ng-zorro-antd/skeleton';
import { MonitoringEventModalComponent } from './monitoring-event-modal/monitoring-event-modal.component';
import { UpdateObservationsModalComponent } from './update-observations-modal/update-observations-modal.component';
import { CommandsModalComponent } from './commands-modal/commands-modal.component';
import { MessagesModalComponent } from './messages-modal/messages-modal.component';

const antdModules = [
];

@NgModule({
  declarations: [
    MonitoringListComponent,
    MonitoringMapComponent,
    MonitoringAlertModalComponent,
    MonitoringEventModalComponent,
    UpdateObservationsModalComponent,
    CommandsModalComponent,
    MessagesModalComponent
  ],
    imports: [
        SharedModule,
        CommonModule,
        MonitoringRoutingModule,
        GoogleMapsModule,
        ...antdModules,
        NzPopoverModule,
        NgxMapboxGLModule.withConfig({
            accessToken: environment.mapboxAccessToken,
        }),
        NzSkeletonModule
    ]
})
export class MonitoringModule { }
