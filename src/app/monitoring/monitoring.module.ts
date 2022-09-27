import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';

import { MonitoringRoutingModule } from './monitoring-routing.module';
import { MonitoringListComponent } from './monitoring-list/monitoring-list.component';
import {SharedModule} from '../shared/shared.module';
import { MonitoringMapComponent } from './monitoring-map/monitoring-map.component';
import {NzPopoverModule} from 'ng-zorro-antd/popover';
import {NgxMapboxGLModule} from 'ngx-mapbox-gl';

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
      accessToken: 'pk.eyJ1Ijoidml0b3JsZGZyZWl0YXMiLCJhIjoiY2w4amppY25kMDQ4ODNucWc5Ynh6MTc4biJ9.9T9N2GtMEAwgo88NSwHayA'
    })
  ]
})
export class MonitoringModule { }
