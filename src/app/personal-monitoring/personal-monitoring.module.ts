import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PersonalMonitoringRoutingModule} from './personal-monitoring-routing.module';
import {PersonalMonitoringDevicesListComponent} from './devices-list/devices-list.component';
import {SharedModule} from '../shared/shared.module';
import {PersonalMonitoringFormComponent} from './device-form/device-form.component';
import {PersonalMonitoringListComponent} from './monitoring-personal-list/monitoring-personal-list.component'
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {PersonalMonitoringMapComponent} from './monitoring-personal-map/monitoring-personal-map.component'
import {NgxMapboxGLModule} from 'ngx-mapbox-gl';
import {environment} from '../../environments/environment';


@NgModule({
  declarations: [
    PersonalMonitoringDevicesListComponent,
    PersonalMonitoringFormComponent,
    PersonalMonitoringListComponent,
    PersonalMonitoringMapComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PersonalMonitoringRoutingModule,
    NzSwitchModule,
    NgxMapboxGLModule.withConfig({
      accessToken: environment.mapboxAccessToken,
    }),
  ]
})
export class PersonalMonitoringModule {
}
