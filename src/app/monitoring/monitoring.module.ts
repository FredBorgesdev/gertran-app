import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';

import { MonitoringRoutingModule } from './monitoring-routing.module';
import { MonitoringListComponent } from './monitoring-list/monitoring-list.component';
import { SharedModule } from '../shared/shared.module';
import { MonitoringMapComponent } from './monitoring-map/monitoring-map.component';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { environment } from '../../environments/environment';
import { MonitoringAlertModalComponent } from './monitoring-alert-modal/monitoring-alert-modal.component';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { MonitoringEventModalComponent } from './monitoring-event-modal/monitoring-event-modal.component';
import { UpdateObservationsModalComponent } from './update-observations-modal/update-observations-modal.component';
import { CommandsModalComponent } from './commands-modal/commands-modal.component';
import { MessagesModalComponent } from './messages-modal/messages-modal.component';
import { IncidentsModalComponent } from './incidents-modal/incidents-modal.component';
import { CreateIncidentModalComponent } from '../incidents/create-incident-modal/create-incident-modal.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { IncidentDetailsModalComponent } from './incident-details-modal/incident-details-modal.component';
import { NgxPrintElementModule } from "ngx-print-element";
import { MonitoringRequestReleasedAlertModalComponent } from './monitoring-request-released-alert-modal/monitoring-request-released-alert-modal.component';
import { MonitoringReleaseListComponent } from './monitoring-release-list/monitoring-release-list.component';

const antdModules = [];

@NgModule({
  declarations: [
    MonitoringListComponent,
    MonitoringMapComponent,
    MonitoringAlertModalComponent,
    MonitoringEventModalComponent,
    UpdateObservationsModalComponent,
    CommandsModalComponent,
    MessagesModalComponent,
    IncidentsModalComponent,
    CreateIncidentModalComponent,
    IncidentDetailsModalComponent,
    MonitoringRequestReleasedAlertModalComponent,
    MonitoringReleaseListComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    MonitoringRoutingModule,
    GoogleMapsModule,
    GooglePlaceModule,
    ...antdModules,
    NzPopoverModule,
    NgxMapboxGLModule.withConfig({
      accessToken: environment.mapboxAccessToken,
    }),
    NzSkeletonModule,
    NzDescriptionsModule,
    NgxPrintElementModule
  ]
})
export class MonitoringModule {
}
