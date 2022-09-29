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

const antdModules = [
];

@NgModule({
  declarations: [
    MonitoringListComponent,
    MonitoringMapComponent
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
    })
  ]
})
export class MonitoringModule { }
