import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonitoringRequestsRoutingModule } from './monitoring-requests-routing.module';
import { MonitoringRequestsListComponent } from './monitoring-requests-list/monitoring-requests-list.component';
import { SharedModule } from '../shared/shared.module';
import { MonitoringRequestsFormComponent } from './monitoring-requests-form/monitoring-requests-form.component';
import { RoutesModalComponent } from './routes-modal/routes-modal.component';
import {GooglePlaceModule} from 'ngx-google-places-autocomplete';
import {DragDropModule} from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [
    MonitoringRequestsListComponent,
    MonitoringRequestsFormComponent,
    RoutesModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MonitoringRequestsRoutingModule,
    GooglePlaceModule,
    DragDropModule,
  ]
})
export class MonitoringRequestsModule { }

