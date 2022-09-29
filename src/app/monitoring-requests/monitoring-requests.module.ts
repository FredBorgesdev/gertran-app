import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonitoringRequestsRoutingModule } from './monitoring-requests-routing.module';
import { MonitoringRequestsListComponent } from './monitoring-requests-list/monitoring-requests-list.component';
import { SharedModule } from '../shared/shared.module';
import { MonitoringRequestsFormComponent } from './monitoring-requests-form/monitoring-requests-form.component';
import { RoutesModalComponent } from './routes-modal/routes-modal.component';
import {GooglePlaceModule} from 'ngx-google-places-autocomplete';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { MapModalComponent } from './map-modal/map-modal.component';
import {NgxMapboxGLModule} from 'ngx-mapbox-gl';
import {environment} from '../../environments/environment';


@NgModule({
  declarations: [
    MonitoringRequestsListComponent,
    MonitoringRequestsFormComponent,
    RoutesModalComponent,
    MapModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MonitoringRequestsRoutingModule,
    GooglePlaceModule,
    DragDropModule,
    NgxMapboxGLModule.withConfig({
      accessToken: environment.mapboxAccessToken,
    }),
  ]
})
export class MonitoringRequestsModule { }

